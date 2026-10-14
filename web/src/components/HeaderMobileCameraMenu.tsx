"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const Z_BACKDROP = 50000;
const Z_PANEL = 50100;

const NAV_ITEMS = [
  { href: "/kadraj-yansimalari", label: "Kadraj yansımaları" },
  { href: "/kadrajin-otesi", label: "Kadrajın Ötesinde" },
  { href: "https://arsiv.mavikadraj.com.tr/", label: "Arşiv" },
  { href: "/mavi-kadraj-kimdir", label: "Mavi Kadraj Kimdir" },
] as const;

function measureUnderButton(
  buttonEl: HTMLButtonElement | null
): { top: number; right: number } | null {
  if (!buttonEl || typeof window === "undefined") return null;
  const r = buttonEl.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  return {
    top: r.bottom + 8,
    right: Math.max(12, vw - r.right),
  };
}

/**
 * Mobil: kamera ikonu — header altında küçük menü paneli (tam ekran değil).
 * Portal body’de; flaş/ses yok, tek tıkla aç/kapa.
 */
export function HeaderMobileCameraMenu() {
  const [open, setOpen] = useState(false);
  const [panelPos, setPanelPos] = useState<{ top: number; right: number } | null>(
    null
  );
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  const reposition = useCallback(() => {
    const p = measureUnderButton(buttonRef.current);
    if (p) setPanelPos(p);
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    reposition();
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [open, reposition]);

  useEffect(() => {
    if (!open || typeof document === "undefined") return;
    const prevBody = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = useCallback(() => {
    if (open) {
      setOpen(false);
      return;
    }
    const pos =
      measureUnderButton(buttonRef.current) ?? {
        top: 80,
        right: 16,
      };
    setPanelPos(pos);
    setOpen(true);
  }, [open]);

  const portal =
    open &&
    panelPos &&
    typeof document !== "undefined"
      ? createPortal(
          <>
            <button
              type="button"
              aria-label="Menüyü kapat"
              className="fixed inset-0 bg-black/35 md:hidden"
              style={{ zIndex: Z_BACKDROP }}
              onClick={close}
            />
            <nav
              id="mk-mobile-nav"
              className="fixed box-border w-[min(228px,calc(100vw-1.5rem))] max-w-[calc(100vw-1.5rem)] rounded-xl border border-white/[0.12] bg-[#121a22] py-1 shadow-[0_12px_40px_rgba(0,0,0,0.5)] md:hidden"
              style={{
                zIndex: Z_PANEL,
                top: panelPos.top,
                right: panelPos.right,
                maxHeight: "min(65vh, 300px)",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
              }}
              role="menu"
              aria-label="Gezinme"
              onClick={(e) => e.stopPropagation()}
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  onClick={close}
                  className="block px-3.5 py-2.5 text-left text-sm tracking-wide text-[#d4dce8] active:bg-white/[0.08]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </>,
          document.body
        )
      : null;

  return (
    <>
      {portal}
      <div className="relative z-[80] md:hidden">
        <button
          ref={buttonRef}
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={open ? "mk-mobile-nav" : undefined}
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          className="flex h-11 w-11 shrink-0 cursor-pointer touch-manipulation select-none items-center justify-center rounded-xl border border-white/[0.12] bg-[#0c1218]/40 text-[#c8dff2] backdrop-blur-sm active:bg-white/[0.06]"
        >
          <CameraIcon className="pointer-events-none h-6 w-6" aria-hidden />
        </button>
      </div>
    </>
  );
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 8h2l1.5-2h5L14 8h6a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="14" r="3.25" />
      <path d="M8.5 6V5a1 1 0 0 1 1-1h1" />
    </svg>
  );
}
