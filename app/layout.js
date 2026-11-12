import "./globals.css";
import P from "../postavke.js";

// Google / društvene mreže: naslov, opis i slika koja se pokaže kad netko podijeli link
const ADRESA = "https://pitmarinphoto.com";
const NASLOV = `${P.ime}${P.nadimak ? ` (${P.nadimak})` : ""} — ${P.podnaslov || "Photography"}, ${(P.grad || "").split(",")[0]}`;
const OPIS = `Concert, festival and portrait photography by ${P.ime}${P.nadimak ? ` (${P.nadimak})` : ""}, based in ${P.grad}. ` +
  "Live music, atmosphere and portraits from the Croatian rock, punk and metal scene.";
const SLIKA = "/fotke/naslovna/2026-11-07%20Pi%C4%8Dke%20Vri%C5%A1te%20(2).jpg";

export const metadata = {
  metadataBase: new URL(ADRESA),
  title: NASLOV,
  description: OPIS,
  applicationName: P.nadimak || P.ime,
  authors: [{ name: P.ime, url: ADRESA }],
  creator: P.ime,
  keywords: [
    "concert photography", "concert photographer", "live music photography", "portrait photography",
    "festival photography", "Zagreb", "Croatia", "koncertna fotografija", "fotograf koncerata",
    "fotograf Zagreb", P.ime, P.nadimak
  ].filter(Boolean),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", url: ADRESA, siteName: P.nadimak || P.ime, locale: "en_US",
    title: NASLOV, description: OPIS,
    images: [{ url: SLIKA, width: 2200, height: 1467, alt: `Live concert photo by ${P.ime}` }]
  },
  twitter: { card: "summary_large_image", title: NASLOV, description: OPIS, images: [SLIKA] }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000"
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=Climate+Crisis&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
