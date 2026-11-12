// Logika stranice. Ovo ne trebaš mijenjati: tekstove mijenjaš u postavke.js, fotke dodaješ u mapu "public/fotke".
export function pokreni(koren, P, F, BENDOVI) {
  // Fotke se ne šalju u punoj veličini: Vercel napravi manju verziju (WebP) prema veličini ekrana,
  // a sličice se učitavaju tek kad dođu blizu ekrana (lazy loading).
  const SIRINE = [640, 1080, 1920];
  const opt = (src, w) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;
  const srcset = (src) => SIRINE.map((w) => `${opt(src, w)} ${w}w`).join(", ");
  const slika = (src, sizes, lijeno = true) =>
    `src="${opt(src, 1080)}" srcset="${srcset(src)}" sizes="${sizes}" ${lijeno ? 'loading="lazy"' : ""} decoding="async"`;
  const KATEGORIJE = [
    { id: "live-music", naziv: "Live Music" },
    { id: "atmosphere", naziv: "Atmosphere" },
    { id: "portraits", naziv: "Portraits" }
  ];
  const ARTISTI = F["expanded-work"] || [];
  const fotke = (id) => F[id] || [];
  const esc = (s) => String(s || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const naziv = (id) => (KATEGORIJE.find((k) => k.id === id) || {}).naziv || "";
  const bezKvacica = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase();

  // pisaća mašina: tekst se ispisuje slovo po slovo
  const bezAnimacija = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tipkaci = new WeakMap();
  function tipkaj(el, tekst) {
    if (!el) return;
    clearInterval(tipkaci.get(el));
    tekst = tekst || "";
    if (bezAnimacija || !tekst) { el.textContent = tekst; el.classList.remove("tipka"); return; }
    let i = 0;
    el.textContent = ""; el.classList.add("tipka");
    const t = setInterval(() => {
      el.textContent = tekst.slice(0, ++i);
      if (i >= tekst.length) { clearInterval(t); el.classList.remove("tipka"); }
    }, 90);
    tipkaci.set(el, t);
  }


  const IKONE = {
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/></g><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 4h4.6l11.4 16h-4.6z"/><path stroke="currentColor" stroke-width="1.6" d="M19.4 4l-6.5 7.2M4.6 20l6.5-7.2"/></svg>'
  };
  const WA = P.whatsapp ? "https://wa.me/" + P.whatsapp.replace(/\D/g, "") : "";
  IKONE.whatsapp = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.8l5.1-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.3z"/></svg>';
  const veze = { facebook: P.facebook, instagram: P.instagram, x: P.x, whatsapp: WA };
  const NAZIVI = { facebook: "Facebook", instagram: "Instagram", x: "X", whatsapp: "WhatsApp" };
  const mreze = ["facebook", "instagram", "x", "whatsapp"].filter((m) => veze[m])
    .map((m) => `<a href="${esc(veze[m])}" target="_blank" rel="noopener" aria-label="${NAZIVI[m]}">${IKONE[m]}</a>`).join("");

  // ---------- kostur stranice ----------
  koren.insertAdjacentHTML("afterbegin", `
    <header class="zaglavlje" id="zaglavlje">
      <a class="ime${P.nadimak ? " ima-nadimak" : ""}" href="#" aria-label="${esc(P.ime)}">${P.nadimak
        ? `<span class="ime-nadimak" aria-hidden="true">${esc(P.nadimak)}</span><span class="ime-pravo" aria-hidden="true">${esc(P.ime)}</span>`
        : esc(P.ime)}</a>
      <nav class="izbornik" id="izbornik">
        <div class="work" id="work">
          <a href="#work" data-ruta="work">Work</a>
          <div class="podizbornik">
            ${KATEGORIJE.map((k) => `<a href="#${k.id}" data-ruta="${k.id}">${k.naziv}</a>`).join("")}
          </div>
        </div>
        <a href="#expanded-work" data-ruta="expanded-work">Expanded Work</a>
        <a href="#about" data-ruta="about">About</a>
        <a href="#contact" data-ruta="contact">Contact</a>
        <div class="mreze mreze-mobitel">${mreze}</div>
      </nav>
      <div class="mreze">${mreze}</div>
      <button class="hamburger" id="hamburger" aria-expanded="false" aria-controls="izbornik">Menu</button>
    </header>
    <main id="sadrzaj"></main>
    ${P.whatsapp ? `<a class="whatsapp" href="https://wa.me/${P.whatsapp.replace(/\D/g, "")}" target="_blank" rel="noopener" aria-label="Message me on WhatsApp">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.8l5.1-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.3z"/></svg>
      <span>WhatsApp</span></a>` : ""}
    <footer class="podnozje">
      <span>© ${new Date().getFullYear()} ${esc(P.ime)}</span>
      <span>${esc(P.podnaslov)}</span>
    </footer>
    <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Photo">
      <div class="lb-vrh"><span id="lb-brojac"></span><button class="lb-zatvori" id="lb-zatvori">Close ✕</button></div>
      <div class="lb-slika">
        <button class="lb-strelica lb-prije" id="lb-prije" aria-label="Previous">←</button>
        <img id="lb-img" alt="">
        <button class="lb-strelica lb-poslije" id="lb-poslije" aria-label="Next">→</button>
      </div>
      <div class="lb-natpis" id="lb-natpis" aria-hidden="true"></div>
      <div class="lb-strana lb-strana-desno" id="lb-mreze"></div>
    </div>`);

  const sadrzaj = document.getElementById("sadrzaj");
  const zaglavlje = document.getElementById("zaglavlje");
  // na mobitelu nema hovera: PiTmArin i pravo ime se sami izmjenjuju svakih par sekundi
  const imeEl = zaglavlje.querySelector(".ima-nadimak");
  if (imeEl && window.matchMedia("(hover: none)").matches && !bezAnimacija) {
    setInterval(() => imeEl.classList.toggle("pokazi"), 4000);
  }
  const izbornik = document.getElementById("izbornik");
  const hamburger = document.getElementById("hamburger");

  const zatvoriIzbornik = () => {
    izbornik.classList.remove("otvoren"); hamburger.textContent = "Menu"; hamburger.setAttribute("aria-expanded", false);
    document.documentElement.classList.remove("meni-otvoren");
  };
  hamburger.addEventListener("click", () => {
    const o = izbornik.classList.toggle("otvoren");
    hamburger.setAttribute("aria-expanded", o);
    hamburger.textContent = o ? "Close" : "Menu";
    document.documentElement.classList.toggle("meni-otvoren", o); // na mobitelu: stranica ispod se ne skrola
  });
  izbornik.addEventListener("click", (e) => { if (e.target.closest("a[href^='#']")) zatvoriIzbornik(); });
  window.addEventListener("scroll", () => zaglavlje.classList.toggle("puno", window.scrollY > 40), { passive: true });

  // ---------- zajednički dijelovi ----------
  function kartica(k) {
    const prva = fotke(k.id)[0];
    return `<a class="kategorija" href="#${k.id}">
      ${prva ? `<img ${slika(prva.src, "(max-width: 760px) 100vw, 33vw")} alt="">` : ""}
      <span>${k.naziv}</span><em>${fotke(k.id).length}</em></a>`;
  }

  // nacin: "hover" = potpis se pojavi na hover; "tipkaj" = hover + pisaća mašina; "bez" = 3 stupca bez potpisa (Atmosphere)
  function mreza(lista, nacin) {
    const klase = "galerija" + (nacin === "hover" || nacin === "tipkaj" ? " potpis-hover" : "") +
      (nacin === "tipkaj" ? " potpis-tipkano" : "") + (nacin === "bez" ? " tri-stupca" : "");
    return lista.length ? `<div class="${klase}">${lista.map((f, i) => `
        <button data-i="${i}" class="ulaz" style="aspect-ratio:${f.w}/${f.h}" aria-label="Enlarge: ${esc(f.opis)}">
          <img ${slika(f.src, "(max-width: 760px) 100vw, 50vw")} alt="${esc(f.opis)}" width="${f.w}" height="${f.h}">
          ${f.opis && nacin !== "bez" ? `<span class="potpis">${esc(f.opis)}</span>` : ""}
        </button>`).join("")}</div>`
      : `<p class="prazno">No photos here yet.</p>`;
  }

  function ukljuciMrezu(lista) {
    sadrzaj.querySelectorAll(".galerija button").forEach((b) =>
      b.addEventListener("click", () => otvoriLightbox(lista, +b.dataset.i)));
    sadrzaj.querySelectorAll(".galerija.potpis-tipkano button").forEach((b) =>
      b.addEventListener("mouseenter", () => tipkaj(b.querySelector(".potpis"), lista[+b.dataset.i].opis)));
    const els = sadrzaj.querySelectorAll(".ulaz");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((ent) => ent.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("u-kadru"); io.unobserve(e.target); }
      }), { rootMargin: "0px 0px -5% 0px" });
      els.forEach((e) => io.observe(e));
    } else els.forEach((e) => e.classList.add("u-kadru"));
  }

  // Slaže fotke u stupce tako da isti bend nikad nije blizu sam sebi. Sve fotke jednog benda
  // idu u isti stupac, ravnomjerno razmaknute (i preko mjesta gdje se traka vrti ispočetka),
  // pa se dva ista benda nikad ne nađu jedan pored drugoga, iako stupci klize različitom brzinom.
  function rasporedi(lista, n, tezina) {
    const grupe = new Map();
    lista.forEach((f) => {
      const k = f.opis || "?";
      if (!grupe.has(k)) grupe.set(k, []);
      grupe.get(k).push(f);
    });
    const vis = (g) => g.reduce((a, f) => a + f.h / f.w, 0);
    const stupci = Array.from({ length: n }, () => ({ grupe: [], vis: 0, broj: 0, gust: 0 }));
    const stavi = (k, ime, g) => {
      const st = stupci[k];
      st.grupe.push([ime, g]); st.vis += vis(g); st.broj += g.length; st.gust += g.length * g.length;
    };
    const redom = [...grupe.entries()].sort((a, b) => b[1].length - a[1].length || vis(b[1]) - vis(a[1]));
    // bendovi s 3+ fotke: raspodijeli ih tako da nijedan stupac nema previše "velikih" bendova
    redom.filter(([, g]) => g.length >= 3).forEach(([ime, g]) => {
      let k = 0;
      const c = (j) => (stupci[j].gust + g.length * g.length) / tezina[j];
      for (let j = 1; j < n; j++) if (c(j) < c(k) || (c(j) === c(k) && stupci[j].vis < stupci[k].vis)) k = j;
      stavi(k, ime, g);
    });
    // ostali popune stupce da budu podjednako visoki
    redom.filter(([, g]) => g.length < 3).forEach(([ime, g]) => {
      let k = 0;
      for (let j = 1; j < n; j++) if (stupci[j].vis / tezina[j] < stupci[k].vis / tezina[k]) k = j;
      stavi(k, ime, g);
    });
    // unutar stupca: svaki bend ravnomjerno kroz cijeli krug; isproba se puno pomaka i uzme
    // raspored u kojem su iste fotke najdalje jedna od druge (gledano i preko kraja trake)
    let sjeme = 12345;
    const slucajno = () => ((sjeme = (sjeme * 16807) % 2147483647) / 2147483647);
    const poredak = stupci.map((st) => {
      const L = st.broj;
      let najbolji = null;
      for (let pokusaj = 0; pokusaj < 400; pokusaj++) {
        const mjesta = [];
        st.grupe.forEach(([ime, g]) => {
          const faza = pokusaj === 0 ? 0.5 : slucajno();
          g.forEach((f, j) => mjesta.push({ f, ime, poz: ((j + faza) * L) / g.length + slucajno() * 0.01 }));
        });
        mjesta.sort((x, y) => x.poz - y.poz);
        let prva = Infinity, zbroj = 0;
        const zadnje = new Map(), prvo = new Map(), razmak = new Map();
        mjesta.forEach((m, i) => {
          if (zadnje.has(m.ime)) razmak.set(m.ime, Math.min(razmak.get(m.ime) ?? Infinity, i - zadnje.get(m.ime)));
          else prvo.set(m.ime, i);
          zadnje.set(m.ime, i);
        });
        st.grupe.forEach(([ime, g]) => {
          if (g.length < 2) return;
          const r = Math.min(razmak.get(ime), L - zadnje.get(ime) + prvo.get(ime));
          prva = Math.min(prva, r / Math.floor(L / g.length));
          zbroj += r;
        });
        if (!najbolji || prva > najbolji.prva || (prva === najbolji.prva && zbroj > najbolji.zbroj))
          najbolji = { prva, zbroj, red: mjesta.map((m) => m.f) };
      }
      return najbolji.red;
    });
    // redoslijed za lightbox: red po red preko stupaca (susjedni su uvijek različiti bendovi)
    const h = [], liste = Array.from({ length: n }, () => []);
    for (let r = 0; poredak.some((p) => r < p.length); r++)
      poredak.forEach((p, k) => { if (r < p.length) { liste[k].push(h.length); h.push(p[r]); } });
    return { h, liste };
  }

  // ---------- naslovnica: kolaž odabranih fotki, stupci se pomiču različitom brzinom dok skrolaš ----------
  let ocistiNaslovnicu = null;
  function naslovnica() {
    const sve = fotke("naslovna");
    let h = sve;
    if (!h.length) { sadrzaj.innerHTML = `<p class="prazno stranica">Add photos to the public/fotke/naslovna folder.</p>`; return; }
    sadrzaj.innerHTML = `<section class="kolaz" id="kolaz" aria-label="Selected photographs"></section>`;
    const kolaz = document.getElementById("kolaz");
    const mirno = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stupci = [], brojStupaca = 0, visine = [], hMin = 0, vrh = 0;

    function slozi() {
      const n = window.innerWidth < 700 ? 2 : 3;
      if (n !== brojStupaca) {
        brojStupaca = n;
        // srednji stupac dobije više fotki pa se kreće brže (kao kod Lindsay Adler)
        const tezina = n === 3 ? [1, 1.45, 1] : [1, 1.35];
        const raspored = rasporedi(sve, n, tezina);
        h = raspored.h;
        const liste = raspored.liste;
        kolaz.innerHTML = liste.map((l) => {
          const kartice = l.map((i) =>
            `<button data-i="${i}" aria-label="Enlarge: ${esc(h[i].opis)}" style="aspect-ratio:${h[i].w}/${h[i].h}">
               <img ${slika(h[i].src, "(max-width: 699px) 50vw, 33vw", i > 5)} alt="${esc(h[i].opis)}" width="${h[i].w}" height="${h[i].h}">
             </button>`).join("");
          // fotke se dupliciraju da se traka može vrtjeti bez šava
          return `<div class="kolaz-stupac"><div class="kolaz-traka${mirno ? "" : " vrti"}"${mirno ? "" : ` style="animation-duration:${+P.brzinaNaslovnice || 60}s"`}>${kartice}${mirno ? "" : kartice}</div></div>`;
        }).join("");
        kolaz.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => otvoriLightbox(h, +b.dataset.i)));
        stupci = [...kolaz.querySelectorAll(".kolaz-stupac")];
      }
      kolaz.style.height = "";
      stupci.forEach((s) => (s.style.transform = ""));
      visine = stupci.map((s) => {
        const t = s.firstElementChild;
        if (mirno || !t) return s.scrollHeight;
        // traka drži fotke 2x: jedan "krug" je pola visine plus razmak
        const g = parseFloat(getComputedStyle(t).rowGap) || 12;
        const krug = (t.scrollHeight + g) / 2;
        t.style.setProperty("--pomak", -krug + "px");
        return krug - g;
      });
      hMin = Math.min(...visine);
      kolaz.style.height = (mirno ? Math.max(...visine) : hMin) + "px";
      vrh = kolaz.getBoundingClientRect().top + window.scrollY;
      pomakni();
    }
    function pomakni() {
      if (mirno) return;
      const raspon = Math.max(1, hMin - window.innerHeight);
      const napredak = Math.min(1, Math.max(0, (window.scrollY - vrh) / raspon));
      stupci.forEach((s, i) => { s.style.transform = `translate3d(0, ${-(visine[i] - hMin) * napredak}px, 0)`; });
    }
    let ceka = false;
    const naSkrol = () => { if (!ceka) { ceka = true; requestAnimationFrame(() => { ceka = false; pomakni(); }); } };
    let tajmer;
    const naVelicinu = () => { clearTimeout(tajmer); tajmer = setTimeout(slozi, 150); };
    window.addEventListener("scroll", naSkrol, { passive: true });
    window.addEventListener("resize", naVelicinu);
    ocistiNaslovnicu = () => {
      window.removeEventListener("scroll", naSkrol);
      window.removeEventListener("resize", naVelicinu);
      ocistiNaslovnicu = null;
    };
    slozi();
  }

  function work() {
    sadrzaj.innerHTML = `<section class="stranica">
      <h1 class="naslov-stranice">Work</h1><p class="broj">Live music · Atmosphere · Portraits</p>
      <div class="kategorije">${KATEGORIJE.map(kartica).join("")}</div></section>`;
  }

  function galerija(id) {
    const lista = fotke(id);
    const nacin = id === "live-music" ? "hover" : id === "atmosphere" ? "bez" : undefined;
    sadrzaj.innerHTML = `<section class="stranica">
      <h1 class="naslov-stranice">${naziv(id)}</h1>
      <p class="broj">${lista.length} ${lista.length === 1 ? "photo" : "photos"}</p>
      ${mreza(lista, nacin)}</section>`;
    ukljuciMrezu(lista);
  }

  // ---------- Expanded Work: popis artista po slovima ----------
  function expanded() {
    const grupe = {};
    ARTISTI.forEach((a) => {
      const slovo = bezKvacica(a.artist)[0].toUpperCase();
      const k = /[A-Z]/.test(slovo) ? slovo : "#";
      (grupe[k] = grupe[k] || []).push(a);
    });
    sadrzaj.innerHTML = `<section class="stranica">
      <h1 class="naslov-stranice">Expanded Work</h1>
      <p class="broj">${ARTISTI.length} ${ARTISTI.length === 1 ? "artist" : "artists"}</p>
      <label class="trazilica" for="trazi">
        <input id="trazi" type="search" placeholder="Search by artist name" autocomplete="off">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M15.5 15.5L21 21" stroke="currentColor" stroke-width="1.5"/></svg>
      </label>
      <div class="abeceda" id="abeceda">
        ${Object.keys(grupe).sort().map((sl) => `
          <div class="slovo-grupa">
            <div class="slovo">${sl}</div>
            <div class="artisti">
              ${grupe[sl].map((a) => `<a class="artist" href="#${a.id}" data-ime="${esc(bezKvacica(a.artist))}">
                <span class="artist-slika"><img ${slika(a.fotke[0].src, "(max-width: 600px) 50vw, 260px")} alt=""></span>
                <span class="artist-ime">${esc(a.artist)}</span></a>`).join("")}
            </div>
          </div>`).join("")}
      </div>
      <p class="prazno" id="nema" hidden>No artists match that name.</p>
    </section>`;
    document.getElementById("trazi").addEventListener("input", (e) => {
      const q = bezKvacica(e.target.value.trim());
      let ukupno = 0;
      sadrzaj.querySelectorAll(".slovo-grupa").forEach((g) => {
        let n = 0;
        g.querySelectorAll(".artist").forEach((a) => { const ok = a.dataset.ime.includes(q); a.hidden = !ok; n += ok; });
        g.hidden = !n; ukupno += n;
      });
      document.getElementById("nema").hidden = ukupno > 0;
    });
  }

  function artist(a) {
    sadrzaj.innerHTML = `<section class="stranica">
      <a class="natrag" href="#expanded-work">← Expanded Work</a>
      <h1 class="naslov-stranice">${esc(a.artist)}</h1>
      <p class="broj">${a.fotke.length} ${a.fotke.length === 1 ? "photo" : "photos"}</p>
      ${mreza(a.fotke, "tipkaj")}</section>`;
    ukljuciMrezu(a.fotke);
  }

  function mojeStrasti() {
    const lista = fotke("moje-strasti");
    sadrzaj.innerHTML = `<section class="stranica">
      <h1 class="naslov-stranice">My Passion</h1>
      <p class="broj">Photos I take out of pure love</p>
      ${lista.length ? mreza(lista) : `<p class="prazno">Coming soon…</p>`}</section>`;
    if (lista.length) ukljuciMrezu(lista);
  }

  function about() {
    const aboutSlika = fotke("about")[0] || fotke("portraits")[0];
    sadrzaj.innerHTML = `<section class="stranica">
      <h1 class="naslov-stranice">About</h1><p class="broj">${esc(P.podnaslov)}</p>
      <div class="dvostupac">
        <div class="prozni">${(P.oMeni || []).map((p) => `<p>${esc(p)}</p>`).join("")}</div>
        ${aboutSlika ? `<img ${slika(aboutSlika.src, "(max-width: 760px) 100vw, 50vw", false)} alt="">` : ""}
      </div></section>`;
  }

  // ---------- kontakt ----------
  function contact() {
    const ig = (P.instagram || "").replace(/\/+$/, "").split("/").pop();
    sadrzaj.innerHTML = `<section class="stranica">
      <h1 class="naslov-stranice">Contact</h1><p class="broj" aria-hidden="true"></p>
      <div class="dvostupac">
        <dl class="kontakt">
          ${P.email ? `<div><dt>Email</dt><dd><a href="mailto:${esc(P.email)}">${esc(P.email)}</a></dd></div>` : ""}
          ${P.telefon ? `<div><dt>Phone</dt><dd><a href="tel:${esc(P.telefon.replace(/\s/g, ""))}">${esc(P.telefon)}</a></dd></div>` : ""}
          ${P.whatsapp ? `<div><dt>WhatsApp</dt><dd><a href="https://wa.me/${P.whatsapp.replace(/\D/g, "")}" target="_blank" rel="noopener">Send a message</a></dd></div>` : ""}
          ${ig ? `<div><dt>Instagram</dt><dd><a href="${esc(P.instagram)}" target="_blank" rel="noopener">@${esc(ig)}</a></dd></div>` : ""}
          ${P.grad ? `<div><dt>Based in</dt><dd>${esc(P.grad)}</dd></div>` : ""}
        </dl>
        <form class="obrazac" id="obrazac" novalidate>
          <div class="polje"><label for="f-ime">Your name</label><input id="f-ime" name="ime" required autocomplete="name"></div>
          <div class="polje"><label for="f-tel">Phone</label><input id="f-tel" name="telefon" type="tel" autocomplete="tel"></div>
          <div class="polje"><label for="f-mail">Email</label><input id="f-mail" name="mail" type="email" required autocomplete="email"></div>
          <div class="polje"><label for="f-poruka">Message</label><textarea id="f-poruka" name="poruka" rows="4"></textarea></div>
          <div class="polje">
            <label id="kal-naslov">Preferred dates</label>
            <div class="kalendar" id="kalendar" role="group" aria-labelledby="kal-naslov"></div>
            <p class="odabrani-datum" id="odabrani-datum">Click a day — click a second day to select several days in a row (optional).</p>
          </div>
          <button type="submit" class="posalji">Send</button>
          <p class="obavijest" id="obavijest" role="status"></p>
        </form>
      </div></section>`;
    // mini calendar: the client clicks a day (or two days for a range of consecutive days)
    const MJESECI = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const kal = document.getElementById("kalendar");
    const odabrani = document.getElementById("odabrani-datum");
    const danas = new Date(); danas.setHours(0, 0, 0, 0);
    let mjesec = new Date(danas.getFullYear(), danas.getMonth(), 1);
    let pocetak = null, kraj = null;
    function crtajKalendar() {
      const god = mjesec.getFullYear(), m = mjesec.getMonth();
      const dana = new Date(god, m + 1, 0).getDate();
      const prvi = (new Date(god, m, 1).getDay() + 6) % 7; // Monday = 0
      const unatrag = mjesec.getTime() > new Date(danas.getFullYear(), danas.getMonth(), 1).getTime();
      kal.innerHTML = `
        <div class="kal-vrh">
          <button type="button" class="kal-strelica" data-smjer="-1" aria-label="Previous month" ${unatrag ? "" : "disabled"}>←</button>
          <span>${MJESECI[m]} ${god}</span>
          <button type="button" class="kal-strelica" data-smjer="1" aria-label="Next month">→</button>
        </div>
        <div class="kal-mreza">
          ${["M", "T", "W", "T", "F", "S", "S"].map((d) => `<span class="kal-dan-ime">${d}</span>`).join("")}
          ${"<span></span>".repeat(prvi)}
          ${Array.from({ length: dana }, (_, i) => {
            const d = new Date(god, m, i + 1), t = d.getTime();
            const proslost = d < danas;
            const klase = ["kal-dan",
              t === danas.getTime() ? "kal-danas" : "",
              (pocetak && t === pocetak.getTime()) || (kraj && t === kraj.getTime()) ? "kal-odabran" : "",
              pocetak && kraj && t > pocetak.getTime() && t < kraj.getTime() ? "kal-raspon" : ""].join(" ").trim();
            return `<button type="button" class="${klase}" data-dan="${i + 1}" ${proslost ? "disabled" : ""}>${i + 1}</button>`;
          }).join("")}
        </div>`;
    }
    const formatDatuma = (d) => `${d.getDate()} ${MJESECI[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
    const opisOdabira = () => {
      if (!kraj) return formatDatuma(pocetak);
      const n = Math.round((kraj - pocetak) / 86400000) + 1;
      return `${formatDatuma(pocetak)} – ${formatDatuma(kraj)} (${n} days)`;
    };
    kal.addEventListener("click", (e) => {
      const strelica = e.target.closest(".kal-strelica");
      if (strelica) { mjesec = new Date(mjesec.getFullYear(), mjesec.getMonth() + +strelica.dataset.smjer, 1); crtajKalendar(); return; }
      const dan = e.target.closest(".kal-dan");
      if (!dan || dan.disabled) return;
      const d = new Date(mjesec.getFullYear(), mjesec.getMonth(), +dan.dataset.dan);
      if (pocetak && !kraj && d.getTime() === pocetak.getTime()) { pocetak = null; }
      else if (!pocetak || kraj || d < pocetak) { pocetak = d; kraj = null; }
      else kraj = d;
      odabrani.textContent = pocetak
        ? `Selected: ${opisOdabira()}${kraj ? "" : " — click a later day if you need several days."}`
        : "Click a day — click a second day to select several days in a row (optional).";
      crtajKalendar();
    });
    crtajKalendar();

    const f = document.getElementById("obrazac");
    const ob = document.getElementById("obavijest");
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const ime = f.ime.value.trim(), mail = f.mail.value.trim();
      if (!ime || !/^\S+@\S+\.\S+$/.test(mail)) {
        ob.textContent = "Please enter your name and a valid email address.";
        (ime ? f.mail : f.ime).focus();
        return;
      }
      const tijelo = `Name: ${ime}\nPhone: ${f.telefon.value.trim()}\nEmail: ${mail}` +
        (pocetak ? `\nPreferred date${kraj ? "s" : ""}: ${opisOdabira()}` : "") +
        `\n\n${f.poruka.value.trim()}`;
      location.href = `mailto:${P.email}?subject=${encodeURIComponent("Website inquiry: " + ime)}&body=${encodeURIComponent(tijelo)}`;
      ob.textContent = `Your email app should open with the message ready. If it doesn't, write to ${P.email}.`;
    });
  }

  // ---------- usmjeravanje (#work, #portraits ...) ----------
  function ruta() {
    if (ocistiNaslovnicu) ocistiNaslovnicu();
    const r = location.hash.replace("#", "");
    const a = ARTISTI.find((x) => x.id === r);
    if (r === "work") work();
    else if (KATEGORIJE.some((k) => k.id === r)) galerija(r);
    else if (r === "expanded-work") expanded();
    else if (a) artist(a);
    else if (r === "about") about();
    else if (r === "contact") contact();
    else naslovnica();
    document.querySelectorAll("[data-ruta]").forEach((el) =>
      el.classList.toggle("aktivno", el.dataset.ruta === r ||
        (el.dataset.ruta === "work" && KATEGORIJE.some((k) => k.id === r)) ||
        (el.dataset.ruta === "expanded-work" && !!a)));
    zaglavlje.classList.toggle("puno", window.scrollY > 40);
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", ruta);

  // ---------- povećanje fotke ----------
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  // povećana fotka: 1080 px je dosta za mobitel, inače 1920 px
  // na velikom ekranu original (do 2200 px), inače manja verzija; "w" = koliko je stvarno široka poslana fotka
  const lbIzvor = (f) => {
    const n = Math.max(innerWidth, innerHeight) * (window.devicePixelRatio || 1);
    if (n > 1950) return { url: f.src, w: f.w };
    const w = n > 1200 ? 1920 : 1080;
    return { url: opt(f.src, w), w: Math.min(f.w, w) };
  };
  let lbTrenutni = null;
  let lbLista = [], lbI = 0, prijeFokus = null;
  const LB_MREZE = [
    ["instagram", "Instagram"], ["facebook", "Facebook"], ["x", "X"],
    ["soundcloud", "SoundCloud"], ["bandcamp", "Bandcamp"], ["youtube", "YouTube"],
    ["spotify", "Spotify"], ["web", "Web"]
  ];
  function lbStrane(f) {
    const ime = f.opis || "";
    const b = BENDOVI[ime] || {};
    document.getElementById("lb-mreze").innerHTML = LB_MREZE.filter(([k]) => b[k])
      .map(([k, n]) => `<a href="${esc(b[k])}" target="_blank" rel="noopener">${n}</a>`).join("");
    const omjer = f.w && f.h ? f.w / f.h : 1.5;
    const sirina = Math.min(window.innerWidth, window.innerHeight * omjer);
    const strana = Math.max(0, (window.innerWidth - sirina) / 2);
    lb.style.setProperty("--lb-strana", strana + "px");
    lb.classList.toggle("bez-strana", strana < 190);
    smjestiNatpis(f);
  }
  // ime benda preko fotke; mjesto za pojedinu fotku se zadaje u natpisi.js
  const MJESTA = {
    "gore-lijevo": { x: 0, y: 0, poravnaj: "lijevo" },
    "gore": { x: 50, y: 0, poravnaj: "sredina" },
    "gore-desno": { x: 100, y: 0, poravnaj: "desno" },
    "dolje-lijevo": { x: 0, y: 100, poravnaj: "lijevo", dolje: true },
    "dolje": { x: 50, y: 100, poravnaj: "sredina", dolje: true },
    "dolje-desno": { x: 100, y: 100, poravnaj: "desno", dolje: true }
  };
  const lbNatpis = document.getElementById("lb-natpis");
  function smjestiNatpis(f) {
    const zadano = f.natpis || "gore-lijevo";
    if (zadano === "bez") { lbNatpis.hidden = true; return; }
    lbNatpis.hidden = false;
    const m = typeof zadano === "string" ? (MJESTA[zadano] || MJESTA["gore-lijevo"])
      : zadano.mjesto ? { ...(MJESTA[zadano.mjesto] || MJESTA["gore-lijevo"]), velicina: +zadano.velicina || 1 }
      : { x: +zadano.x || 0, y: +zadano.y || 0, poravnaj: zadano.poravnaj || "sredina", velicina: +zadano.velicina || 1, tocno: !!zadano.poravnaj };
    // gdje je fotka na ekranu (object-fit: contain, bez povećavanja iznad prave veličine)
    const W = lb.clientWidth, H = lb.clientHeight;
    // fotka se ne povećava iznad stvarne veličine poslane datoteke (zato se ime prije znalo naći izvan fotke)
    const k = Math.min(W / f.w, H / f.h, (lbTrenutni ? lbTrenutni.w : f.w) / f.w);
    const fw = f.w * k, fh = f.h * k, x0 = (W - fw) / 2, y0 = (H - fh) / 2;
    const rub = Math.max(14, fw * 0.035);
    // veličina slova prema kraćoj stranici fotke; natpis nikad širi od 45 % fotke
    let vel = Math.max(13, Math.min(88, Math.min(fw, fh) * 0.043 * (m.velicina || 1)));
    // širina gotovog natpisa (mjeri se puni tekst, da ne skače dok se tipka); ako je preširok, smanji slova
    const mjera = lbNatpis.cloneNode(); mjera.removeAttribute("id");
    mjera.textContent = lbNatpis.dataset.tekst || ""; mjera.style.visibility = "hidden";
    mjera.style.fontSize = vel + "px"; mjera.style.width = "auto"; lb.appendChild(mjera);
    const najvise = Math.min(fw - 2 * rub, fw * 0.45 * Math.max(1, m.velicina || 1));
    if (mjera.offsetWidth > najvise) { vel *= najvise / mjera.offsetWidth; mjera.style.fontSize = vel + "px"; }
    const sw = Math.min(mjera.offsetWidth, najvise), sh = mjera.offsetHeight; mjera.remove();
    lbNatpis.style.fontSize = vel + "px";
    let lijevo = x0 + (m.x / 100) * fw - (m.poravnaj === "desno" ? sw : m.poravnaj === "sredina" ? sw / 2 : 0);
    lijevo = Math.max(x0 + rub, Math.min(x0 + fw - rub - sw, lijevo));
    let vrh = m.dolje ? y0 + fh - rub - sh : y0 + (m.y / 100) * fh + (m.y || m.tocno ? 0 : rub);
    vrh = Math.max(y0 + rub * 0.6, Math.min(y0 + fh - rub - sh, vrh));
    lbNatpis.style.left = lijevo + "px"; lbNatpis.style.top = vrh + "px";
    lbNatpis.style.width = sw + "px";
    lbNatpis.style.textAlign = m.poravnaj === "desno" ? "right" : m.poravnaj === "sredina" ? "center" : "left";
  }
  function prikazi() {
    const f = lbLista[lbI];
    lbTrenutni = lbIzvor(f);
    lbImg.src = lbTrenutni.url; lbImg.alt = f.opis || "";
    lbNatpis.dataset.tekst = f.opis || "";
    lbNatpis.textContent = "";
    document.getElementById("lb-brojac").textContent = `${lbI + 1} / ${lbLista.length}`;
    lbStrane(f);
    if (f.natpis !== "bez") tipkaj(lbNatpis, f.opis);
    const s = lbLista[(lbI + 1) % lbLista.length]; if (s) new Image().src = lbIzvor(s).url;
  }
  window.addEventListener("resize", () => {
    if (lb.classList.contains("otvoren") && lbLista[lbI]) lbStrane(lbLista[lbI]);
  });
  function otvoriLightbox(lista, i) {
    lbLista = lista; lbI = i; prijeFokus = document.activeElement;
    prikazi(); lb.classList.add("otvoren"); document.body.style.overflow = "hidden";
    document.getElementById("lb-zatvori").focus();
  }
  function zatvori() {
    lb.classList.remove("otvoren"); document.body.style.overflow = "";
    if (prijeFokus) prijeFokus.focus();
  }
  const korak = (d) => { lbI = (lbI + d + lbLista.length) % lbLista.length; prikazi(); };
  document.getElementById("lb-zatvori").onclick = zatvori;
  document.getElementById("lb-prije").onclick = () => korak(-1);
  document.getElementById("lb-poslije").onclick = () => korak(1);
  // klik/tap na samu fotku: lijeva trećina = prethodna, ostalo = sljedeća
  lbImg.addEventListener("click", (e) => korak(e.clientX < window.innerWidth / 3 ? -1 : 1));
  lb.addEventListener("click", (e) => { if (e.target.classList.contains("lb-slika")) zatvori(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("otvoren")) return;
    if (e.key === "Escape") zatvori();
    if (e.key === "ArrowLeft") korak(-1);
    if (e.key === "ArrowRight") korak(1);
  });
  let x0 = null;
  lb.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) korak(dx < 0 ? 1 : -1);
    x0 = null;
  });

  ruta();
}
