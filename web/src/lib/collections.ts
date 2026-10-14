export type CollectionImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export type Collection = {
  slug: string;
  title: string;
  subtitle: string;
  coverImage: CollectionImage;
  images: CollectionImage[];
  interlude: [string, string];
  sideNotes: [string, string, string];
  symbol: string;
};

const image = (folder: string, file: string, width: number, height: number, title: string, caption: string): CollectionImage => ({
  src: `/yansimalar/${folder}/${file}`,
  alt: `${title} koleksiyonundan bir fotoğraf`,
  width,
  height,
  caption,
});

function makeCollection(slug: string, title: string, subtitle: string, folder: string, files: readonly [string, number, number][], captions: readonly string[], interlude: [string, string], sideNotes: [string, string, string], symbol: string, cover = 0): Collection {
  const images = files.map(([file, width, height], index) => image(folder, file, width, height, title, captions[index % captions.length]));
  return { slug, title, subtitle, coverImage: images[cover], images, interlude, sideNotes, symbol };
}

export const collections: Collection[] = [
  makeCollection("gokceada", "Gökçeada", "Rüzgârın sessizliğe karıştığı yer.", "gokceada", [
    ["gokceada1.JPG",6000,4000],["gokceada2.JPG",6000,4000],["gokceada3.JPG",5344,3563],["gokceada4.JPG",6000,4000],["gokceada5.JPG",6000,4000],["gokceada6.JPG",6000,4000],["gokceada7.JPG",6000,4000],["gokceada8.JPG",6000,4000],["gokceada9.JPG",6000,4000],["gokceada10.JPG",6000,4000],["gokceada11.JPG",6000,4000]
  ], ["Terpeköy'de öğle arası.","Kıyı, adanın açık cümlesi.","Ege'ye açılan dar yol.","Beyaz duvarlarda ada serinliği.","Ufuk burada daha geniş.","Yolun sonu deniz kokuyor.","Bir taş ev, iki sandalye.","Kıyıya doğru hafifleyen dünya.","Ada kendi yönünü seçer.","Karşı kıyı çok uzakta.","Dönüş vapuruna daha var."], ["Feribot uzaklaşınca ada başlar.","Burada mesafe, insanın omuzlarını hafifletir."], ["Kıyının ötesi yalnızca mavidir.","Sofrada yer, yolda yön bulunur.","Özgürlük biraz da karanın bitmesidir."], "🕊️", 4),
  makeCollection("bozcaada", "Bozcaada", "Taş sokaklardan denize kalan hatıralar.", "bozcaada", [
    ["bozcaada1.JPG",6000,4000],["bozcaada2.JPG",6000,4000],["bozcaada3.JPG",6000,4000],["bozcaada4.JPG",6000,4000],["bozcaada5.JPG",6000,4000],["bozcaada6.JPG",6000,4000],["bozcaada7.JPG",6000,4000],["bozcaada8.JPG",6000,4000],["bozcaada9.JPG",6000,4000],["bozcaada10.JPG",6000,4000],["bozcaada11.JPG",6000,4000]
  ], ["Begonviller sokağı devralmış.","Kalenin gölgesi limana düşer.","Mavi kepenkli bir öğle.","Deniz, taşların hemen ardında.","Eski evlerin serin yüzü.","Dar sokakta uzun bir yaz.","Meydan akşama hazırlanıyor.","Kapı önlerinde ada telaşı.","Kale, kıyıyı gözlüyor.","Masalar kurulunca sokak değişir.","Son vapurdan önce."], ["Taş duvarlar tuzu yıllarca taşır.","Bozcaada'da akşam, evlerin arasından gelir."], ["Kale susar, liman hareketlenir.","Sokağın ucunda mutlaka deniz vardır.","Eski evler yazı gölgede karşılar."], "🌼", 2),
  makeCollection("tirilye", "Tirilye", "Bir günün içine sığan eski zamanlar.", "tirilye", [
    ["tirilye1.JPG",6000,4000],["tirilye2.JPG",6000,4000],["tirilye3.JPG",6000,4000],["tirilye4.JPG",6000,4000],["tirilye5.JPG",6000,4000],["tirilye6.JPG",6000,4000]
  ], ["Yol çok, kasaba küçük.","Ahşap evin gölgesinde.","Bir kapının eski mavisi.","Sokağa bırakılmış ayrıntılar.","Duvarlarda solgun bir yaz.","Köşeyi dönünce çocukluk."], ["Tirilye, ayrıntılarını aceleye vermez.","Bir pencere pervazında eski bir öğleden sonra."], ["Sokak tabelaları bile el emeği.","Ahşabın çizgileri evi yaşlandırır.","Nostalji bazen boyası dökülmüş bir kapıdır."], "🌷", 3),
  makeCollection("bolu", "Bolu", "Yeşilin sessizliğinde.", "bolu", [
    ["bolu1.JPG",6000,4000],["bolu2.JPG",6000,4000],["bolu3.JPG",6000,4000],["bolu4.JPG",6000,4000],["bolu5.JPG",6000,4000],["bolu6.JPG",6000,4000],["bolu7.jpg",1350,2400],["bolu8.JPG",6000,4000],["bolu9.JPG",6000,4000],["bolu10.JPG",6000,4000],["bolu11.JPG",6000,4000]
  ], ["Göl kıyısında serin bir çizgi.","Çamların arasından geçen yol.","Sis, karşı yamacı siliyor.","Suyun üstünde koyu yeşil.","Ormanın derin nefesi.","Kıyıda dünya ağırlaşır.","Sonbahar patikaya inmiş.","Göl, bulutları dağıtmadan taşır.","Dallar arasında bir açıklık.","Mevsim burada renk değiştirir.","Yeşile doğru biraz daha."], ["Orman göle eğilince kıyı tamamlanır.","Sis çekilse de serinliği dallarda kalır."], ["Patika, çamların arasında incelir.","Suyun kıpırtısı kıyıya yeter.","Her mevsim ormana başka bir kapı açar."], "🌲", 5),
  makeCollection("kapadokya", "Kapadokya", "Taşın, göğün ve zamanın arasında.", "kapadokya", [
    ["kapadokya1.jpg",1080,2400],["kapadokya2.jpg",1800,4000],["kapadokya3.jpg",3907,1800],["kapadokya4.jpg",1800,4000]
  ], ["Balonlar vadiden önce uyandı.","Kayaların arasından yükselen sabah.","Yeryüzü burada kıvrılarak uzanır.","Yüksekte, coğrafya sadeleşir."], ["Gün doğarken vadiler yavaşça belirir.","Taşın biçimini binlerce sabah tamamlar."], ["Balonlar yükselir, yollar küçülür.","Vadinin dili kıvrımlı ve eskidir.","Aşağıda taş, yukarıda boşluk."], "✨", 2),
  makeCollection("cunda-adasi", "Cunda Adası", "Taş evlerin ve mavi nazarların arasında bir akşam.", "cunda adası", [
    ["cunda1.JPG",6000,4000],["cunda2.JPG",6000,4000],["cunda3.JPG",4000,6000],["cunda4.JPG",3286,5035],["cunda5.JPG",4000,6000],["cunda6.JPG",4000,6000],["cunda7.JPG",3225,4167],["cunda8.JPG",3891,2258],["cunda9.JPG",4000,6000],["cunda10.JPG",4288,4000],["cunda11.JPG",4000,6000],["cunda12.JPG",6000,4000],["cunda13.JPG",4000,6000],["cunda14.JPG",4000,6000],["cunda15.JPG",3207,6000],["cunda16.JPG",3358,6000],["cunda17.JPG",4000,6000],["cunda18.JPG",4000,6000],["cunda19.JPG",4000,6000],["cunda20.JPG",4000,6000]
  ], ["Kiremitlerin ardında sakin bir körfez.","Tepenin ardına çekilen son ışık.","Taş değirmen, gökyüzüne yaslanmış.","Kilise duvarları günbatımını tutuyor.","Pencereler artık denizi çerçeveliyor.","Zamanın bıraktığı boşluklar ışıkla doluyor.","Taş yola çıkan eski bir tekerlek.","Ada, akşamın rengine bürünmüş.","Kanatları durmuş, sessizce bekliyor.","Duvarın mizahı, geçenlere göz kırpıyor.","Çiçekler sokağın tavanını örmüş.","Mavi masalarda öğleden sonra bekliyor.","Begonvilin altında küçük bir mola.","Taş sokak, akşam ışığına uzanıyor.","Nazarlar tavanda, gölge yerde.","Mavi boncuklar güneşi süzüyor.","Tekneler suyun üstünde sallanıyor.","Kırmızı duvarda sarı sandalyeler.","Pencere kanatları gök mavisine boyalı.","Taş sokak, konakların arasından geçiyor."], ["Değirmenin kanatları artık rüzgârı değil, zamanı sayıyor.","Taş sokaklarda her adım biraz daha yavaşlıyor."], ["Nazar, kapının önünde bekler.","Begonvil, duvarın sabrını örter.","Deniz, her sokağın sonunda belirir."], "🧿", 0),
  makeCollection("can-dostlarimiz", "Can Dostlarımız", "Aynı dünyayı sessizce paylaştıklarımız.", "can dostlarımız", [
    ["dost1.jpg",4553,4000],["dost2.JPG",6000,4000],["dost3.jpg",3120,4160],["dost4.jpg",1350,2400],["dost5.JPG",6000,4000]
  ], ["Manzaraya ilk o vardı.","Patiler yolu ezberlemiş.","Sokağın küçük bekçisi.","Yan yana, sebepsizce iyi.","Evin en tüylü neşesi."], ["Dostluk bazen dört patiyle yanına gelir.","Konuşmadan da aynı tarafta olunur."], ["Merak, bıyıkların ucunda.","Birlikte yürümek anlaşmaya yeter.","Kapı önlerinin tanıdık yüzleri."], "🐕", 2),
  makeCollection("gun-batimi", "Gün Batımı", "Günün ışığa bıraktığı son söz.", "gunbatımı", [
    ["gb1.jpeg",1365,2048],["gb2.JPG",6000,3454],["gb3.jpg",1985,1800],["gb4.JPG",5028,2874],["gb5.jpg",1064,1280],["gb6.JPG",6000,4000],["gb7.JPG",3345,4000],["gb8.jpeg",1066,1600],["gb9.jpeg",1600,1066],["gb10.JPG",6000,4000]
  ], ["Tekne karanlığa bağlandı.","Turuncunun en koyu yeri.","Ufuk, günü ince bir çizgiyle kapattı.","Akşam suya yayıldı.","Kıyıda son sıcaklık.","Güneş dağın ardına çekiliyor.","Renkler ağır ağır derinleşir.","Şehir siluete dönüştü.","Denizde bakır bir iz.","Gece, ufuktan yaklaşıyor."], ["Günün sonu denizde daha uzun sürer.","Her akşam ufka başka bir renk bırakır."], ["Kıyı kararırken su parlamayı sürdürür.","Güneş iner, çizgiler belirginleşir.","Mavinin başladığı yerde turuncu biter."], "🌄", 3),
  makeCollection("rastgele-kadrajlar", "Rastgele Kadrajlar", "Planlanmayan anların bıraktığı izler.", "rastgele-kadraj", [
    ["IMG_2928.JPG",6000,4000],["rk2.JPG",6000,4000],["rk3.JPG",6000,4000],["rk4.JPG",3377,3068],["rk5.jpg",1500,1000],["rk6.JPG",3063,3829],["rk7.JPG",5124,2806],["rk8.JPG",6000,4000],["rk9.jpg",1634,977],["rk10.jpeg",1536,1412],["rk11.jpeg",1260,1065]
  ], ["Kıyıya asılmış nazarlıklar.","Köşe başında beklenmedik bir renk.","Yol üstü karşılaşması.","Çerçevenin dışında hayat var.","Bir duvarın küçük sürprizi.","Kalabalıktan arta kalan.","Tesadüfün iyi tarafı.","Şehir kendi ayrıntısını seçti.","Geçerken göze ilişen.","Sıradan günün tuhaf köşesi.","Kadraj sonradan karar verdi."], ["Bazı kareler aranmaz; yolun üzerinde bulunur.","Rastlantı, fotoğrafın en kısa hazırlığıdır."], ["Bir ayrıntı bütün sokağı değiştirir.","Plansızlığın kendine özgü bir düzeni var.","Göz seçer, şehir devam eder."], "✨", 6),
];

export const collectionBySlug = Object.fromEntries(collections.map((collection) => [collection.slug, collection]));
