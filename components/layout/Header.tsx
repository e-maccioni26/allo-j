"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { L } from "@/components/ui";

type Shabbat = { parasha: string; ville: string; allumage: string; sortie: string };

const NAV = [
  { label: "Restaurants", href: "/restaurants" },
  { label: "Voyages", href: "/voyages" },
  { label: "Réceptions" },
  { label: "Vie juive" },
  { label: "Immobilier" },
  { label: "Israël" },
  { label: "USA" },
];

const hour = (s: string) => s.match(/\d+h\d+$/)?.[0];
const day = (s: string) => s.replace(/ ?\d+h\d+$/, " ");

const Logo = ({ h, text, pro }: { h: number; text: string; pro?: boolean }) => (
  <L href="/" className="flex items-center gap-2 no-underline md:gap-2.5">
    <Image className="aj-wave w-auto" style={{ height: h }} src="/images/picto-alloj.png" alt="" width={90} height={90} priority />
    <span className={`font-black tracking-[-1px] text-violet ${text}`}>alloj</span>
    {pro && <span className="bg-violet px-2 py-1 text-xs font-black tracking-[1.5px] text-white">PRO</span>}
    <span className="sr">AlloJ, retour à l&apos;accueil</span>
  </L>
);

const Live = ({ onClick }: { onClick?: () => void }) => (
  <L href="/#live" onClick={onClick} className="flex items-center gap-1.5 py-3 text-vif no-underline">
    <span className="aj-blink size-2 rounded-full bg-[#E0245E]" />Alloj Le Live
  </L>
);

function ProHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-bord bg-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-x-8 px-4 py-2.5 md:px-8 md:py-3.5">
        <span className="md:hidden"><Logo h={38} text="text-[26px]" pro /></span>
        <span className="hidden md:block"><Logo h={46} text="text-[32px]" pro /></span>
        <nav aria-label="Espace annonceurs" className="hidden gap-x-[26px] text-[15px] font-extrabold md:flex">
          {[["Audience", "#audience"], ["Formats", "#formats"], ["Partenaires", "#partenaires"], ["Retour au site", "/"]].map(([l, h]) => (
            <L key={l} href={h} className="py-3 text-encre no-underline">{l}</L>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a className="hidden px-2 py-3 text-[15px] font-black md:block">01 85 61 27 70</a>
          <a href="#devis" className="aj-btn rounded-full bg-violet px-4 py-3 text-sm font-extrabold !text-white no-underline md:px-[22px] md:py-[13px] md:text-[15px]">Demander un devis</a>
        </div>
      </div>
    </header>
  );
}

export default function Header({ shabbat: s }: { shabbat: Shabbat }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  if (path === "/annonceurs") return <ProHeader />;
  const close = () => setOpen(false);
  const active = (href?: string) => href && href !== "/" && path.startsWith(href);

  return (
    <>
      <div className="bg-nuit text-[13px] text-white md:text-sm">
        <div className="mx-auto flex max-w-[1280px] justify-between gap-x-6 gap-y-2 px-4 py-[9px] md:flex-wrap md:px-8 md:py-2.5">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            <span className="font-black text-lilas">🕯️ Chabbat {s.parasha} · {s.ville}</span>
            <span className="hidden md:inline">Allumage {day(s.allumage)}<strong>{hour(s.allumage)}</strong></span>
            <span className="hidden md:inline">Sortie {day(s.sortie)}<strong>{hour(s.sortie)}</strong></span>
            <span className="md:hidden">{hour(s.allumage)} → {hour(s.sortie)}</span>
          </div>
          <div className="flex items-center gap-5 font-bold">
            <a className="!text-white">📍 <span className="md:hidden">Ville</span><span className="hidden md:inline">Changer de ville</span></a>
            <a className="hidden !text-white md:inline">FR · EN</a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-bord bg-white">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-x-8 gap-y-4 px-4 py-2.5 md:flex-wrap md:px-8 md:py-3.5">
          <span className="md:hidden"><Logo h={38} text="text-[26px]" /></span>
          <span className="hidden md:block"><Logo h={46} text="text-[32px]" /></span>

          <nav aria-label="Navigation principale" className="hidden flex-wrap gap-x-[22px] text-[15px] font-extrabold md:flex xl:gap-x-[26px]">
            {NAV.map((n) => (
              <L key={n.label} href={n.href} aria-current={active(n.href) ? "page" : undefined} className={`py-3 text-encre no-underline ${active(n.href) ? "underline decoration-violet decoration-[3px] underline-offset-[10px]" : ""}`}>{n.label}</L>
            ))}
            <Live />
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <L href="/annonceurs" className="px-2 py-3 text-[15px] font-extrabold">Annonceurs</L>
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
            {NAV.map((n) => <L key={n.label} href={n.href} onClick={close} className="border-b border-bord py-3 text-encre no-underline">{n.label}</L>)}
            <Live onClick={close} />
            <L href="/annonceurs" onClick={close} className="py-3">Annonceurs</L>
            <a className="mt-2 rounded-full bg-violet py-3.5 text-center text-lg !text-white no-underline">Connexion</a>
          </nav>
        )}
      </header>
    </>
  );
}
