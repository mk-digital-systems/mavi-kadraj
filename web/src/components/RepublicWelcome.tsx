"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import "./republic-welcome.css";

/** Türkiye saati UTC+3 (DST yok). Bitiş hariç. */
const CAMPAIGN_START = Date.parse("2026-10-28T00:00:00+03:00");
const CAMPAIGN_END = Date.parse("2026-10-30T00:00:00+03:00");
const CAMPAIGN_DATE = "2026-10-29";
const DISPLAY_SECONDS = 10;
const CLOSE_ANIMATION_MS = 500;

function isCampaignActive(): boolean {
  const now = Date.now();
  return now >= CAMPAIGN_START && now < CAMPAIGN_END;
}

function storageKey(): string {
  return `republic-welcome:${CAMPAIGN_DATE}:${window.location.hostname}`;
}

function hasVisited(): boolean {
  try {
    return window.localStorage.getItem(storageKey()) === "seen";
  } catch {
    return false;
  }
}

function rememberVisit() {
  try {
    window.localStorage.setItem(storageKey(), "seen");
  } catch {
    /* localStorage kapalı olabilir; deneyim yine çalışır. */
  }
}

export default function RepublicWelcome() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [remaining, setRemaining] = useState(DISPLAY_SECONDS);

  const skipRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const autoOpenHandledRef = useRef(false);
  const forcedRef = useRef(false);

  const isAdmin = pathname?.startsWith("/admin") ?? false;

  const close = useCallback((immediate: boolean) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (immediate || reduced) {
      setClosing(false);
      setOpen(false);
    } else {
      setClosing(true);
    }
  }, []);

  const openWelcome = useCallback(() => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setClosing(false);
    setRemaining(DISPLAY_SECONDS);
    setOpen(true);
  }, []);

  // Tarayıcıda ilk kurulum + kampanya penceresinin periyodik kontrolü.
  useEffect(() => {
    if (isAdmin) return;
    const params = new URLSearchParams(window.location.search);
    forcedRef.current = params.get("preview") === "1" || params.get("test") === "1";

    // Tarayıcıya özel durum; SSR/hydration'da hiçbir şey basılmaması için effect içinde kurulur.
    /* eslint-disable react-hooks/set-state-in-effect */
    setActive(isCampaignActive());
    setMounted(true);

    // Ref, StrictMode çift çalıştırmasında ikinci turun "görüldü" kaydı yüzünden açılmamasını önler.
    if (!autoOpenHandledRef.current) {
      autoOpenHandledRef.current = true;
      if (forcedRef.current || (isCampaignActive() && !hasVisited())) {
        // preview/test localStorage'a yazmaz.
        if (!forcedRef.current) rememberVisit();
        openWelcome();
      }
    }
    /* eslint-enable react-hooks/set-state-in-effect */

    const id = window.setInterval(() => {
      const next = isCampaignActive();
      setActive(next);
      // Kampanya biterken, preview/test dışındaki açık ekranı da kapat.
      if (!next && !forcedRef.current) close(true);
    }, 1000);
    return () => window.clearInterval(id);
  }, [isAdmin, openWelcome, close]);

  // Açıkken: geri sayım, otomatik kapanma, kaydırma kilidi, odak, klavye.
  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    skipRef.current?.focus({ preventScroll: true });

    const tick = window.setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    const auto = window.setTimeout(() => close(false), DISPLAY_SECONDS * 1000);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
      } else if (event.key === "Tab") {
        event.preventDefault();
        skipRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(auto);
      document.removeEventListener("keydown", onKeyDown);
      html.style.overflow = previousOverflow;
      const previous = lastFocusedRef.current;
      if (previous && previous.isConnected && typeof previous.focus === "function") {
        previous.focus({ preventScroll: true });
      }
    };
  }, [open, close]);

  // Kapanış animasyonu bitince bileşeni kaldır.
  useEffect(() => {
    if (!closing) return;
    const id = window.setTimeout(() => {
      setClosing(false);
      setOpen(false);
    }, CLOSE_ANIMATION_MS);
    return () => window.clearTimeout(id);
  }, [closing]);

  if (!mounted || isAdmin) return null;

  return (
    <>
      {open && (
        <section className={`republic-welcome${closing ? " is-closing" : ""}`}>
          <div className="republic-welcome__backdrop" aria-hidden="true" />
          <div
            className="republic-welcome__dialog"
            role="dialog"
            aria-modal="true"
            aria-label="29 Ekim Cumhuriyet Bayramı kutlaması"
          >
            <picture className="republic-welcome__picture">
              <source
                media="(max-width: 720px), (orientation: portrait)"
                srcSet="/campaigns/29-ekim/29-ekim-dikey.png"
              />
              <img
                src="/campaigns/29-ekim/29-ekim-kare.png"
                alt="Türkiye Büyük Millet Meclisi kürsüsünde Mustafa Kemal Atatürk; Türk bayraklarıyla 29 Ekim Cumhuriyet Bayramı kutlama afişi."
              />
            </picture>

            <div className="republic-welcome__controls">
              <div className="republic-welcome__timer" aria-label="Otomatik kapanma süresi">
                <span>{remaining}</span>
                <span className="republic-sr-only">saniye</span>
              </div>
              <button
                ref={skipRef}
                className="republic-welcome__skip"
                type="button"
                onClick={() => close(true)}
              >
                Geç
              </button>
            </div>

            <div className="republic-welcome__progress" aria-hidden="true">
              <span />
            </div>
          </div>
        </section>
      )}

      {active && !open && (
        <button
          className="republic-flag"
          type="button"
          aria-label="29 Ekim kutlamasını yeniden aç"
          onClick={openWelcome}
        >
          <span className="republic-flag__pole" aria-hidden="true" />
          <span className="republic-flag__cloth" aria-hidden="true">
            <span className="republic-flag__moon">☾</span>
            <span className="republic-flag__star">★</span>
          </span>
        </button>
      )}
    </>
  );
}
