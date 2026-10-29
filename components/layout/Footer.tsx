import Image from "next/image";
import { L, Wrap } from "@/components/ui";
import annonceurs from "@/content/annonceurs.json";

const COLS: [string, [string, string?][]][] = [
  ["Rubriques", [["Restaurants", "/restaurants"], ["Voyages", "/voyages"], ["Réceptions"], ["Vie juive"], ["Immobilier"]]],
  ["AlloJ", [["Alloj Le Live", "/#live"], ["Alloj Events"], ["Annonceurs", "/annonceurs"], ["Ajouter mon établissement", "/annonceurs#devis"], [annonceurs.telephone]]],
  ["Suivez-nous", [["Instagram"], ["TikTok"], ["YouTube"], ["WhatsApp"], ["Facebook"]]],
];

export default function Footer() {
  return (
    <footer className="bg-nuit text-surn">
      <Wrap className="flex flex-col gap-3.5 py-7 text-sm font-bold md:gap-10 md:pt-16 md:pb-8 md:text-[15px]">
        <div className="grid gap-8 md:grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))]">
          <div className="flex flex-col gap-3.5">
            <span className="flex items-center gap-2.5">
              <Image className="hidden h-11 w-auto rounded-xl bg-white p-1 md:block" src="/images/picto-alloj.png" alt="" width={90} height={90} />
              <span className="text-[26px] font-black tracking-[-1px] text-white md:text-[30px]">alloj</span>
            </span>
            <p className="m-0 hidden leading-normal font-bold md:block">Le guide de la vie juive, en France, en Israël et dans le monde.</p>
          </div>
          {COLS.map(([t, links]) => (
            <nav key={t} aria-label={t} className={`flex-col gap-2.5 ${t === "Suivez-nous" ? "flex max-md:flex-row max-md:flex-wrap max-md:gap-x-[18px] max-md:gap-y-2" : "hidden md:flex"}`}>
              <span className="hidden font-black text-white md:block">{t}</span>
              {links.map(([l, h]) => <L key={l} href={h} className="!text-surn">{l}</L>)}
            </nav>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm font-semibold md:border-t md:border-white/15 md:pt-[22px]">
          <span>© 2026 AlloJ</span><a className="!text-surn">Mentions légales</a><a className="!text-surn">Confidentialité</a><a className="hidden !text-surn md:inline">Cookies</a>
        </div>
      </Wrap>
    </footer>
  );
}
