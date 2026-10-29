"use client";
import { useEffect, useRef, useState } from "react";
import data from "@/content/voyages.json";
import { Emoji, H2, Img, L, Ph, Tag, Wrap } from "@/components/ui";

const { hero, recherche, categories, calendrier, sejours, colonies, organisateurs, cta } = data;
type Sej = { categorie: string; titre: string; dates: string; tags: string[]; img?: string; alt?: string };
const QUAND_TO_CAT = ["pessah", "souccot", "ete", "ski"];
const cat = (id: string) => categories.find((c) => c.id === id)!;

function QuoteModal({ sej, onClose }: { sej: string | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (sej && !d.open) { setSent(false); d.showModal(); }
    if (!sej && d.open) d.close();
  }, [sej]);

  const lbl = "text-sm font-extrabold";
  return (
    // <dialog> natif : focus piégé, Échap et inertie du fond gérés par le navigateur.
    <dialog ref={ref} onClose={onClose} onClick={(e) => e.target === ref.current && onClose()} aria-labelledby="devis-titre" className="m-auto w-[min(520px,calc(100%-32px))] rounded-3xl p-0 text-encre">
      <div className="flex flex-col gap-4 p-6 md:p-8">
        {sent ? (
          <div role="status" className="aj-pop-now flex flex-col items-start gap-4">
            <span aria-hidden="true" className="text-5xl">✈️</span>
            <h2 id="devis-titre" className="m-0 text-[28px] font-black">demande envoyée !</h2>
            <p className="m-0 text-[17px] leading-normal font-bold text-t2">Un conseiller AlloJ vous rappelle très vite avec une proposition pour « {sej} ».</p>
            <button type="button" autoFocus onClick={onClose} className="aj-btn min-h-12 rounded-full bg-violet px-6 font-black text-white">Fermer</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <h2 id="devis-titre" className="m-0 text-[28px] leading-[1.1] font-black">demander un devis.</h2>
              <button type="button" onClick={onClose} aria-label="Fermer" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-chip text-xl font-black text-violet">×</button>
            </div>
            <div className="flex flex-col gap-1.5"><label htmlFor="vsej" className={lbl}>Séjour</label><input id="vsej" readOnly value={sej ?? ""} className="aj-field bg-lfond font-bold" /></div>
            <div className="flex flex-col gap-1.5"><label htmlFor="vnom" className={lbl}>Nom et prénom</label><input id="vnom" required autoComplete="name" className="aj-field" /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5"><label htmlFor="vtel" className={lbl}>Téléphone</label><input id="vtel" type="tel" required autoComplete="tel" className="aj-field" /></div>
              <div className="flex flex-col gap-1.5"><label htmlFor="vvoy" className={lbl}>Voyageurs</label><input id="vvoy" type="number" min={1} max={30} defaultValue={2} required className="aj-field" /></div>
            </div>
            <div className="flex flex-col gap-1.5"><label htmlFor="vmail" className={lbl}>E-mail</label><input id="vmail" type="email" required autoComplete="email" className="aj-field" /></div>
            <button type="submit" className="aj-btn min-h-14 rounded-full bg-violet text-[17px] font-black text-white">Envoyer ma demande</button>
          </form>
        )}
      </div>
    </dialog>
  );
}

