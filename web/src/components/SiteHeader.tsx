import Link from "next/link";
import { Caveat } from "next/font/google";
import { HeaderMobileCameraMenu } from "@/components/HeaderMobileCameraMenu";
import { site } from "@/lib/site";

const caveatHeader = Caveat({
  subsets: ["latin", "latin-ext"],
  weight: ["600"],
  display: "swap",
});

export function SiteHeader() {
  return (
    <header className="relative z-[50] isolate flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] px-6 py-5 md:px-10">
      <Link
        href="/"
        className={`${caveatHeader.className} font-semibold tracking-[0.06em]`}
        style={{
          fontSize: "clamp(22px, 2.2vw, 32px)",
          filter:
            "drop-shadow(0 1px 0 rgba(255,255,255,0.35)) drop-shadow(0 2px 8px rgba(200,228,255,0.2))",
        }}
      >
        <span className="bg-gradient-to-br from-[#ffffff] via-[#c8dff2] to-[#4a8bc4] bg-clip-text text-transparent">
          {site.name}
        </span>
      </Link>
      <div className="flex shrink-0 items-center gap-3">
        <nav className="hidden flex-wrap gap-x-7 gap-y-2 text-sm tracking-wide text-[var(--mk-muted)] md:flex">
          <Link href="/kadraj-yansimalari" className="hover:text-[var(--mk-accent)]">
            Kadraj yansımaları
          </Link>
          <Link href="/kadrajin-otesi" className="hover:text-[var(--mk-accent)]">
            Kadrajın Ötesinde
          </Link>
          <a href="https://arsiv.mavikadraj.com.tr/" className="hover:text-[var(--mk-accent)]">
            Arşiv
          </a>
          <Link href="/mavi-kadraj-kimdir" className="hover:text-[var(--mk-accent)]">
            Mavi Kadraj Kimdir
          </Link>
        </nav>
        <HeaderMobileCameraMenu />
      </div>
    </header>
  );
}
