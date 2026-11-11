// Naslovnica. Popis fotki se napravi kad se stranica objavi, iz mape public/fotke.
import Stranica from "./Stranica";
import { napraviPopis } from "../lib/fotke";
import POSTAVKE from "../postavke.js";
import BENDOVI from "../bendovi.js";

export const dynamic = "force-static";

export default function Naslovnica() {
  return <Stranica postavke={POSTAVKE} fotke={napraviPopis()} bendovi={BENDOVI} />;
}
