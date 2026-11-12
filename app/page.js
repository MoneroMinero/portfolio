// Naslovnica. Popis fotki se napravi kad se stranica objavi, iz mape public/fotke.
import Stranica from "./Stranica";
import { napraviPopis } from "../lib/fotke";
import POSTAVKE from "../postavke.js";
import BENDOVI from "../bendovi.js";

export const dynamic = "force-static";

const ADRESA = "https://pitmarinphoto.com";

export default function Naslovnica() {
  const P = POSTAVKE;
  const fotke = napraviPopis();
  const bendovi = [...new Set((fotke["expanded-work"] || []).map((a) => a.artist))];
  const mreze = [P.instagram, P.facebook, P.x].filter(Boolean);
  // podaci za Google: tko je fotograf, gdje radi, kako ga kontaktirati
  const ld = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: P.ime,
    alternateName: P.nadimak || undefined,
    jobTitle: "Concert & Portrait Photographer",
    url: ADRESA,
    image: ADRESA + "/fotke/about/about.jpg",
    email: P.email ? "mailto:" + P.email : undefined,
    address: { "@type": "PostalAddress", addressLocality: "Zagreb", addressCountry: "HR" },
    knowsAbout: ["Concert photography", "Live music photography", "Portrait photography", "Festival photography"],
    sameAs: mreze.length ? mreze : undefined
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Stranica postavke={P} fotke={fotke} bendovi={BENDOVI} />
      {/* tekst za tražilice i preglednike bez JavaScripta; posjetitelji ga ne vide */}
      <noscript>
        <h1>{P.ime}{P.nadimak ? ` (${P.nadimak})` : ""} — {P.podnaslov}</h1>
        {(P.oMeni || []).map((t, i) => <p key={i}>{t}</p>)}
        <h2>Work</h2>
        <p>Live Music, Atmosphere, Portraits. Bands: {bendovi.join(", ")}.</p>
        <h2>Contact</h2>
        <p>{P.email} · {P.telefon} · {P.grad}</p>
      </noscript>
    </>
  );
}
