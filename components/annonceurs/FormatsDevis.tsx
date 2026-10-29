"use client";
import { useRef, useState } from "react";
import data from "@/content/annonceurs.json";
import { Img, Play, Tag, Wrap } from "@/components/ui";

const { formats, devis } = data;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TEL_FR = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
const CONFETTI = ["🎉", "✨", "💜", "🎊", "⭐", "🎉", "✨", "💜"];

const Check = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3E0095" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0"><path d="m5 12 5 5 9-10" /></svg>;

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-extrabold">{label}</label>
      {children}
      {error && <span id={`${id}-err`} className="text-sm font-bold text-[#C0262D]">{error}</span>}
    </div>
  );
}

export default function FormatsDevis({ partenaires }: { partenaires: React.ReactNode }) {
  const [picked, setPicked] = useState<string[]>([]);
  const [secteur, setSecteur] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const toggle = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));
  const choose = (t: string) => {
    setPicked((p) => (p.includes(t) ? p : [...p, t]));
    document.getElementById("devis")?.scrollIntoView({ behavior: "smooth" });
  };

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const err: Record<string, string> = {};
    if (!v("nom")) err.nom = "Indiquez votre nom.";
    if (!EMAIL.test(v("mail"))) err.mail = "Indiquez un e-mail valide.";
    if (!TEL_FR.test(v("tel"))) err.tel = "Indiquez un numéro français valide (ex. 06 12 34 56 78).";
    if (!secteur) err.secteur = "Choisissez un secteur.";
    setErrors(err);
    const first = Object.keys(err)[0];
    if (first) return form.current?.querySelector<HTMLElement>(first === "secteur" ? "[data-secteur]" : `#d${first}`)?.focus();
    setSent(true);
  }

  const aria = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `d${k}-err` : undefined });

  return (
    <>
      <section id="formats" className="scroll-mt-20 bg-lfond">
        <Wrap className="flex flex-col gap-9 py-14 md:py-20">
          <div className="aj-rv flex flex-col items-start gap-3">
            <Tag>🎯 3 FORMATS</Tag>
            <h2 className="m-0 text-[32px] leading-[1.05] font-black tracking-[-1px] md:text-[length:var(--aj-h2)] md:tracking-[-1.5px]">choisissez votre visibilité.</h2>
          </div>
          <div className="grid items-stretch gap-6 md:grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))]">
            {formats.map((f) => {
              const dark = "sombre" in f && f.sombre;
              return (
                <article key={f.numero} className={`aj-rv aj-lift flex flex-col gap-4 rounded-3xl p-[30px] ${dark ? "bg-nuit text-white" : "bg-white"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <span className={`text-5xl leading-none font-black ${dark ? "text-[#9C7BFF]" : "text-[#C9B5FF]"}`}>{f.numero}</span>
                    {"badge" in f && <span className="bg-vif px-2.5 py-1 text-xs font-black tracking-[1.5px] text-white">{f.badge}</span>}
                  </div>
                  <h3 className="m-0 text-[28px] leading-[1.1] font-black"><span aria-hidden="true">{f.emoji} </span>{f.titre}</h3>
                  <p className={`m-0 text-[17px] leading-[1.55] ${dark ? "text-surn" : "text-t2"}`}>{f.texte}</p>
                  {f.points && (
                    <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[15px] font-bold">
                      {f.points.map((p) => <li key={p} className="flex gap-2.5"><Check />{p}</li>)}
                    </ul>
                  )}
                  {f.visuels && (
                    <div className="grid grid-cols-2 gap-3">
                      {f.visuels.map((v) => (
                        <div key={v.img} className="relative aspect-[9/14] overflow-hidden rounded-[14px]">
                          <Img src={v.img} alt={v.alt} sizes="200px" />
                          <Play size={14} className="absolute top-2.5 left-2.5 size-9" />
                        </div>
                      ))}
                    </div>
                  )}
                  <button type="button" onClick={() => choose(f.titre)} className={`aj-btn mt-auto self-start rounded-full px-5 py-3.5 text-[15px] font-black ${dark ? "bg-white text-violet" : "border-2 border-violet text-violet"}`}>Choisir ce format</button>
                </article>
              );
            })}
          </div>
        </Wrap>
      </section>

      {partenaires}

      <section id="devis" className="scroll-mt-20 bg-violet text-white">
        <Wrap className="flex flex-wrap items-start gap-12 py-14 md:py-[88px]">
          <div className="flex min-w-0 flex-[1_1_380px] flex-col items-start gap-5">
            <Tag className="bg-white text-violet">{devis.tag}</Tag>
            <h2 className="m-0 text-[32px] leading-[1.05] font-black tracking-[-1px] md:text-[length:var(--aj-h2)] md:tracking-[-1.5px]">{devis.titre}</h2>
            <p className="m-0 text-[19px] leading-normal text-surv">{devis.texte}</p>
            <div className="flex flex-col gap-1">
              <span className="text-[15px] font-bold text-surn">Ou appelez-nous directement</span>
              <a className="text-[32px] font-black tracking-[-1px] !text-white no-underline md:text-[40px]">{data.telephone}</a>
            </div>
          </div>

          <div className="relative min-w-0 flex-[1_1_520px] overflow-hidden rounded-[26px] bg-white p-6 text-encre md:p-8">
            {sent ? (
              <div role="status" className="aj-pop-now relative flex min-h-[320px] flex-col items-center justify-center gap-5 text-center">
                {CONFETTI.map((c, i) => <span key={i} aria-hidden="true" className="aj-confetti text-2xl" style={{ left: `${8 + i * 12}%`, animationDelay: `${i * 120}ms` }}>{c}</span>)}
                <p className="m-0 max-w-[420px] text-2xl leading-[1.3] font-black text-violet">{devis.confirmation}</p>
                <button type="button" onClick={() => setSent(false)} className="aj-btn rounded-full border-2 border-violet px-6 py-3 font-black text-violet">Envoyer une autre demande</button>
              </div>
            ) : (
              <form ref={form} noValidate onSubmit={submit} className="grid gap-[18px] sm:grid-cols-2">
                <Field id="dnom" label="Nom et prénom *" error={errors.nom}><input id="dnom" name="nom" autoComplete="name" required {...aria("nom")} className="aj-field" /></Field>
                <Field id="dent" label="Entreprise"><input id="dent" name="ent" autoComplete="organization" className="aj-field" /></Field>
                <Field id="dtel" label="Téléphone *" error={errors.tel}><input id="dtel" name="tel" type="tel" autoComplete="tel" required {...aria("tel")} className="aj-field" /></Field>
                <Field id="dmail" label="E-mail *" error={errors.mail}><input id="dmail" name="mail" type="email" autoComplete="email" required {...aria("mail")} className="aj-field" /></Field>

                <fieldset className="m-0 flex flex-col gap-2 border-0 p-0 sm:col-span-full">
                  <legend className="mb-2 text-sm font-extrabold">Secteur *</legend>
                  <div className="flex flex-wrap gap-2">
                    {devis.secteurs.map((s, i) => (
                      <button key={s} type="button" aria-pressed={secteur === s} data-secteur={i === 0 ? "" : undefined} onClick={() => setSecteur(s)} className="aj-chip">{s}</button>
                    ))}
                  </div>
                  {errors.secteur && <span className="text-sm font-bold text-[#C0262D]">{errors.secteur}</span>}
                </fieldset>

                <fieldset className="m-0 flex flex-wrap gap-x-[22px] gap-y-2.5 border-0 p-0 sm:col-span-full">
                  <legend className="mb-2 text-sm font-extrabold">Formats qui vous intéressent</legend>
                  {formats.map((f) => (
                    <label key={f.titre} className="flex min-h-8 items-center gap-2 font-bold">
                      <input type="checkbox" checked={picked.includes(f.titre)} onChange={() => toggle(f.titre)} className="size-5 accent-violet" />{f.titre}
                    </label>
                  ))}
                </fieldset>

                <div className="sm:col-span-full"><Field id="dmsg" label="Votre message"><textarea id="dmsg" name="msg" rows={4} className="aj-field resize-y" /></Field></div>
                <button type="submit" className="aj-btn min-h-[58px] rounded-full bg-violet text-lg font-black text-white sm:col-span-full">{devis.bouton}</button>
              </form>
            )}
          </div>
        </Wrap>
      </section>
    </>
  );
}
