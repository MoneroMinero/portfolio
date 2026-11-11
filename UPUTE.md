# Kako ažurirati stranicu (Next.js verzija, za Vercel)

Stranica izgleda i radi isto kao prije. Razlika je samo u tome gdje stoje fotke
i što se popis fotki sada sam napravi kad Vercel objavi stranicu.

## Dodavanje fotki
Fotke stavljaš u mapu `public/fotke`, u pravu podmapu:

| Mapa | Gdje se vidi |
|---|---|
| `public/fotke/naslovna` | fotke koje se vrte u stupcima na naslovnici |
| `public/fotke/live-music` | Work → Live Music |
| `public/fotke/atmosphere` | Work → Atmosphere |
| `public/fotke/portraits` | Work → Portraits (bez imena benda preko fotke) |
| `public/fotke/about` | fotka na About stranici (prva u mapi) |
| `public/fotke/expanded-work/Ime Artista/` | Expanded Work: svaki artist ima svoju podmapu |

**Ime datoteke = natpis.** Počni s datumom pa ime izvođača:
`2026-11-08 Dubioza Kolektiv.jpg` → na stranici piše „Dubioza Kolektiv”. Najnovije idu prve.
Dodaj `(naslovna)` na kraj imena ako želiš da baš ta fotka bude prva.
Mapa `public/fotke/_rezerva` se ne prikazuje.

Savjet: prije dodavanja smanji fotke na oko 2500 px dužu stranicu (JPG, kvaliteta 80).

## Tekstovi
- `postavke.js` — ime, About tekst, email, telefon, WhatsApp, Facebook / Instagram / X
- `bendovi.js` — linkovi bendova (Instagram, Bandcamp…) koji se pokažu uz povećanu fotku
- `natpisi.js` — pravo ime benda i gdje se ime ispisuje preko pojedine fotke

Mijenjaj samo tekst između navodnika.

## Objava
Kad je projekt na GitHubu i spojen s Vercelom, svaka promjena koju spremiš na GitHub
sama se objavi za minutu-dvije. Ne moraš ništa pokretati.

## Za programere
`npm install`, pa `npm run dev` (pregled na http://localhost:3000) ili `npm run build`.
Logika stranice je u `lib/stranica.js`, popis fotki u `lib/fotke.js`.

## Verzije
Svaka objavljena verzija je zapisana u `CHANGELOG.md` i spremljena na GitHubu kao oznaka (npr. `v1.3`).
Ako nešto pođe po zlu, na Vercelu pod **Deployments** možeš vratiti bilo koju staru verziju.
