import Link from "next/link";

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
}

export function ExhibitionFooter() {
  return <footer id="footer" className="v2-footer">
    <div className="v2-footer__opening"><Link href="/" className="v2-footer__brand">MAVİ KADRAJ</Link><p>Fotoğraf bazen<br />hatırlamak değil,<br /><em>unutmamak için çekilir.</em></p><span aria-hidden>💙</span></div>
    <div className="v2-footer__social">
      <a href="https://www.instagram.com/mavi_kadraj14/" target="_blank" rel="noreferrer"><InstagramIcon /><small>Karelerin devamı Instagram’da.</small><strong>@mavi_kadraj14</strong><span>Takip Et ↗</span></a>
      <a href="https://mustafaoner.net" target="_blank" rel="noreferrer"><small>kişisel web sitesi</small><strong>Mustafa Öner</strong><span>mustafaoner.net ↗</span></a>
    </div>
    <nav aria-label="Alt menü"><Link href="/kadraj-yansimalari">Kadraj Yansımaları</Link><Link href="/kadrajin-otesi">Kadrajın Ötesinde</Link><a href="https://arsiv.mavikadraj.com.tr/">Fotoğraf Arşivi</a><Link href="/mavi-kadraj-kimdir">Mavi Kadraj Kimdir</Link></nav>
    <p className="v2-footer__legal">© Mavi Kadraj</p>
  </footer>;
}
