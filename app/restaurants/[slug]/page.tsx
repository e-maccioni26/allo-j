import type { Metadata } from "next";
import { notFound } from "next/navigation";
import data from "@/content/restaurants.json";
import FicheActions from "@/components/restaurants/FicheActions";
import Reservation from "@/components/restaurants/Reservation";
import { Img, L, Ph, Tag, Wrap } from "@/components/ui";

type R = (typeof data.restaurants)[number] & { img?: string; alt?: string; ouverture?: string; nouveau?: boolean };
const find = (slug: string) => (data.restaurants as R[]).find((r) => r.slug === slug);
const { fiche_defaut: D } = data;

// Photos thématiques réutilisées pour les vignettes : les 4 vrais restos + un reportage de rue.
const THEMATIQUES = [
  ...(data.restaurants as R[]).filter((r) => r.img).map((r) => ({ img: r.img!, alt: r.alt!, slug: r.slug })),
  { img: "/images/resto-noilly.jpg", alt: "Reportage AlloJ devant une brasserie", slug: "" },
];
const MINIS = ["🍽️", "🥗", "🍷", "🍰"];

export function generateStaticParams() {
  return data.restaurants.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const r = find((await params).slug);
  return r ? { title: `${r.nom} · Restaurant cacher à ${r.ville} · AlloJ`, description: `${r.nom} (${r.cuisine}, ${r.lieu}) : horaires, certification et réservation en ligne sur AlloJ.` } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const r = find((await params).slug);
  if (!r) notFound();

  const thumbs = THEMATIQUES.filter((t) => t.slug !== r.slug).slice(0, 4);
  const similaires = [...(data.restaurants as R[])]
    .filter((x) => x.slug !== r.slug)
    .sort((a, b) => Number(b.cuisine === r.cuisine) * 2 + Number(b.ville === r.ville) - (Number(a.cuisine === r.cuisine) * 2 + Number(a.ville === r.ville)) || b.vues - a.vues)
    .slice(0, 3);
  const statut = r.ouverture ?? (r.ouvert ? "Ouvert" : "Fermé");

  return (
    <>
      <Wrap className="pt-4 pb-0 md:pt-8">
        <div className="grid gap-3 md:min-h-[420px] md:grid-cols-4 md:grid-rows-2">
          <div className="aj-up relative aspect-[4/3] overflow-hidden rounded-[22px] md:col-span-2 md:row-span-2 md:aspect-auto">
            {r.img ? <Img src={r.img} alt={r.alt || r.nom} sizes="(max-width:768px) 100vw, 640px" priority /> : <Ph emoji={r.emoji} className="text-[120px]" />}
          </div>
          {thumbs.map((t, i) => (
            <div key={t.img} style={{ animationDelay: `${(i + 1) * 80}ms` }} className="aj-up relative hidden overflow-hidden rounded-[18px] md:block">
              {r.img ? <Img src={t.img} alt={t.alt} sizes="320px" /> : <Ph emoji={MINIS[i]} className="text-[56px]" />}
            </div>
          ))}
        </div>
      </Wrap>

      <Wrap className="flex flex-col gap-10 pt-6 pb-16 md:pt-8 md:pb-[72px] lg:flex-row lg:items-start lg:gap-10">
        <div className="flex min-w-0 flex-1 flex-col gap-10">
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-violet px-3 py-[5px] text-[13px] font-extrabold text-white">✡︎ {r.certification}</span>
              <span className="rounded-full bg-chip px-3 py-[5px] text-[13px] font-extrabold text-violet">{r.categorie}</span>
              {r.livraison_chabbat && <span className="rounded-full bg-chip px-3 py-[5px] text-[13px] font-extrabold text-violet">Livraison Chabbat</span>}
              {r.nouveau && <span className="bg-vif px-2.5 py-[5px] text-xs font-black tracking-[1px] text-white">✨ NOUVEAU</span>}
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h1 className="m-0 text-[clamp(40px,5vw,68px)] leading-none font-black tracking-[-2px]">{r.nom}</h1>
              <FicheActions nom={r.nom} />
            </div>
            <p className="m-0 text-base font-bold text-t2 md:text-lg">
              {r.cuisine} · {r.categorie} · {r.lieu} · <span className={r.ouvert ? "text-[#1D7A46]" : "text-[#8A4B00]"}>{statut}</span>
            </p>
          </div>

          <section className="flex flex-wrap gap-6">
            <div className="flex min-w-[260px] flex-1 flex-col gap-3.5 rounded-[20px] border border-bord p-6">
              <h2 className="m-0 text-[22px] font-black">Horaires</h2>
              <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5 text-base">
                {D.horaires_exemple.map((h) => (
                  <div key={h.jours} className="contents"><dt className="font-extrabold">{h.jours}</dt><dd className="m-0">{h.heures}</dd></div>
                ))}
              </dl>
            </div>
            <div className="flex min-w-[260px] flex-1 flex-col gap-3.5 rounded-[20px] border border-bord p-6">
              <h2 className="m-0 text-[22px] font-black">Infos pratiques</h2>
              <p className="m-0 text-base leading-relaxed font-bold">📍 {r.lieu}</p>
            </div>
          </section>

          <section className="flex flex-wrap items-center gap-6 rounded-3xl bg-nuit p-6 text-white">
            <div className="relative aspect-[9/16] w-[150px] overflow-hidden rounded-2xl"><Img src={D.reportage.img} alt={D.reportage.alt} sizes="150px" /></div>
            <div className="flex min-w-[240px] flex-1 flex-col items-start gap-3">
              <Tag className="bg-vif text-white">{D.reportage.tag}</Tag>
              <h2 className="m-0 text-[28px] leading-[1.1] font-black">{D.reportage.titre}</h2>
              <a className="aj-btn rounded-full bg-white px-5 py-3 text-[15px] font-black no-underline">{D.reportage.bouton}</a>
            </div>
          </section>
        </div>

        <aside id="reserver" aria-label="Réserver" className="scroll-mt-28 lg:sticky lg:top-28 lg:w-[360px] lg:shrink-0">
          <Reservation nom={r.nom} creneaux={D.creneaux} couverts={D.couverts} />
        </aside>
      </Wrap>

      <section className="bg-lfond">
        <Wrap className="flex flex-col gap-6 pt-14 pb-[72px]">
          <h2 className="aj-rv m-0 text-[34px] font-black tracking-[-1px]">dans le même esprit.</h2>
          <div className="grid gap-5 md:grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))]">
            {similaires.map((x) => (
              <L key={x.slug} href={`/restaurants/${x.slug}`} className="aj-rv aj-lift aj-zoom flex items-center gap-3.5 rounded-[18px] bg-white p-3 !text-encre no-underline">
                <span className="relative size-24 shrink-0 overflow-hidden rounded-xl">{x.img ? <Img src={x.img} alt="" sizes="96px" /> : <Ph emoji={x.emoji} className="text-4xl" />}</span>
                <span className="flex flex-col gap-1"><span className="text-lg font-black">{x.nom}</span><span className="text-sm font-bold text-t2">{x.lieu}</span><span className="text-[13px] font-extrabold text-violet">{x.certification}</span></span>
              </L>
            ))}
          </div>
        </Wrap>
      </section>
    </>
  );
}