export default function VoyagesView() {
  const [tab, setTab] = useState("all");
  const [quand, setQuand] = useState(0);
  const [modal, setModal] = useState<string | null>(null);

  const go = (id: string) => {
    setTab(id);
    document.getElementById("sejours")?.scrollIntoView({ behavior: "smooth" });
  };
  const shown = (sejours as Sej[]).filter((s) => tab === "all" || s.categorie === tab);
  const tabLabel = tab === "all" ? null : cat(tab);
  const parts = [...organisateurs, ...organisateurs, ...organisateurs, ...organisateurs];

  return (
    <>
      <section className="relative overflow-hidden bg-violet text-white">
        <span aria-hidden="true" className="aj-float2 absolute -top-[140px] -left-[120px] size-[420px] rounded-full bg-[#5A1FC0] opacity-55" />
        <Wrap className="relative flex flex-wrap items-center gap-10 py-10 md:gap-14 md:py-16">
          <div className="flex min-w-0 flex-[1_1_520px] flex-col items-start gap-5 md:gap-[26px]">
            <div className="aj-up flex flex-col items-start text-sm font-black tracking-[1px] md:text-lg">
              <span className="bg-white px-3.5 py-1 text-violet">{hero.tags[0]}</span>
              <span className="bg-vif px-3.5 py-1">{hero.tags[1]}</span>
            </div>
            <h1 className="aj-up aj-d1 m-0 max-w-[980px] text-[clamp(44px,5.6vw,80px)] leading-[1.02] font-black tracking-[-1.5px] md:tracking-[-2.5px]">
              {hero.titre_avant} <span className="aj-surligne">{hero.titre_surligne}</span>
            </h1>
            <p className="aj-up aj-d2 m-0 max-w-[640px] text-[17px] leading-normal text-surv md:text-xl">{hero.texte}</p>
            <div role="search" className="aj-up aj-d3 flex w-full max-w-[760px] flex-wrap gap-2 rounded-[20px] bg-white p-2 text-encre shadow-[0_24px_48px_rgba(16,0,50,.35)]">
              {[["fete", "Quand", recherche.quand, quand, (i: number) => setQuand(i)], ["dest", "Où", recherche.ou], ["voy", "Voyageurs", recherche.voyageurs]].map(([id, label, opts, val, on], i) => (
                <div key={id as string} className={`flex min-w-[190px] flex-[1_1_190px] flex-col px-3.5 py-2 ${i ? "md:border-l md:border-bord" : ""}`}>
                  <label htmlFor={id as string} className="text-xs font-extrabold tracking-[1px] text-t2 uppercase">{label as string}</label>
                  <select id={id as string} value={on ? (opts as string[])[val as number] : undefined} onChange={on ? (e) => (on as (i: number) => void)(e.target.selectedIndex) : undefined} className="bg-transparent py-0.5 text-[17px] font-black text-violet">
                    {(opts as string[]).map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <button type="button" onClick={() => go(QUAND_TO_CAT[quand])} className="aj-btn min-h-[60px] rounded-[14px] bg-violet px-7 text-base font-black text-white max-md:w-full">Voir les séjours</button>
            </div>
          </div>
          <div className="aj-up aj-d2 relative mx-auto w-full max-w-[340px] min-w-0 flex-[1_1_340px] md:mx-0 md:max-w-[420px]">
            <div className="aj-float2 relative aspect-[4/5] rotate-[4deg] overflow-hidden rounded-[26px] shadow-[var(--aj-shadow-photo)]">
              <Img src={hero.img} alt={hero.alt} sizes="(max-width:768px) 340px, 420px" priority />
            </div>
            <span className="aj-float absolute -bottom-3.5 -left-2 rounded-[18px] bg-lilas px-4 py-3 text-[15px] font-black text-[#2A0068] shadow-[0_16px_32px_rgba(10,0,40,.35)] md:-left-6">{hero.bulle}</span>
          </div>
        </Wrap>
      </section>

      <nav aria-label="Types de séjours" className="sticky top-[65px] z-40 border-b border-bord bg-white md:top-[78px]">
        <div className="noscroll mx-auto flex max-w-[1280px] gap-2.5 overflow-x-auto px-4 py-3 md:px-8 md:py-4">
          {[{ id: "all", label: "Tous", emoji: "✨" }, ...categories].map((c) => (
            <button key={c.id} type="button" aria-pressed={tab === c.id} onClick={() => setTab(c.id)} className="aj-chip shrink-0 !text-[15px] whitespace-nowrap"><span aria-hidden="true" className="mr-1.5">{c.emoji}</span>{c.label}</button>
          ))}
        </div>
      </nav>

      <section aria-label="Calendrier des fêtes">
        <Wrap className="flex flex-col gap-[22px] pt-12 pb-6 md:pt-14">
          <h2 className="aj-rv m-0 text-[28px] font-black tracking-[-1px] md:text-[34px]">📅 le calendrier des fêtes.</h2>
          <ol className="m-0 grid list-none grid-cols-1 gap-3.5 p-0 sm:grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))]">
            {calendrier.map((c) => {
              const img = (c as { img?: string }).img;
              return (
                <li key={c.id} className="aj-rv">
                  <button type="button" onClick={() => go(c.id)} className={`aj-lift relative flex h-full w-full flex-col gap-1 overflow-hidden rounded-b-2xl border-t-4 border-violet p-[18px] text-left ${img ? "bg-nuit text-white" : "bg-lfond"}`}>
                    {img && <><Img src={img} alt="" sizes="260px" className="opacity-45" /><span className="absolute inset-0 bg-nuit/50" aria-hidden="true" /></>}
                    <span className={`relative text-xl font-black ${img ? "text-white" : "text-violet"}`}><span aria-hidden="true">{c.emoji} </span>{c.nom}</span>
                    <span className="relative text-[15px] font-extrabold">{c.dates}</span>
                    <span className={`relative text-[13px] font-bold ${img ? "text-surv" : "text-t2"}`}>{c.offres}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </Wrap>
      </section>

      <section id="sejours" className="scroll-mt-32">
        <Wrap className="flex flex-col gap-[26px] pt-10 pb-16 md:pb-20">
          <div className="flex flex-col items-start gap-2.5">
            <Tag>{tabLabel ? `${tabLabel.emoji} ${tabLabel.label.toUpperCase()}` : "✈️ TOUS LES SÉJOURS"}</Tag>
            <H2>les séjours à la une.</H2>
          </div>
          {shown.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-[22px] border-2 border-dashed border-[#C9B5FF] px-6 py-12 text-center">
              <span aria-hidden="true" className="text-5xl">{tabLabel?.emoji}</span>
              <h3 className="m-0 text-2xl font-black">bientôt des séjours {tabLabel?.label.toLowerCase()}.</h3>
              <p className="m-0 font-bold text-t2">Dites-nous ce que vous cherchez, on s&apos;occupe du reste.</p>
              <button type="button" onClick={() => setModal(tabLabel!.label)} className="aj-btn rounded-full bg-violet px-6 py-3 font-black text-white">Demander un devis</button>
            </div>
          ) : (
            <div key={tab} className="grid gap-6 md:grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))]">
              {shown.map((s, i) => {
                const c = cat(s.categorie);
                return (
                  <article key={s.titre} style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }} className="aj-up aj-lift aj-zoom flex flex-col overflow-hidden rounded-[22px] border border-bord bg-white">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {s.img ? <Img src={s.img} alt={s.alt || s.titre} sizes="(max-width:768px) 100vw, 420px" /> : <Ph emoji={c.emoji} className="text-[80px]" />}
                      <span className="absolute bottom-4 left-4 bg-white px-2.5 py-[3px] text-base font-black text-violet uppercase">{c.label}</span>
                      {s.img && <Emoji className="top-3.5 right-3.5 size-[46px] text-[22px]">{c.emoji}</Emoji>}
                    </div>
                    <div className="flex flex-1 flex-col gap-2.5 p-5">
                      <h3 className="m-0 text-[22px] font-black">{s.titre}</h3>
                      <span className="text-[15px] font-bold text-t2">📅 {s.dates}</span>
                      <div className="flex flex-wrap gap-2">{s.tags.map((t) => <span key={t} className="rounded-full bg-chip px-3 py-[5px] text-[13px] font-extrabold text-violet">{t}</span>)}</div>
                      <button type="button" onClick={() => setModal(s.titre)} className="aj-btn mt-auto self-start rounded-full bg-violet px-[18px] py-3 text-[15px] font-black text-white">Demander un devis</button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </Wrap>
      </section>

      <section className="bg-lfond">
        <Wrap className="flex flex-wrap items-center gap-10 py-14 md:py-[72px]">
          <div className="aj-rv relative aspect-[16/10] min-w-0 flex-[1_1_420px] overflow-hidden rounded-3xl"><Ph emoji="🏕️" className="text-[100px]" /></div>
          <div className="aj-rv flex min-w-0 flex-[1_1_420px] flex-col items-start gap-[18px]">
            <Tag>{colonies.tag}</Tag>
            <h2 className="m-0 text-[clamp(32px,3.6vw,48px)] leading-[1.05] font-black tracking-[-1.5px]">{colonies.titre}</h2>
            <p className="m-0 text-lg leading-normal text-t2">{colonies.texte}</p>
            <button type="button" onClick={() => go("colonie")} className="aj-btn rounded-full bg-violet px-6 py-[15px] text-base font-black text-white">{colonies.bouton}</button>
          </div>
        </Wrap>
      </section>

      <section aria-label="Organisateurs partenaires">
        <div className="flex flex-col items-center gap-5 py-12 text-center md:gap-[22px] md:py-14">
          <h2 className="aj-rv m-0 px-4 text-[28px] font-black">🤝 nos organisateurs partenaires.</h2>
          <div className="aj-marquee w-full overflow-hidden">
            <div className="aj-track-slow text-xl font-black whitespace-nowrap text-t3 md:text-2xl">
              {parts.map((p, i) => <span key={i} className="flex items-center gap-8 px-8">{p}<span aria-hidden="true" className="text-[#C9B5FF]">✦</span></span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-violet text-white">
        <Wrap className="flex flex-wrap items-center justify-between gap-6 py-12 md:py-14">
          <h2 className="aj-rv m-0 max-w-[700px] text-[clamp(28px,3vw,40px)] leading-[1.1] font-black tracking-[-1px]">{cta.titre}</h2>
          <L href={cta.href} className="aj-btn rounded-full bg-white px-[26px] py-4 text-[17px] font-black no-underline">{cta.bouton}</L>
        </Wrap>
      </section>

      <QuoteModal sej={modal} onClose={() => setModal(null)} />
    </>
  );
}
