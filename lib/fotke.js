// Pregleda mapu "public/fotke" i napravi popis svih fotografija.
// To se radi samo od sebe kad se stranica objavi (na Vercelu) — ne moraš ništa pokretati.
import fs from "fs";
import path from "path";
import NATPISI_IZVOR from "../natpisi.js";
import POSTAVKE from "../postavke.js";

const KORIJEN = process.cwd();
const FOTKE = path.join(KORIJEN, "public", "fotke");
const MAPE = ["naslovna", "live-music", "atmosphere", "portraits", "moje-strasti", "about", "expanded-work"];
const SLIKE = /\.(jpe?g|png|webp)$/i;

function velicina(file) {
  const b = fs.readFileSync(file);
  // PNG
  if (b.slice(1, 4).toString() === "PNG") return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  // WEBP (VP8X / VP8 / VP8L)
  if (b.slice(0, 4).toString() === "RIFF" && b.slice(8, 12).toString() === "WEBP") {
    const t = b.slice(12, 16).toString();
    if (t === "VP8X") return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
    if (t === "VP8 ") return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
    if (t === "VP8L") { const n = b.readUInt32LE(21); return { w: (n & 0x3fff) + 1, h: ((n >> 14) & 0x3fff) + 1 }; }
  }
  // JPEG: traži SOF marker
  let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const m = b[i + 1];
    if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) {
      return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
    }
    i += 2 + b.readUInt16BE(i + 2);
  }
  return { w: 3, h: 2 };
}

// "otisak" fotke = veličina datoteke + dimenzije (kopije iste fotke u raznim mapama se tako prepoznaju)
const otisak = (file) => { const { w, h } = velicina(file); return `${fs.statSync(file).size}:${w}x${h}`; };

// "2026-10-12 Dubioza Kolektiv - Tvornica.jpg" -> "Dubioza Kolektiv - Tvornica"
function opis(ime) {
  return ime
    .replace(SLIKE, "")
    .replace(/^\d{4}[-_.]\d{2}[-_.]\d{2}[\s_-]*/, "")
    .replace(/[_]+/g, " ")
    .replace(/\s*\((\d+|naslovna)\)/gi, "")
    .trim();
}

