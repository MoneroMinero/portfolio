import "./globals.css";
import P from "../postavke.js";

export const metadata = {
  title: (P.ime || "") + (P.podnaslov ? " — " + P.podnaslov : ""),
  description: P.podnaslov || ""
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
