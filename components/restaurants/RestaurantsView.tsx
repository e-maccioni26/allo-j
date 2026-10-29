"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import data from "@/content/restaurants.json";
import { Emoji, Img, L, Ph, Tag, Wrap } from "@/components/ui";

type R = (typeof data.restaurants)[number] & { img?: string; alt?: string; ouverture?: string; nouveau?: boolean; reel?: boolean };
const ALL = data.restaurants as R[];
const { filtres: F, page: P } = data;
const OPTS = [["open", "Ouvert maintenant", "ouvert"], ["livraison", "Livraison Chabbat", "livraison_chabbat"], ["resa", "Réservation en ligne", "reservation_en_ligne"]] as const;

type State = { q: string; cert: string[]; cat: string[]; cuisine: string[]; ville: string; opt: string[]; tri: string };
const EMPTY: State = { q: "", cert: [], cat: [], cuisine: [], ville: F.villes[0], opt: [], tri: F.tris[0] };

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const list = (v: string | null) => (v ? v.split("|").filter(Boolean) : []);

function fromUrl(): State {
  const u = new URLSearchParams(location.search);
  return {
    q: u.get("q") ?? "", cert: list(u.get("cert")), cat: list(u.get("cat")), cuisine: list(u.get("cuisine")),
    ville: F.villes.includes(u.get("ville") ?? "") ? u.get("ville")! : EMPTY.ville,
    opt: list(u.get("opt")), tri: F.tris.includes(u.get("tri") ?? "") ? u.get("tri")! : EMPTY.tri,
  };
}

function toUrl(s: State) {
  const u = new URLSearchParams();
  if (s.q) u.set("q", s.q);
  if (s.cert.length) u.set("cert", s.cert.join("|"));
  if (s.cat.length) u.set("cat", s.cat.join("|"));
  if (s.cuisine.length) u.set("cuisine", s.cuisine.join("|"));
  if (s.ville !== EMPTY.ville) u.set("ville", s.ville);
  if (s.opt.length) u.set("opt", s.opt.join("|"));
  if (s.tri !== EMPTY.tri) u.set("tri", s.tri);
  const qs = u.toString();
  return location.pathname + (qs ? `?${qs}` : "");
}

const toggle = (arr: string[], v: string) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

function status(r: R) {
  const text = r.ouverture ?? (r.ouvert ? "Ouvert" : "Fermé");
  return { text, cls: r.ouvert ? "text-[#1D7A46]" : "text-[#8A4B00]" };
}

