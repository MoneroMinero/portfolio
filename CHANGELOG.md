# Popis promjena (changelog)

Svaka verzija je spremljena na GitHubu (**Commits**), a uz svaku verziju ovdje piše njezin kod.
Na Vercelu pod **Deployments** možeš svaku staru verziju vratiti jednim klikom („Instant Rollback”).

## v1.5 — 12. 11. 2026.
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