export function napraviPopis() {
  const imena = NATPISI_IZVOR.imena || {};
  const mjesta = NATPISI_IZVOR.mjesta || {};
  const pravoIme = (ime) => imena[ime] || ime;

  // ista fotka (isti sadržaj) u drugoj mapi dobije isto mjesto natpisa
  const mjestoPoOtisku = {};
  for (const [rel, m] of Object.entries(mjesta)) {
    // fotka je možda maknuta u _rezerva, a njezina kopija je i dalje u drugoj mapi
    const f = [path.join(FOTKE, rel), path.join(FOTKE, "_rezerva", rel)].find((x) => fs.existsSync(x));
    if (f) mjestoPoOtisku[otisak(f)] = m;
    else console.warn("natpisi.js: nema fotke " + rel);
  }
  // natpisi-auto.json: mjesta pomaknuta/smanjena da ne prekrivaju subjekt;
  // vrijedi samo dok je u natpisi.js za tu fotku i dalje zadano isto mjesto ("izvor")
  const autoDat = path.join(KORIJEN, "alati", "natpisi-auto.json");
  const AUTO = fs.existsSync(autoDat) ? JSON.parse(fs.readFileSync(autoDat, "utf8")) : {};

  function slike(dir, rel) {
    const datoteke = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => SLIKE.test(f)) : [];
    // najnovije prvo (imena počinju datumom); fotka s "(naslovna)" u imenu ide prva
    datoteke.sort((a, b) => {
      const na = /\(naslovna\)/i.test(a), nb = /\(naslovna\)/i.test(b);
      if (na !== nb) return na ? -1 : 1;
      return b.localeCompare(a, "hr", { numeric: true });
    });
    return datoteke.map((f) => {
      const puna = path.join(dir, f);
      const { w, h } = velicina(puna);
      const o = { src: `${rel}/${encodeURIComponent(f)}`, w, h, opis: pravoIme(opis(f)) };
      const ot = otisak(puna);
      let natpis = mjestoPoOtisku[ot];
      const auto = AUTO[ot.replace(":", "_")];
      if (auto && JSON.stringify(auto.izvor) === JSON.stringify(natpis || "gore-lijevo")) natpis = auto.natpis;
      if (natpis) o.natpis = natpis;
      if (rel === "/fotke/portraits" || rel === "/fotke/atmosphere") o.natpis = "bez"; // na portretima i atmosferi nema imena
      return o;
    });
  }

  const popis = {};
  for (const mapa of MAPE.filter((m) => m !== "expanded-work")) {
    popis[mapa] = slike(path.join(FOTKE, mapa), `/fotke/${mapa}`);
  }
  // Live Music: najjači bendovi prvi (postavke.js → redoslijedBendova), ostali iza njih po datumu
  const red = (POSTAVKE.redoslijedBendova || []).map((x) => x.toLowerCase());
  const mjesto = (f) => { const i = red.indexOf((f.opis || "").toLowerCase()); return i < 0 ? red.length : i; };
  popis["live-music"] = popis["live-music"].map((f, i) => [f, i])
    .sort((a, b) => mjesto(a[0]) - mjesto(b[0]) || a[1] - b[1]).map(([f]) => f);

  // Atmosphere: izmiješaj da isti bend nije jedan do drugoga (ni ispod ni pored u 3 stupca,
  // ni zaredom na mobitelu gdje je jedan stupac). Isproba puno rasporeda i uzme najbolji;
  // uvijek isti rezultat (fiksno sjeme), pa se ne mijenja dok se fotke ne promijene.
  {
    const a = popis.atmosphere, n = a.length, L = Math.ceil(n / 3);
    let sjeme = 20261112;
    const sl = () => ((sjeme = (sjeme * 16807) % 2147483647) / 2147483647);
    const dan = (f) => (decodeURIComponent(f.src.split("/").pop()).match(/^\d{4}-\d{2}-\d{2}/) || [""])[0];
    // "Publika" s različitih koncerata se ne smatra istim bendom
    const grupa = (f) => (f.opis === "Publika" ? f.opis + dan(f) : f.opis);
    const kazna = (r) => {
      let k = 0;
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        if (grupa(r[i]) !== grupa(r[j])) continue;
        const d = j - i;
        if (d === 1) k += 100; else if (d === 2) k += 20; else if (d === 3) k += 5;
        const ri = i % L, rj = j % L, si = Math.floor(i / L), sj = Math.floor(j / L);
        if (si !== sj && Math.abs(ri - rj) <= 1) k += Math.abs(si - sj) === 1 ? 60 : 15;
        // ista večer (isti datum u imenu): neka budu što dalje
        if (dan(r[i]) === dan(r[j])) k += Math.max(0, 8 - d) * 30 + (si === sj ? 80 : 0) + (Math.abs(ri - rj) <= 1 ? 60 : 0);
      }
      return k;
    };
    let naj = a, najK = kazna(a);
    for (let t = 0; t < 30000 && najK > 0; t++) {
      const r = [...a];
      for (let i = n - 1; i > 0; i--) { const j = Math.floor(sl() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
      const k = kazna(r);
      if (k < najK) { najK = k; naj = r; }
    }
    popis.atmosphere = naj;
  }

  // Expanded Work: svaka podmapa je jedan artist, npr. public/fotke/expanded-work/Dubioza Kolektiv/
  const EW = path.join(FOTKE, "expanded-work");
  popis["expanded-work"] = (fs.existsSync(EW) ? fs.readdirSync(EW) : [])
    .filter((d) => fs.statSync(path.join(EW, d)).isDirectory())
    .sort((a, b) => a.localeCompare(b, "hr"))
    .map((artist) => ({
      artist: pravoIme(artist),
      id: "artist-" + artist.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d")
        .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      fotke: slike(path.join(EW, artist), `/fotke/expanded-work/${encodeURIComponent(artist)}`)
    }))
    .filter((a) => a.fotke.length);

  return popis;
}