export default function RestaurantsView() {
  const [s, setS] = useState<State>(EMPTY);
  const [sheet, setSheet] = useState(false);
  const ready = useRef(false);
  const panel = useRef<HTMLElement>(null);

  // L'URL fait foi au chargement ; ensuite l'état la met à jour sans recharger.
  useEffect(() => { setS(fromUrl()); ready.current = true; }, []);
  useEffect(() => { if (ready.current) history.replaceState(null, "", toUrl(s)); }, [s]);
  useEffect(() => {
    if (!sheet) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setSheet(false);
    addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => { removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [sheet]);

  const set = (p: Partial<State>) => setS((o) => ({ ...o, ...p }));

  const results = useMemo(() => {
    const q = norm(s.q.trim());
    const out = ALL.filter((r) =>
      (!q || norm(`${r.nom} ${r.lieu} ${r.ville} ${r.cuisine}`).includes(q)) &&
      (!s.cert.length || s.cert.includes(r.certification)) &&
      (!s.cat.length || s.cat.includes(r.categorie)) &&
      (!s.cuisine.length || s.cuisine.includes(r.cuisine)) &&
      (s.ville === "Toutes" || r.ville === s.ville) &&
      OPTS.every(([k, , f]) => !s.opt.includes(k) || (r as Record<string, unknown>)[f]),
    );
    const vues = (a: R, b: R) => b.vues - a.vues;
    const sorters: Record<string, (a: R, b: R) => number> = {
      [F.tris[0]]: (a, b) => Number(!!b.reel) - Number(!!a.reel) || vues(a, b),
      [F.tris[1]]: (a, b) => Number(!!b.nouveau) - Number(!!a.nouveau) || vues(a, b),
      [F.tris[2]]: (a, b) => a.nom.localeCompare(b.nom, "fr"),
    };
    return out.sort(sorters[s.tri]);
  }, [s]);

  const top = useMemo(() => [...ALL].sort((a, b) => b.vues - a.vues).slice(0, 10), []);

  const active = [
    ...(s.q ? [{ k: `q`, label: `« ${s.q} »`, off: () => set({ q: "" }) }] : []),
    ...s.cert.map((v) => ({ k: `c${v}`, label: v, off: () => set({ cert: toggle(s.cert, v) }) })),
    ...s.cat.map((v) => ({ k: `t${v}`, label: v, off: () => set({ cat: toggle(s.cat, v) }) })),
    ...s.cuisine.map((v) => ({ k: `u${v}`, label: v, off: () => set({ cuisine: toggle(s.cuisine, v) }) })),
    ...(s.ville !== EMPTY.ville ? [{ k: "v", label: s.ville, off: () => set({ ville: EMPTY.ville }) }] : []),
    ...s.opt.map((v) => ({ k: `o${v}`, label: OPTS.find((o) => o[0] === v)![1], off: () => set({ opt: toggle(s.opt, v) }) })),
  ];
  const reset = () => setS(EMPTY);

  const Chip = ({ label, emoji, on, click }: { label: string; emoji: string; on: boolean; click: () => void }) => (
    <button type="button" aria-pressed={on} onClick={click} className="aj-chip"><span aria-hidden="true" className="mr-1.5">{emoji}</span>{label}</button>
  );

  return (
    <>
      <section className="bg-lfond">
        <Wrap className="flex flex-col gap-4 pt-6 pb-7 md:gap-[18px] md:pt-10 md:pb-9">
          <nav aria-label="Fil d'Ariane" className="flex gap-2 text-sm font-bold text-t2">
            <L href="/" className="no-underline">Accueil</L><span aria-hidden="true">›</span><span aria-current="page">Restaurants</span>
          </nav>
          <h1 className="aj-up m-0 text-[clamp(38px,4.5vw,64px)] leading-[1.02] font-black tracking-[-1.5px] md:tracking-[-2px]">
            {P.titre_avant} <span className="aj-surligne !bg-violet !text-white">{P.titre_surligne}</span>
          </h1>
          <div role="search" className="aj-up aj-d1 flex max-w-[760px] flex-wrap gap-1.5 rounded-[18px] border border-[#E4DAF7] bg-white p-1.5">
            <label htmlFor="qr" className="sr">Nom, quartier ou plat</label>
            <input id="qr" type="search" value={s.q} onChange={(e) => set({ q: e.target.value })} placeholder={P.recherche_placeholder} className="min-h-[52px] flex-[1_1_220px] bg-transparent px-3.5 text-base font-bold outline-none" />
            <button type="button" className="aj-btn min-h-[52px] rounded-[14px] bg-violet px-[26px] text-base font-black text-white max-md:flex-1">Rechercher</button>
          </div>
        </Wrap>
      </section>

      <Wrap className="flex flex-col gap-8 pt-6 pb-16 md:pt-9 md:pb-[72px] lg:flex-row lg:items-start">
        {sheet && <div className="fixed inset-0 z-[60] bg-[rgba(20,0,60,.6)] lg:hidden" onClick={() => setSheet(false)} aria-hidden="true" />}

        <aside ref={panel} tabIndex={-1} aria-label="Filtres"
          className={`flex flex-col gap-7 outline-none max-lg:fixed max-lg:inset-x-0 max-lg:bottom-0 max-lg:z-[70] max-lg:max-h-[85dvh] max-lg:overflow-y-auto max-lg:rounded-t-3xl max-lg:bg-white max-lg:p-5 max-lg:pb-8 max-lg:shadow-[0_-20px_50px_rgba(20,0,60,.3)] lg:w-[250px] lg:shrink-0 ${sheet ? "" : "max-lg:hidden"}`}>
          <div className="flex items-center justify-between lg:hidden">
            <span className="text-xl font-black">🎛️ Filtres</span>
            <button type="button" onClick={() => setSheet(false)} className="aj-btn rounded-full bg-violet px-5 py-3 text-[15px] font-black text-white">Voir {results.length} résultat{results.length > 1 ? "s" : ""}</button>
          </div>

          <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
            <legend className="mb-2.5 text-[17px] font-black">Certification</legend>
            {F.certifications.map((c) => (
              <label key={c} className="flex min-h-8 items-center gap-2.5 text-[15px] font-bold">
                <input type="checkbox" checked={s.cert.includes(c)} onChange={() => set({ cert: toggle(s.cert, c) })} className="size-5 accent-violet" /><span>{c}</span>
              </label>
            ))}
          </fieldset>

          <div className="flex flex-col gap-3">
            <span className="text-[17px] font-black">Type de cuisine</span>
            <div className="flex flex-wrap gap-2">
              {F.categories.map((c) => <Chip key={c.label} {...c} on={s.cat.includes(c.label)} click={() => set({ cat: toggle(s.cat, c.label) })} />)}
              {F.cuisines.map((c) => <Chip key={c.label} {...c} on={s.cuisine.includes(c.label)} click={() => set({ cuisine: toggle(s.cuisine, c.label) })} />)}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="villef" className="text-[17px] font-black">Ville</label>
            <select id="villef" value={s.ville} onChange={(e) => set({ ville: e.target.value })} className="aj-field !px-3 !py-3 !text-[15px] font-extrabold">
              {F.villes.map((v) => <option key={v}>{v}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            {OPTS.map(([k, label]) => (
              <label key={k} className="flex min-h-8 items-center gap-2.5 text-[15px] font-bold">
                <input type="checkbox" checked={s.opt.includes(k)} onChange={() => set({ opt: toggle(s.opt, k) })} className="size-5 accent-violet" />{label}
              </label>
            ))}
          </div>
        </aside>

        <section aria-label="Résultats" className="flex min-w-0 flex-1 flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span key={results.length} role="status" className="aj-pop-now text-base font-black">{results.length} résultat{results.length > 1 ? "s" : ""}</span>
              {active.map((a) => (
                <button key={a.k} type="button" onClick={a.off} aria-label={`Retirer le filtre ${a.label}`} className="rounded-full bg-chip px-3 py-[7px] text-sm font-extrabold text-violet">{a.label} ×</button>
              ))}
              {active.length > 1 && <button type="button" onClick={reset} className="px-2 py-2 text-sm font-black text-violet underline">Tout effacer</button>}
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setSheet(true)} className="aj-btn rounded-full bg-violet px-4 py-2.5 text-[15px] font-black text-white lg:hidden">🎛️ Filtres ({active.length})</button>
              <label className="flex items-center gap-2 text-[15px] font-bold">Trier par
                <select value={s.tri} onChange={(e) => set({ tri: e.target.value })} className="rounded-[10px] border-2 border-[#D8CCF2] bg-white px-2.5 py-2 font-extrabold">
                  {F.tris.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-[22px] border-2 border-dashed border-[#C9B5FF] px-6 py-14 text-center">
              <span aria-hidden="true" className="text-5xl">🤷</span>
              <h2 className="m-0 text-2xl font-black">aucun restaurant trouvé.</h2>
              <p className="m-0 font-bold text-t2">Essayez avec moins de filtres.</p>
              <button type="button" onClick={reset} className="aj-btn rounded-full bg-violet px-6 py-3 font-black text-white">Réinitialiser les filtres</button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-[repeat(auto-fill,minmax(min(280px,100%),1fr))]">
              {results.map((r, i) => {
                const st = status(r);
                return (
                  <article key={r.slug} style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }} className="aj-up aj-lift aj-zoom flex flex-col overflow-hidden rounded-[20px] border border-bord bg-white">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {r.img ? <Img src={r.img} alt={r.alt || r.nom} sizes="(max-width:768px) 100vw, 340px" /> : <Ph emoji={r.emoji} />}
                      {r.img && <Emoji className="top-3.5 left-3.5 size-[42px] text-xl">{r.emoji}</Emoji>}
                      {r.nouveau && <span className="absolute right-3.5 bottom-3.5 bg-vif px-2.5 py-1 text-xs font-black tracking-[1px] text-white">✨ NOUVEAU</span>}
                    </div>
                    <div className="flex flex-1 flex-col gap-2.5 p-[18px]">
                      <div className="flex items-start justify-between gap-2.5">
                        <h2 className="m-0 text-[21px] font-black"><L href={`/restaurants/${r.slug}`} className="!text-encre no-underline">{r.nom}</L></h2>
                        <span className={`shrink-0 text-[13px] font-extrabold ${st.cls}`}>{st.text}</span>
                      </div>
                      <span className="text-[15px] font-bold text-t2">📍 {r.lieu} · {r.cuisine}</span>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full border-2 border-violet px-2.5 py-[3px] text-[13px] font-extrabold text-violet">✡︎ {r.certification}</span>
                        <span className="rounded-full bg-chip px-3 py-[5px] text-[13px] font-extrabold text-violet">{r.categorie}</span>
                      </div>
                      <div className="mt-auto flex gap-2 pt-1.5">
                        <L href={`/restaurants/${r.slug}#reserver`} className="aj-btn rounded-full bg-violet px-[18px] py-[11px] text-sm font-black !text-white no-underline">Réserver</L>
                        <L href={`/restaurants/${r.slug}`} className="px-2.5 py-[11px] text-sm font-black no-underline">Voir la fiche</L>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <aside aria-label="Top 10" className="flex flex-col gap-5 lg:w-[300px] lg:shrink-0">
          <div className="flex flex-col gap-4 rounded-[22px] bg-nuit p-6 text-white">
            <Tag className="self-start bg-vif text-white">🏆 TOP 10</Tag>
            <h2 className="m-0 text-[26px] leading-[1.1] font-black">les plus consultés.</h2>
            <ol className="m-0 flex list-none flex-col gap-3 p-0">
              {top.map((t, i) => (
                <li key={t.slug}>
                  <L href={`/restaurants/${t.slug}`} className="flex items-center gap-3.5 !text-white no-underline">
                    <span className="w-[34px] shrink-0 text-right text-[26px] font-black text-[#C9B5FF]">{i + 1}</span>
                    <span className="flex flex-col"><span className="text-base font-black">{t.nom}</span><span className="text-[13px] font-semibold text-[#CFC2F2]">{t.lieu}</span></span>
                  </L>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col gap-3 rounded-[22px] border-2 border-dashed border-[#C9B5FF] p-[22px]">
            <h2 className="m-0 text-xl font-black">{P.cta_pro.titre}</h2>
            <p className="m-0 text-[15px] leading-normal text-t2">{P.cta_pro.texte}</p>
            <L href={P.cta_pro.href} className="self-start py-2 text-[15px] font-black">{P.cta_pro.lien}</L>
          </div>
        </aside>
      </Wrap>
    </>
  );
}
