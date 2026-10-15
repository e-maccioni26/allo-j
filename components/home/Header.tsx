"use client";
import Image from "next/image";
import { useState } from "react";

const NAV = ["Restaurants", "Voyages", "Réceptions", "Vie juive", "Immobilier", "Israël", "USA"];

const Logo = ({ h, text, color = "text-violet" }: { h: number; text: string; color?: string }) => (
  <a className="flex items-center gap-2 no-underline md:gap-2.5">
    <Image className="aj-wave w-auto" style={{ height: h }} src="/images/picto-alloj.png" alt="" width={90} height={90} priority />
    <span className={`font-black tracking-[-1px] ${color} ${text}`}>alloj</span>
    <span className="sr">AlloJ, retour à l&apos;accueil</span>
  </a>
);

const Live = () => (
  <a className="flex items-center gap-1.5 py-3 text-vif no-underline">
    <span className="aj-blink size-2 rounded-full bg-[#E0245E]" />Alloj Le Live
  </a>
);

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-bord bg-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-x-8 gap-y-4 px-4 py-2.5 md:flex-wrap md:px-8 md:py-3.5">
        <span className="md:hidden"><Logo h={38} text="text-[26px]" /></span>
        <span className="hidden md:block"><Logo h={46} text="text-[32px]" /></span>

        <nav aria-label="Navigation principale" className="hidden flex-wrap gap-x-[22px] text-[15px] font-extrabold md:flex xl:gap-x-[26px]">
          {NAV.map((n) => <a key={n} className="py-3 text-encre no-underline">{n}</a>)}
          <Live />
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a className="px-2 py-3 text-[15px] font-extrabold">Annonceurs</a>
          <a className="aj-btn rounded-full bg-violet px-[22px] py-[13px] text-[15px] font-extrabold !text-white no-underline">Connexion</a>
        </div>

        <div className="flex gap-1 md:hidden">
          <button type="button" aria-label="Rechercher" className="flex size-11 items-center justify-center bg-transparent">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#17102A" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          </button>
          <button type="button" aria-label={open ? "Fermer le menu" : "Menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="aj-btn flex size-11 items-center justify-center rounded-xl bg-violet">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Menu mobile" className="fixed inset-x-0 top-[65px] bottom-0 z-50 flex flex-col gap-1 overflow-y-auto bg-white px-4 py-6 text-2xl font-black md:hidden">
          {NAV.map((n) => <a key={n} className="border-b border-bord py-3 text-encre no-underline">{n}</a>)}
          <Live />
          <a className="py-3">Annonceurs</a>
          <a className="mt-2 rounded-full bg-violet py-3.5 text-center text-lg !text-white no-underline">Connexion</a>
        </nav>
      )}
    </header>
  );
}
