import type { OzelGun } from "../schedule";

/**
 * 29 Ekim — Cumhuriyet Bayramı. Her yıl:
 * 28 Ekim 22:00 – 29 Ekim 23:59 arasında siteye ilk girişte 10 saniye (kapatılabilir).
 * Görseller: public/images/ozel-gunler/29-ekim/
 */
export const YIRMI_DOKUZ_EKIM: OzelGun = {
  id: "29-ekim",
  ad: "29 Ekim Cumhuriyet Bayramı kutlaması",
  aralik: { baslangicAy: 10, baslangicGun: 28, baslangicSaat: 22, baslangicDakika: 0, bitisAy: 10, bitisGun: 29 },
  ilkGirisMs: 10_000,
  arkaplan: "#160000",
  gorsel: {
    masaustu: "/images/ozel-gunler/29-ekim/masaustu.png",
    mobil: "/images/ozel-gunler/29-ekim/mobil.png",
    alt: "Türkiye Büyük Millet Meclisi kürsüsünde Mustafa Kemal Atatürk; Türk bayraklarıyla 29 Ekim Cumhuriyet Bayramı kutlama afişi.",
  },
};
