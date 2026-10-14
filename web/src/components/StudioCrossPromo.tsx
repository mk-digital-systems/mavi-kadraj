type StudioCard = {
  mark: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  /** Aynı stüdyoya ait çapraz tanıtım; ücretli reklam değil. rel="sponsored" burada kasıtlı olarak kullanılmaz. */
  relationship: "house";
};

const CARDS: StudioCard[] = [
  {
    mark: "MÖ",
    eyebrow: "Dijital Stüdyo",
    title: "Mustafa Öner",
    description: "Fikirleri çalışan dijital ürünlere, sistemlere ve güçlü görsel deneyimlere dönüştüren stüdyoyu keşfedin.",
    cta: "Stüdyoyu keşfet",
    href: "https://mustafaoner.net/tr?utm_source=mavikadraj&utm_medium=house_ad&utm_campaign=site_cross_promo&utm_content=mustafaoner",
    relationship: "house",
  },
  {
    mark: "MK",
    eyebrow: "Dijital Çözümler",
    title: "MK Digital Systems",
    description: "İşletmeler için modern web siteleri, özel yazılımlar, yönetim sistemleri ve mobil uygulamalar.",
    cta: "Çözümleri incele",
    href: "https://www.mk-digitalsystems.com/tr?utm_source=mavikadraj&utm_medium=house_ad&utm_campaign=site_cross_promo&utm_content=mk_digitalsystems",
    relationship: "house",
  },
  {
    mark: "OPS",
    eyebrow: "Saha Operasyonları",
    title: "MK OPS",
    description: "Şantiye, ekip, imalat, hakediş, puantaj ve depo süreçlerini tek merkezden yönetin.",
    cta: "MK OPS'i keşfet",
    href: "https://www.mk-ops.tr/?utm_source=mavikadraj&utm_medium=house_ad&utm_campaign=site_cross_promo&utm_content=mk_ops",
    relationship: "house",
  },
];

export function StudioCrossPromo() {
  return (
    <section className="studio-promo" aria-labelledby="studio-promo-title">
      <header>
        <h2 id="studio-promo-title">Aynı stüdyodan</h2>
        <p>Fotoğrafın ötesinde geliştirilen dijital ürünler ve sistemler.</p>
      </header>
      <div className="studio-promo__grid">
        {CARDS.map((card) => (
          <a
            key={card.href}
            href={card.href}
            target="_blank"
            rel="noopener"
            className="studio-promo__card reveal-up"
          >
            <span className="studio-promo__mark" aria-hidden>{card.mark}</span>
            <p className="studio-promo__eyebrow">{card.eyebrow}</p>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <span className="studio-promo__cta">
              {card.cta} <span aria-hidden>↗</span>
              <span className="sr-only"> — yeni sekmede açılır</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
