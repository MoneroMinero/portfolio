// =====================================================
//  NATPISI — ime benda preko fotke kad je otvoriš na cijeli ekran
//
//  imena: kako se bend PIŠE na webu, ako se razlikuje od imena datoteke
//         (npr. dvotočka ne smije biti u imenu datoteke na Windowsima)
//
//  mjesta: gdje se ispisuje ime na pojedinoj fotki ("mapa/ime datoteke"):
//    "gore-lijevo"  (to dobiju sve fotke koje nisu na popisu)
//    "gore"         (sredina gore)
//    "gore-desno"
//    "dolje-lijevo", "dolje", "dolje-desno"
//    "bez"          (ne piše se ništa)
//    ili točno mjesto u postocima fotke: { x: 30, y: 6 }
//    (x = sredina natpisa od lijevog ruba, y = vrh natpisa od vrha fotke)
//    ili mjesto s manjim/većim slovima: { mjesto: "dolje-desno", velicina: 0.8 }
//    (veličina iznad 1 dopušta i dulji natpis, npr. 1.6 = do 72 % širine fotke)
//
//  Ako natpis na zadanom mjestu prekriva osobu ili instrument, sam se malo
//  pomakne i/ili smanji (to je spremljeno u alati/natpisi-auto.json).
//  Ako baš želiš točno to mjesto (npr. preko pedala), dodaj fiksno: { mjesto: "dolje", fiksno: true }
//
//  Ista fotka u drugim mapama (Live Music, Expanded Work...) dobije isto mjesto.
//  Popis fotki se sam napravi kad se stranica objavi.
// =====================================================
const NATPISI = {
  imena: {
    "rtificialred": "rtificial:red",
    "Ewinar": "Ewiniar"
  },
  mjesta: {
    "naslovna/2026-10-31 Ewinar (3).jpg": "gore-lijevo",
    "naslovna/2026-11-07 Pičke Vrište (2).jpg": "gore",
    "naslovna/2026-10-16 Loš Primjer.jpg": "gore-lijevo",
    "naslovna/2026-10-09 Repetitor (4).jpg": "gore-desno",
    "naslovna/2026-10-24 Vodenkonj.jpg": "dolje",
    "naslovna/2026-10-24 Vodenkonj (2).jpg": "dolje-lijevo",
    "naslovna/2026-10-04 Mitraljez.jpg": "dolje",
    "naslovna/2026-10-16 Goblini.jpg": "gore-desno",
    "naslovna/2026-10-31 Ewinar (2).jpg": "gore-desno",
    "naslovna/2026-08-23 Šarena pojava.jpg": "dolje-lijevo",
    "naslovna/2026-10-24 A Gram Trip (2).jpg": { x: 50, y: 3 },
    "naslovna/2026-11-06 Ignor (2).jpg": "dolje-lijevo",
    "naslovna/2026-10-24 Canubis.jpg": "dolje-desno",
    "naslovna/2026-11-07 Pičke Vrište.jpg": { x: 50, y: 8, poravnaj: "lijevo", velicina: 1, fiksno: true },
    "naslovna/2026-10-31 Ewinar.jpg": "dolje-desno",
    "naslovna/2026-08-22 Let 3.jpg": "dolje-lijevo",
    "naslovna/2026-11-01 Embrio.jpg": "dolje-lijevo",
    "naslovna/2026-11-07 Električni orgazam.jpg": { mjesto: "dolje", velicina: 1.6, fiksno: true },
    "naslovna/2026-10-24 Canubis (4).jpg": "dolje-lijevo",
    "naslovna/2026-10-03 rtificialred (2).jpg": "gore-desno",
    "naslovna/2026-10-24 Canubis (3).jpg": "gore-lijevo",
    "naslovna/2026-10-03 Kal's Penny.jpg": { mjesto: "dolje", fiksno: true },
    "naslovna/2026-10-09 Repetitor (5).jpg": "dolje-desno",
    "naslovna/2026-11-06 Ignor (3).jpg": "dolje-desno",
    "naslovna/2026-10-25 Mamut.jpg": "dolje-desno",
    "naslovna/2026-10-03 rtificialred.jpg": "dolje-desno",
    "naslovna/2026-10-24 A Gram Trip (3).jpg": { x: 70, y: 95.9, poravnaj: "sredina", velicina: 0.75, fiksno: true }
  }
};
export default NATPISI;
