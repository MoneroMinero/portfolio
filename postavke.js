// =====================================================
//  POSTAVKE STRANICE — ovdje mijenjaš tekstove.
//  Mijenjaj samo tekst unutar navodnika "...".
//  Ako nešto ne želiš prikazati, ostavi prazne navodnike "".
// =====================================================
const POSTAVKE = {
  ime: "Marin Šoštarić",                 // ime u zaglavlju i naslovu stranice
  podnaslov: "Concert & Portrait Photography",

  oMeni: [
    "A short introduction goes here: who you are, where you are based, what you photograph.",
    "Second paragraph: who you have worked with, which concerts and festivals you shoot, how to get in touch."
  ],

  email: "sostaric.marin@gmail.com",
  telefon: "099 445 4677",
  whatsapp: "+385 99 445 4677",         // broj za WhatsApp gumb (ostavi "" ako ga ne želiš)
  grad: "Zagreb, Croatia",

  // Društvene mreže: cijela adresa profila
  facebook: "",                          // upiši link kad složimo profil
  instagram: "",
  x: "",

  // Koliko brzo se fotke vrte na naslovnici (sekunde za jedan krug; više = sporije)
  brzinaNaslovnice: 210
};
export default POSTAVKE;
