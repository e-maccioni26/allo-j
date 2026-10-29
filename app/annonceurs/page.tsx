import type { Metadata } from "next";
import data from "@/content/annonceurs.json";
import Counter from "@/components/home/Counter";
import FormatsDevis from "@/components/annonceurs/FormatsDevis";
import { Img, lc, Tag, Wrap } from "@/components/ui";

export const metadata: Metadata = { title: "Espace annonceurs · Faites-vous connaître avec AlloJ", description: "Fiche établissement, mise en avant et reportage vidéo Alloj Le Live : touchez toute la communauté juive. Demandez votre devis." };

const { hero, audience, partenaires } = data;

export default function Page() {
  const parts = [...partenaires, ...partenaires];
  return (
    <>
      <section className="relative overflow-hidden bg-nuit text-white">
        <Img src={hero.img} alt={hero.alt} sizes="100vw" priority style={{ objectPosition: "center 30%" }} />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,0,73,.94)_0%,rgba(30,0,73,.82)_45%,rgba(30,0,73,.25)_100%)] max-md:bg-[rgba(30,0,73,.85)]" />
        <Wrap className="relative flex flex-col items-start gap-5 py-16 md:gap-[26px] md:py-[110px]">
          <span className="aj-up bg-vif px-3.5 py-[5px] text-sm font-black tracking-[1.5px]">{hero.tag}</span>
          <h1 className="aj-up aj-d1 m-0 max-w-[820px] text-[clamp(42px,5.4vw,78px)] leading-[1.02] font-black tracking-[-1.5px] md:tracking-[-2.5px]">
            {lc(hero.titre_avant)} <span className="aj-surligne">{hero.titre_surligne}</span>
          </h1>
          <p className="aj-up aj-d2 m-0 max-w-[600px] text-lg leading-normal text-surv md:text-xl">{hero.texte}</p>
          <div className="aj-up aj-d3 flex flex-wrap items-center gap-3">
            <a href="#devis" className="aj-btn rounded-full bg-white px-7 py-[17px] text-[17px] font-black no-underline">Demander un devis</a>
            <a className="aj-btn rounded-full border-2 border-white/60 px-[26px] py-[15px] text-[17px] font-black !text-white no-underline">{data.telephone}</a>
          </div>
        </Wrap>
      </section>

      <section id="audience" aria-label="Audience" className="scroll-mt-20">
        <Wrap className="flex flex-col gap-9 py-14 md:py-20">
          <div className="aj-rv flex flex-col items-start gap-3">
            <Tag>📊 AUDIENCE</Tag>
            <h2 className="m-0 text-[32px] leading-[1.05] font-black tracking-[-1px] md:text-[length:var(--aj-h2)] md:tracking-[-1.5px]">une communauté qui nous regarde.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))]">
            {audience.map((a) => (
              <div key={a.label} className={`aj-pop flex flex-col gap-2 rounded-[22px] p-7 ${a.mise_en_avant ? "bg-violet text-white" : "bg-lfond"}`}>
                <span aria-hidden="true" className="text-3xl leading-none">{a.emoji}</span>
                <span className={`text-[clamp(48px,5vw,64px)] leading-none font-black tracking-[-2px] ${a.mise_en_avant ? "" : "text-violet"}`}><Counter valeur={a.valeur} affichage={a.affichage} /></span>
                <span className={`text-[17px] font-bold ${a.mise_en_avant ? "text-surv" : "text-t2"}`}>{a.label}</span>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      <FormatsDevis
        partenaires={
          <section id="partenaires" aria-label="Partenaires" className="scroll-mt-20 py-12 md:py-[72px]">
            <div className="flex flex-col items-center gap-7 text-center">
              <h2 className="aj-rv m-0 px-4 text-[28px] font-black tracking-[-1px] md:text-[34px]">🤝 ils nous font confiance.</h2>
              <div className="aj-marquee w-full overflow-hidden">
                <div className="aj-track-slow text-xl font-black whitespace-nowrap text-t3 md:text-[22px]">
                  {parts.map((p, i) => <span key={i} className="flex items-center gap-8 px-8">{p}<span aria-hidden="true" className="text-[#C9B5FF]">✦</span></span>)}
                </div>
              </div>
            </div>
          </section>
        }
      />
    </>
  );
}
