"use client";
import { useEffect, useRef } from "react";
import { pokreni } from "../lib/stranica";

export default function Stranica({ postavke, fotke, bendovi }) {
  const koren = useRef(null);
  useEffect(() => {
    const el = koren.current;
    if (!el || el.dataset.pokrenuto) return; // samo jednom
    el.dataset.pokrenuto = "1";
    pokreni(el, postavke, fotke, bendovi);
  }, [postavke, fotke, bendovi]);
  return <div id="stranica" ref={koren} suppressHydrationWarning />;
}
