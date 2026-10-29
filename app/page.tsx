import Image from "next/image";
import home from "@/content/home.json";
import restaurantsData from "@/content/restaurants.json";
import Counter from "@/components/home/Counter";
import { Emoji, H2, Img, L, Play, SeeAll, Tag, Wrap } from "@/components/ui";

const slugOf = (nom: string) => restaurantsData.restaurants.find((r) => r.nom === nom)?.slug;

const social = (label: string, svg: React.ReactNode) => (
  <a key={label} className="aj-btn flex size-12 items-center justify-center rounded-full border-2 border-white/45" aria-label={label}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{svg}</svg>
  </a>
);

const carousel = "noscroll -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:gap-6 md:overflow-visible md:px-0";

export default function Page() {
  const { hero, reseaux, ticker, compteurs, rubriques, restaurants, sejours, live, annonces, annonce_cta, partenaires, annonceurs, app } = home;
  const tick = [...ticker, ...ticker];
  const parts = [...partenaires, ...partenaires];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden bg-violet text-white">
        <span aria-hidden="true" className="aj-float2 absolute -top-[90px] -right-[90px] size-60 rounded-full bg-[#5A1FC0] opacity-60 md:top-[-140px] md:right-auto md:left-[-120px] md:size-[420px] md:opacity-55" />
        <span aria-hidden="true" className="aj-float3 absolute right-[30%] bottom-[-180px] hidden size-[360px] rounded-full bg-vif opacity-25 md:block" />
        <Wrap className="relative flex flex-wrap items-center gap-14 pt-8 pb-9 md:pt-[72px] md:pb-[88px]">
          <div className="flex min-w-0 flex-[1_1_520px] flex-col items-start gap-[18px] md:gap-7">
            <span className="aj-up bg-vif px-3 py-[5px] text-xs font-black tracking-[1.5px] uppercase md:px-4 md:py-1.5 md:text-[15px]">{hero.tag}</span>
            <h1 className="aj-up aj-d1 m-0 text-[46px] leading-[1.02] font-black tracking-[-1.5px] md:text-[length:var(--aj-h1)] md:tracking-[-2.5px]">
              {hero.titre_ligne1.replace(" 👋", "")} <span className="aj-wave" aria-hidden="true">👋</span><br />
              {hero.titre_ligne2_avant} <span className="aj-surligne">{hero.titre_ligne2_surligne}</span>
            </h1>
            <p className="aj-up aj-d2 m-0 max-w-[560px] text-[17px] leading-[1.45] text-pretty text-surv md:text-xl md:leading-normal">{hero.sous_titre}</p>
            <div role="search" className="aj-up aj-d3 flex w-full max-w-[640px] flex-col gap-1.5 rounded-[18px] bg-white p-1.5 shadow-[0_24px_48px_rgba(16,0,50,.35)] md:flex-row md:flex-wrap md:gap-2 md:rounded-[20px] md:p-2">
              <div className="flex min-h-[50px] md:flex-[1_1_240px] items-center gap-2.5 px-3 md:min-h-14 md:px-3.5">
                <svg className="hidden md:block" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3E0095" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                <label htmlFor="q" className="sr">Que cherchez-vous ?</label>
                <input id="q" type="search" placeholder={hero.recherche_placeholder} className="w-full bg-transparent text-base font-bold text-encre outline-none md:text-[17px]" />
              </div>
              <div className="hidden min-h-14 flex-[0_1_170px] items-center border-l border-bord px-3 md:flex">
                <label htmlFor="ville" className="sr">Ville</label>
                <select id="ville" className="w-full bg-transparent text-base font-extrabold text-violet">{hero.villes.map((v) => <option key={v}>{v}</option>)}</select>
              </div>
              <button type="button" className="aj-btn min-h-[50px] rounded-[14px] bg-violet px-7 text-base font-black text-white md:min-h-14">
                <span className="md:hidden">Rechercher à {hero.villes[0]}</span><span className="hidden md:inline">Rechercher</span>
              </button>
            </div>
            <div className="aj-up aj-d4 flex flex-wrap items-center gap-3">
              <span className="text-[15px] font-extrabold text-surv">Suivez-nous</span>
              {social("AlloJ sur Instagram", <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none" /></>)}
              {social("AlloJ sur TikTok", <><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 3c.5 2.8 2.3 4.5 5 4.8" /></>)}
              {social("Alloj Le Live sur YouTube", <><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5v5l4.5-2.5z" fill="#fff" /></>)}
            </div>
          </div>

          <div className="aj-up aj-d2 relative hidden h-[560px] min-w-0 flex-[1_1_440px] md:block">
            {[0, 1].map((i) => {
              const c = hero.collage[i === 0 ? 0 : 2];
              return (
                <div key={c.src} className={`${i ? "aj-float3 top-0 right-0 rotate-[4deg]" : "aj-float2 top-[70px] left-0 -rotate-[5deg]"} absolute aspect-[9/16] w-[44%] overflow-hidden rounded-[22px] shadow-[var(--aj-shadow-photo)]`}>
                  <Img src={c.src} alt={c.alt} sizes="(min-width:1280px) 240px, 20vw" priority />
                </div>
              );
            })}
            <div className="aj-float absolute top-[120px] left-[28%] z-[2] w-[44%]">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[22px] border-[6px] border-white shadow-[0_28px_56px_rgba(10,0,40,.5)]">
                <Img src={hero.collage[1].src} alt={hero.collage[1].alt} sizes="(min-width:1280px) 240px, 20vw" priority />
              </div>
              <span className="absolute -top-[18px] left-1/2 flex -translate-x-1/2 items-center gap-1.5 bg-vif px-3 py-1.5 text-[13px] font-black tracking-[1px] whitespace-nowrap">
                <span className="aj-blink size-2 rounded-full bg-white" />ALLOJ LE LIVE
              </span>
              <Play size={24} className="absolute top-1/2 left-1/2 -mt-8 -ml-8 size-16" />
            </div>
            <span className="aj-float3 absolute bottom-6 -left-1.5 z-[3] rounded-[18px] bg-white px-4 py-3 text-[15px] font-black text-encre shadow-[0_16px_32px_rgba(10,0,40,.35)]">{hero.bulles[0]}</span>
            <span className="aj-float absolute right-[-4px] bottom-[90px] z-[3] rounded-[18px] bg-lilas px-4 py-3 text-[15px] font-black text-[#2A0068] shadow-[0_16px_32px_rgba(10,0,40,.35)]">{hero.bulles[1]}</span>
          </div>
        </Wrap>
      </section>

      {/* Ticker */}
      <div className="aj-marquee overflow-hidden border-b border-[#D3B3EE] bg-lilas text-[#2A0068]" aria-label="Actualités AlloJ">
        <div className="aj-track py-3 text-[15px] font-black whitespace-nowrap md:py-3.5 md:text-[17px]">
          {tick.map((t, i) => <span key={i} className="px-5 md:px-7">{t}</span>)}
        </div>
      </div>

      {/* Compteurs */}
      <section aria-label="AlloJ en chiffres">
        <Wrap className="grid grid-cols-2 gap-x-4 gap-y-5 py-7 md:grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] md:gap-x-6 md:gap-y-8 md:py-16">
          {compteurs.map((c) => (
            <div key={c.label} className={`aj-pop border-t-4 border-violet pt-2.5 md:pt-4 ${"provisoire" in c && c.valeur === 250000 ? "max-md:hidden" : ""}`}>
              <div aria-hidden="true" className="mb-1.5 text-2xl leading-none md:mb-2.5 md:text-3xl">{c.emoji}</div>
              <div className="text-4xl leading-none font-black tracking-[-1px] text-violet md:text-[length:var(--aj-chiffre)] md:tracking-[-1.5px]"><Counter valeur={c.valeur} affichage={c.affichage} /></div>
              <div className="mt-1 text-sm font-bold text-t2 md:mt-2 md:text-base">{c.label}</div>
            </div>
          ))}
        </Wrap>
      </section>

      {/* Rubriques */}
      <section className="bg-lfond">
        <Wrap className="flex flex-col gap-[18px] py-9 md:gap-9 md:py-20">
          <div className="aj-rv flex flex-col items-start gap-2.5 md:gap-3"><Tag>🧭 RUBRIQUES</Tag><H2>on vous trouve tout.</H2></div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] md:gap-5">
            {rubriques.map((r) => (
              <L href={r.href} key={r.titre} className="aj-rv aj-lift aj-zoom relative block aspect-square overflow-hidden rounded-[18px] bg-[#E9DFFB] no-underline md:aspect-[4/5] md:rounded-[22px]">
                <Img src={r.img} alt={r.alt} sizes="(max-width:768px) 50vw, 300px" />
                <Emoji className="top-2 left-2 size-[38px] text-[19px] md:top-3.5 md:left-3.5 md:size-[52px] md:text-[26px]">{r.emoji}</Emoji>
                <span className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[rgba(20,0,60,.82)] to-transparent" />
                <span className="absolute inset-x-2.5 bottom-2.5 flex flex-col items-start gap-1.5 md:inset-x-[18px] md:bottom-[18px]">
                  <span className="bg-white px-2 py-[3px] text-[15px] font-black tracking-[.5px] text-violet uppercase md:px-3 md:py-1 md:text-[22px]">{r.titre}</span>
                  <span className="hidden text-[15px] font-bold text-white md:block">{r.sous} →</span>
                </span>
              </L>
            ))}
          </div>
        </Wrap>
      </section>

      {/* Nouveaux restaurants */}
      <section>
        <Wrap className="flex flex-col gap-[18px] py-9 md:gap-9 md:py-20">
          <div className="aj-rv flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col items-start gap-3">
              <span className="hidden md:block"><Tag>🔥 NOUVEAUX RESTAURANTS</Tag></span>
              <H2><span className="md:hidden">🔥 </span><span className="md:hidden">nouveaux<br />restaurants.</span><span className="hidden md:inline">les adresses qui viennent d&apos;ouvrir.</span></H2>
            </div>
            <SeeAll href="/restaurants"><span className="md:hidden">Voir tout →</span><span className="hidden md:inline">Voir tous les restaurants →</span></SeeAll>
          </div>
          <div className={`${carousel} md:grid-cols-[repeat(auto-fit,minmax(min(270px,100%),1fr))]`}>
            {restaurants.map((r) => (
              <article key={r.nom} className="aj-rv aj-lift aj-zoom flex shrink-0 basis-[260px] snap-start flex-col overflow-hidden rounded-[18px] border border-bord bg-white md:basis-auto md:rounded-[22px]">
                <div className="relative aspect-[4/3] overflow-hidden bg-chip">
                  <Img src={r.img} alt={r.alt} sizes="(max-width:768px) 260px, 320px" />
                  <span className="absolute right-2.5 bottom-2.5 bg-vif px-2 py-[3px] text-[11px] font-black tracking-[1px] text-white md:right-3.5 md:bottom-3.5 md:px-2.5 md:py-1 md:text-xs">✨ NOUVEAU</span>
                  <Emoji className="top-2.5 left-2.5 size-9 text-lg md:top-3.5 md:left-3.5 md:size-[42px] md:text-xl">{r.emoji}</Emoji>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-3.5 md:gap-3 md:p-5">
                  <div>
                    <h3 className="m-0 text-[19px] font-black md:text-[22px] md:tracking-[-.3px]"><L href={`/restaurants/${slugOf(r.nom)}`} className="!text-encre no-underline">{r.nom}</L></h3>
                    <p className="mt-1 mb-0 text-sm font-bold text-t2 md:text-[15px]">📍 {r.lieu}<span className="md:hidden"> · {r.type}</span></p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border-2 border-violet px-2.5 py-0.5 text-xs font-extrabold text-violet md:py-[3px] md:text-[13px]">✡︎ {r.certification}</span>
                    <span className="hidden rounded-full bg-chip px-3 py-[5px] text-[13px] font-extrabold text-violet md:inline">{r.type}</span>
                  </div>
                  <L href={`/restaurants/${slugOf(r.nom)}#reserver`} className="aj-btn mt-auto hidden self-start rounded-full bg-violet px-5 py-3 text-[15px] font-black !text-white no-underline md:block">Réserver une table</L>
                </div>
              </article>
            ))}
          </div>
        </Wrap>
      </section>

      {/* Séjours */}
      <section className="bg-lfond">
        <Wrap className="flex flex-col gap-[18px] py-9 md:gap-9 md:py-20">
          <div className="aj-rv flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col items-start gap-3">
              <span className="hidden md:block"><Tag>✈️ VOYAGE CACHER</Tag></span>
              <H2><span className="md:hidden">✈️ </span><span className="md:hidden">prochains<br />séjours.</span><span className="hidden md:inline">réservez votre prochain séjour.</span></H2>
            </div>
            <SeeAll href="/voyages"><span className="md:hidden">Voir tout →</span><span className="hidden md:inline">Tous les séjours →</span></SeeAll>
          </div>
          <div className={`${carousel} md:grid-cols-[repeat(auto-fit,minmax(min(270px,100%),1fr))]`}>
            {sejours.map((j) => (
              <L href="/voyages" key={j.nom} className="aj-rv aj-lift aj-zoom relative flex aspect-[3/4] shrink-0 basis-60 snap-start flex-col justify-end overflow-hidden rounded-[18px] bg-[#D9C9F6] no-underline md:basis-auto md:rounded-[22px]">
                <Img src={j.img} alt={j.alt} sizes="(max-width:768px) 240px, 320px" />
                <Emoji className="top-2.5 right-2.5 size-10 text-xl md:top-3.5 md:right-3.5 md:size-[52px] md:text-[26px]">{j.emoji}</Emoji>
                <span className="relative m-2.5 flex flex-col gap-1 rounded-[14px] bg-white p-3.5 md:m-3.5 md:gap-1.5 md:rounded-2xl md:p-[18px]">
                  <span className="self-start bg-violet px-2 py-0.5 text-[15px] font-black text-white uppercase md:px-2.5 md:py-[3px] md:text-lg">{j.nom}</span>
                  <span className="text-[15px] font-black text-encre md:text-[17px]">📅 <span className="md:hidden">{j.dates_courtes}</span><span className="hidden md:inline">{j.dates}</span></span>
                  <span className="hidden text-sm font-bold text-t2 md:block">{j.detail}</span>
                </span>
              </L>
            ))}
          </div>
        </Wrap>
      </section>

      {/* Alloj Le Live */}
      <section id="live" className="bg-nuit text-white">
        <Wrap className="flex flex-col gap-[18px] py-10 md:gap-10 md:py-[88px]">
          <div className="aj-rv flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[720px] flex-col items-start gap-2.5 md:gap-3.5">
              <Tag className="bg-vif text-white"><span className="aj-blink size-[7px] rounded-full bg-[#FF5C8A] md:size-2" />🎬 ALLOJ LE LIVE</Tag>
              <h2 className="m-0 text-[32px] leading-[1.05] font-black tracking-[-1px] md:text-[clamp(36px,4.4vw,62px)] md:leading-[1.02] md:tracking-[-1.5px]">{live.titre} <span className="aj-surligne">{live.titre_surligne}</span></h2>
              <p className="m-0 hidden text-[19px] leading-normal text-surn md:block">{live.texte}</p>
            </div>
            <a className="aj-btn hidden items-center gap-2.5 rounded-full bg-white px-6 py-[15px] text-base font-black no-underline md:flex">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#3E0095" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>Toutes les vidéos
            </a>
          </div>
          <div className={`${carousel} md:grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] md:gap-5`}>
            {live.videos.map((v, i) => (
              <a key={v.titre} className={`aj-rv aj-zoom flex shrink-0 basis-[170px] snap-start flex-col gap-2 !text-white no-underline md:basis-auto md:gap-3 ${i === 3 ? "max-md:hidden" : ""}`}>
                <span className="aj-lift relative block aspect-[9/16] overflow-hidden rounded-[14px] md:rounded-[18px]">
                  <Img src={v.img} alt={v.titre} sizes="(max-width:768px) 170px, 240px" />
                  <Play size={18} className="absolute top-2.5 left-2.5 size-10 md:top-3.5 md:left-3.5 md:size-12" />
                </span>
                <span className="text-sm leading-[1.3] font-extrabold md:text-[17px] md:font-black">{v.titre}</span>
                <span className="-mt-1.5 hidden text-sm font-bold text-[#BFAFF0] md:block">{v.format}</span>
              </a>
            ))}
          </div>
        </Wrap>
      </section>

      {/* Annonces */}
      <section>
        <Wrap className="flex flex-col gap-4 py-9 md:gap-9 md:py-20">
          <div className="aj-rv flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col items-start gap-3">
              <span className="hidden md:block"><Tag>📣 ANNONCES</Tag></span>
              <H2 className="max-md:!text-[30px]"><span className="md:hidden">📣 </span><span className="md:hidden">annonces.</span><span className="hidden md:inline">les annonces de la communauté.</span></H2>
            </div>
            <span className="hidden md:block"><SeeAll>Toutes les annonces →</SeeAll></span>
          </div>
          <div className="grid gap-3 md:gap-6 md:grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))]">
            {annonces.map((a) => (
              <article key={a.titre} className="aj-rv aj-lift aj-zoom flex items-center gap-3 overflow-hidden rounded-2xl border border-bord p-2.5 md:flex-col md:items-stretch md:gap-0 md:rounded-[22px] md:p-0">
                <div className="relative size-[88px] shrink-0 overflow-hidden rounded-xl md:aspect-[16/10] md:size-auto md:rounded-none">
                  <Img src={a.img} alt={a.alt} sizes="(max-width:768px) 88px, 420px" style={{ objectPosition: a.object_position }} />
                </div>
                <div className="flex flex-col gap-1 md:gap-2 md:p-5">
                  <span className="text-xs font-black tracking-[1px] text-vtxt md:text-[13px]">{a.tag}</span>
                  <h3 className="m-0 text-[17px] font-black md:text-[22px]">{a.titre}</h3>
                  <a className="hidden py-2 text-[15px] font-extrabold md:block">Voir l&apos;annonce →</a>
                </div>
              </article>
            ))}
            <div className="aj-rv hidden flex-col justify-between gap-[18px] rounded-[22px] bg-violet p-8 text-white md:flex">
              <div className="flex flex-col gap-3">
                <span aria-hidden="true" className="aj-wave self-start text-[40px] leading-none">📢</span>
                <h3 className="m-0 text-[30px] leading-[1.1] font-black tracking-[-.5px]">{annonce_cta.titre}</h3>
                <p className="m-0 text-[17px] leading-normal text-surv">{annonce_cta.texte}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {annonce_cta.categories.map((c) => <span key={c} className="rounded-full bg-white/14 px-3 py-1.5 text-sm font-extrabold">{c}</span>)}
              </div>
              <a className="aj-btn self-start rounded-full bg-white px-[22px] py-3.5 text-base font-black no-underline">Déposer une annonce</a>
            </div>
          </div>
          <a className="aj-btn rounded-full border-2 border-violet p-[13px] text-center text-base font-black no-underline md:hidden">📢 Déposer une annonce</a>
        </Wrap>
      </section>

      {/* Partenaires */}
      <section aria-label="Partenaires" className="border-t border-bord">
        <div className="flex flex-col items-center gap-3.5 py-7 text-center md:gap-7 md:py-16">
          <h2 className="aj-rv m-0 px-4 text-[22px] font-black md:px-8 md:text-[30px] md:tracking-[-.5px]">🤝 ils nous font confiance.</h2>
          <div className="aj-marquee w-full overflow-hidden">
            <div className="aj-track-slow text-[17px] font-black whitespace-nowrap text-t3 md:text-2xl">
              {parts.map((p, i) => (
                <span key={i} className="flex items-center gap-[18px] px-[18px] md:gap-8 md:px-8">{p}<span aria-hidden="true" className="text-[#C9B5FF]">✦</span></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Annonceurs */}
      <section className="overflow-hidden bg-violet text-white">
        <Wrap className="flex flex-col items-start gap-4 py-9 md:flex-row md:flex-wrap md:items-center md:gap-14 md:py-[88px]">
          <div className="aj-rv relative w-full min-w-0 md:flex-[1_1_480px]">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[18px] md:rounded-[26px]">
              <Img src={annonceurs.img} alt={annonceurs.alt} sizes="(max-width:768px) 100vw, 600px" />
            </div>
            <span className="aj-float absolute right-2 -bottom-3.5 rounded-[14px] bg-lilas px-3 py-2 text-sm font-black text-[#2A0068] md:top-[-18px] md:right-[-10px] md:bottom-auto md:rounded-[18px] md:px-4 md:py-3 md:text-base md:shadow-[0_16px_32px_rgba(10,0,40,.35)]">{annonceurs.bulle}</span>
          </div>
          <div className="aj-rv flex w-full min-w-0 flex-col items-start gap-4 max-md:mt-2 md:flex-[1_1_420px] md:gap-[22px]">
            <Tag className="bg-white text-violet">{annonceurs.tag}</Tag>
            <h2 className="m-0 text-[30px] leading-[1.08] font-black tracking-[-1px] md:text-[clamp(34px,3.8vw,54px)] md:leading-[1.05] md:tracking-[-1.5px]">{annonceurs.titre}</h2>
            <p className="m-0 hidden text-[19px] leading-normal text-surv md:block">{annonceurs.texte}</p>
            <div className="flex w-full flex-col items-center gap-3 md:w-auto md:flex-row">
              <L href="/annonceurs" className="aj-btn w-full rounded-full bg-white p-[15px] text-center text-[17px] font-black no-underline md:w-auto md:px-[26px] md:py-4">Demander un devis</L>
              <a className="w-full p-2 text-center text-[17px] font-black !text-white md:w-auto md:px-2 md:py-4">📞 {annonceurs.telephone}</a>
            </div>
          </div>
        </Wrap>
      </section>

      {/* Appli */}
      <section className="bg-lfond">
        <Wrap className="flex flex-wrap items-center justify-between gap-3.5 py-7 md:gap-7 md:py-14">
          <div className="aj-rv flex items-center gap-3 md:flex-[1_1_420px] md:gap-5">
            <Image className="aj-float h-auto w-[52px] md:w-[72px]" src="/images/picto-alloj.png" alt="" width={90} height={90} />
            <div>
              <h2 className="m-0 text-[22px] font-black md:text-[30px] md:tracking-[-.5px]">{app.titre}</h2>
              <p className="mt-1 mb-0 hidden text-[17px] font-bold text-t2 md:block">{app.texte}</p>
            </div>
          </div>
          <div className="aj-rv grid w-full grid-cols-2 gap-2.5 md:flex md:w-auto md:gap-3">
            {[["Télécharger dans", "l'App Store"], ["Disponible sur", "Google Play"]].map(([a, b]) => (
              <a key={b} className="aj-btn flex flex-col rounded-xl bg-encre px-3 py-2 leading-[1.15] !text-white no-underline md:rounded-[14px] md:px-5 md:py-2.5">
                <span className="text-[11px] font-semibold md:text-xs">{a}</span><span className="text-base font-black md:text-[19px]">{b}</span>
              </a>
            ))}
          </div>
        </Wrap>
      </section>
    </div>
  );
}
