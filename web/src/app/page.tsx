import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageStructuredData } from "@/components/PageStructuredData";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExhibitionHeader } from "@/components/ExhibitionHeader";
import { CollectionPortal } from "@/components/CollectionPortal";
import { ExhibitionFooter } from "@/components/ExhibitionFooter";
import { CinematicPhotoScene } from "@/components/CinematicPhotoScene";
import { StudioCrossPromo } from "@/components/StudioCrossPromo";
import { collections } from "@/lib/collections";

export const metadata = pageMetadata("/", "Mavi Kadraj | Doğa, Manzara ve Fotoğraf Hikâyeleri", site.description);

const selected = [collections[0].images[7],collections[6].images[2],collections[7].images[3],collections[3].images[6],collections[1].images[4],collections[4].images[2],collections[2].images[1],collections[8].images[6],collections[3].images[3],collections[0].images[10]];

export default function HomePage() {
  return (
    <main className="exhibition-page">
      <PageStructuredData path="/" name="Mavi Kadraj" description={site.description} />
      <section className="home-hero" aria-labelledby="home-title">
        <Image src="/images/hero.jpeg" alt="Gün batımında doğadaki küçük bir ayrıntıyı fotoğraflayan Mavi Kadraj" fill priority sizes="100vw" className="home-hero__image" />
        <div className="home-hero__shade" />
        <ExhibitionHeader overlay />
        <div className="home-hero__copy">
          <p className="exhibition-kicker">Fotoğrafın içinden</p>
          <h1 id="home-title">MAVİ<br />KADRAJ</h1>
          <blockquote>Bazı anlar yaşanmaz,<br />içinden geçilir.</blockquote>
        </div>
        <span className="home-hero__scroll" aria-hidden>Kaydır</span>
      </section>

      <section id="selected-frames" className="selected-frames" aria-labelledby="selected-title">
        <header><p className="exhibition-kicker">Bir bakışın ardından</p><h2 id="selected-title">Seçilmiş Kareler</h2></header>
        {selected.map((photo, i) => <Fragment key={photo.src}>
          <figure className={`selected-frame selected-frame--${i + 1} ${i % 3 === 0 ? "reveal-side" : i % 3 === 1 ? "reveal-up" : "reveal-clip"}`}>
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 92vw, 70vw" className="object-cover" />
          </figure>
          {i === 2 && <aside className="selected-note selected-note--encounter"><span aria-hidden>🐾</span><p>Her karşılaşma<br /><em>biraz iz bırakır.</em></p></aside>}
          {i === 5 && <aside className="selected-note selected-note--road"><p>Bazen yol değil,<br /><em>yolda kalan his hatırlanır.</em></p></aside>}
          {i === 6 && <aside className="selected-note selected-note--tea"><p>Bir çay soğur.<br /><em>Manzara kalır.</em></p></aside>}
          {i === 8 && <aside className="selected-note selected-note--city"><span aria-hidden>🕊️</span><p>Gökyüzüne bakınca<br /><em>mesafeler biraz küçülür.</em></p><small>Bir şehir bazen<br />tek bir kareye sığmaz.</small></aside>}
          {i === 9 && <aside className="selected-note selected-note--flag"><p>Rüzgâr geçer.<br /><em>İz kalır.</em></p></aside>}
        </Fragment>)}
        <a href="https://arsiv.mavikadraj.com.tr/" className="exhibition-more selected-frames__archive">Tüm arşivi keşfet <span aria-hidden>→</span></a>
      </section>

      <CinematicPhotoScene wide={collections[8].images[8]} portrait={collections[4].images[1]} />

      <section className="waiting-story home-story" aria-labelledby="waiting-title">
        <figure className="reveal-clip"><Image src={collections[1].images[8].src} alt={collections[1].images[8].alt} fill sizes="(max-width: 700px) 100vw, 60vw" className="object-cover" /></figure>
        <div className="home-story__copy reveal-up"><span className="story-symbol" aria-hidden>🕊️</span><p className="exhibition-kicker">Bir anı beklerken</p><h2 id="waiting-title">Bazen fotoğraf<br /><em>çekilmez.</em></h2><p>Bazen beklenir.<br /><br />Işık değişir, rüzgâr diner, bir bakış gelir ve deklanşör yalnızca son noktayı koyar.</p><span className="script-note">bir an, sonra sessizlik</span></div>
      </section>

      <section id="sunset-story" className="sunset-story" aria-labelledby="sunset-title">
        <header className="reveal-up"><span aria-hidden>✨</span><p className="exhibition-kicker">Günün kıyısında</p><h2 id="sunset-title">Işığın<br /><em>son sözü</em></h2></header>
        <figure className="sunset-story__wide reveal-side"><Image src={collections[7].images[3].src} alt={collections[7].images[3].alt} fill sizes="100vw" className="object-cover" /></figure>
        <figure className="sunset-story__portrait reveal-up"><Image src={collections[7].images[7].src} alt={collections[7].images[7].alt} fill sizes="(max-width: 700px) 76vw, 32vw" className="object-cover" /></figure>
        <figure className="sunset-story__detail reveal-clip"><Image src={collections[7].images[8].src} alt={collections[7].images[8].alt} fill sizes="(max-width: 700px) 88vw, 45vw" className="object-cover" /></figure>
        <p className="sunset-story__note script-note">Gün gider.<br />Işık biraz daha kalır.</p>
        <p className="sunset-story__verse">Gökyüzü bazen<br /><em>veda ederken güzelleşir.</em></p>
        <Link href="/gun-batimi">Gün Batımı’na bak →</Link>
      </section>

      <section className="poetic-pause poetic-pause--second" aria-label="Şiirsel durak">
        <span aria-hidden>🌼</span><p>Fotoğraf, bazen gözün değil<br /><em>bekleyişin hatırasıdır.</em></p>
      </section>

      <section className="companions-story home-story" aria-labelledby="companions-title">
        <div className="home-story__copy reveal-up"><p className="exhibition-kicker">Sessizce aynı dünyada</p><h2 id="companions-title">Bir bakış,<br /><em>bütün cümlelerden uzun.</em></h2><p>Bazen en güzel portre,<br />poz vermeyi bilmeyene aittir.</p><span className="story-symbol" aria-hidden>🐕</span><Link href="/can-dostlarimiz">Can Dostlarımıza bak →</Link></div>
        <div className="companions-story__photos"><figure className="reveal-side"><Image src={collections[6].images[2].src} alt={collections[6].images[2].alt} fill sizes="(max-width: 700px) 82vw, 34vw" className="object-cover" /></figure><figure className="reveal-up"><Image src={collections[6].images[4].src} alt={collections[6].images[4].alt} fill sizes="(max-width: 700px) 88vw, 40vw" className="object-cover" /></figure></div>
      </section>

      <section className="home-collections" aria-labelledby="home-collections-title">
        <header><h2 id="home-collections-title">Kadraj Yansımaları</h2><p>Her yer başka bir ışık.<br />Her kare başka bir hatıra.</p></header>
        <div className="home-collections__flow">
          {[collections[0], collections[1], collections[4]].map((collection, i) => <CollectionPortal key={collection.slug} collection={collection} className={`portal-${i + 1}`} />)}
        </div>
        <Link href="/kadraj-yansimalari" className="exhibition-more">Tüm yansımaları gör <span>→</span></Link>
      </section>
      <StudioCrossPromo />
      <section className="home-closing"><figure><Image src={collections[8].images[6].src} alt={collections[8].images[6].alt} fill sizes="100vw" className="object-cover" /></figure><div><span aria-hidden>✨</span><p>Fotoğraf bazen hatırlamak değil,<br /><em>unutmamak için çekilir.</em></p></div></section>
      <ExhibitionFooter />
    </main>
  );
}
