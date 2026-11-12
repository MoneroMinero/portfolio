# Popis promjena (changelog)

Svaka verzija je spremljena na GitHubu (**Commits**), a uz svaku verziju ovdje piše njezin kod.
Na Vercelu pod **Deployments** možeš svaku staru verziju vratiti jednim klikom („Instant Rollback”).

## v1.16 — 12. 11. 2026.
- Pičke Vrište (bubnjar): natpis malo manji i podignut više

## v1.15 — 12. 11. 2026. · [5c1dcc0](https://github.com/MoneroMinero/portfolio/commit/5c1dcc0)
- Pičke Vrište (bubnjar): natpis prebačen desno od glave i malo povećan, ne prekriva ga

## v1.14 — 12. 11. 2026. · [1238f7d](https://github.com/MoneroMinero/portfolio/commit/1238f7d)
- Popravak: Fakofbolan, Mitraljez i Relification na naslovnici pokazivali su staru fotku, a klik je otvarao novu (Vercel je pamtio staru pod istim imenom). Datoteke preimenovane u „… (5).jpg”
- UPUTE.md: kod zamjene fotke daj novoj fotki novo ime

## v1.13 — 12. 11. 2026. · [f7ce09c](https://github.com/MoneroMinero/portfolio/commit/f7ce09c)
- PiTmArin: slova iste visine kao Marin Šoštarić, razvučena u širinu tako da su oba natpisa jednako duga (umjesto razmaka iz v1.12)

## v1.12 — 12. 11. 2026. · [5e8c1a0](https://github.com/MoneroMinero/portfolio/commit/5e8c1a0)
- PiTmArin: slova iste veličine kao Marin Šoštarić, razmaknuta tako da su oba natpisa točno jednako duga

## v1.11 — 12. 11. 2026. · [c58e4a3](https://github.com/MoneroMinero/portfolio/commit/c58e4a3)
- PiTmArin u zaglavlju je sad iste širine kao Marin Šoštarić (veća slova)

## v1.10 — 12. 11. 2026. · [97ffbfa](https://github.com/MoneroMinero/portfolio/commit/97ffbfa)
- Naslovnica vraćena na raspored iz v1.7 (stari redoslijed ti se više sviđa); promjene iz v1.8 i v1.9 maknute

## v1.9 — 12. 11. 2026. · [2583260](https://github.com/MoneroMinero/portfolio/commit/2583260)
- Naslovnica složena da bude dinamična: nijedan bend se ne ponavlja dok se svi ne izmijenjaju
- Fotke jedna do druge biraju se da se što više razlikuju po boji, svjetlini, orijentaciji (uspravna/položena) i rasporedu svjetla
- Izgled fotki računa `alati/izgled-fotki.py` (pokrenuti kad se dodaju nove fotke na naslovnicu); `jakeFotke` iz v1.8 maknut

## v1.8 — 12. 11. 2026. · [b4a3c5a](https://github.com/MoneroMinero/portfolio/commit/b4a3c5a)
- Naslovnica složena po važnosti: prvo po jedna fotka svakog benda redom iz `redoslijedBendova` (Let 3, Kawasaki 3p, Fakofbolan…), zatim ostali bendovi, a druge fotke istih bendova idu na kraj
- Novo u `postavke.js`: `jakeFotke` – fotke upisane tu idu ranije, oko 6 mjesta iza prve fotke svog benda
- Ista fotka benda i dalje nikad nije odmah ispod ili pored iste

## v1.7 — 12. 11. 2026. · [9a64578](https://github.com/MoneroMinero/portfolio/commit/9a64578)
- Ewinar se sad piše **Ewiniar** (posvuda na webu)
- Naslovnica po tvojoj presudi: Repetitor (2) → (4), vraćen A Gram Trip (3), Canubis (2) → (3) i vraćen (4)
- Naslovnica: Fakofbolan zamijenjen s DSC_9147, Mitraljez s DSC_2369, Relification s DSC_6462
- Naslovnica sad ima 35 fotki; maknute su i dalje u `public/fotke/_rezerva/naslovna`

## v1.6 — 12. 11. 2026. · [bd0d0d0](https://github.com/MoneroMinero/portfolio/commit/bd0d0d0)
- Popravak: ime benda (npr. Loš Primjer) na povećanoj fotki više ne izlazi izvan fotke na velikim ekranima
- Live Music: svih 24 benda ima barem jednu fotku (dodani Fakofbolan, Goblini, Loš Primjer, Zrakoteka, Out Of Civilization, Kal's Penny)
- Live Music: redoslijed po jačini bendova (popis `redoslijedBendova` u `postavke.js`)
- Naslovnica: 41 → 33 fotke, najviše 2 po bendu, svaki bend barem jednom; maknute fotke su u `public/fotke/_rezerva/naslovna`
- Gore lijevo piše PiTmArin, a kad se pređe mišem Marin Šoštarić (na mobitelu se sami izmjenjuju)
- Google SEO: novi naslov i opis stranice, slika za dijeljenje linka, podaci o fotografu za Google, robots.txt i sitemap.xml

## v1.5 — 12. 11. 2026. · [3dd5328](https://github.com/MoneroMinero/portfolio/commit/3dd5328)
- Contact: maknut podnaslov „Bookings, tours, editorial”

## v1.4 — 12. 11. 2026. · [3e6b708](https://github.com/MoneroMinero/portfolio/commit/3e6b708)
- Lazy loading: fotke se učitavaju tek kad dođu blizu ekrana (na kompjuteru i na mobitelu)
- Sličice se šalju kao manje WebP verzije prema veličini ekrana; naslovnica je pala s oko 4,8 MB na 0,3 MB
- Povećana fotka: 1080 ili 1920 px ovisno o ekranu, sljedeća se učita unaprijed
- Originalne fotke u `public/fotke` ostaju iste, smanjivanje radi Vercel sam

## v1.3 — 12. 11. 2026. · [e743bb9](https://github.com/MoneroMinero/portfolio/commit/e743bb9)
- Novi izbornik za mobitel: cijeli ekran, velika slova poravnata lijevo, Work kategorije kao gumbići
- Dok je izbornik otvoren, stranica ispod se ne pomiče i WhatsApp gumb se skriva
- Naslovi stranica (npr. ATMOSPHERE) više ne izlaze preko ruba ekrana na mobitelu
- Povećana fotka ima potpuno crnu pozadinu (stranica se više ne nazire iza)

## v1.2 — 11. 11. 2026. · [51ff0a9](https://github.com/MoneroMinero/portfolio/commit/51ff0a9)
- About: dovršen bio (tri odlomka)
- About: nova fotka iz mape `public/fotke/about`, cijela, bez rezanja, s mekim (feather) rubovima
- Podnožje: WhatsApp gumb više ne prekriva tekst

## v1.1 — 11. 11. 2026. · [3bee4fe](https://github.com/MoneroMinero/portfolio/commit/3bee4fe)
- About: prvi tekst („worst in the pit…”, „Based in Zagreb…”)

## v1.0 — 11. 11. 2026. · [6c073af](https://github.com/MoneroMinero/portfolio/commit/6c073af)
- Web prebačen na Next.js i objavljen na Vercelu (pitmarinphoto.com)
- Izgleda i radi isto kao prijašnja verzija
