"use client";
import { useEffect, useState } from "react";

const iso = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const fr = (v: string) => new Date(v + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

export default function Reservation({ nom, creneaux, couverts }: { nom: string; creneaux: string[]; couverts: string[] }) {
  const [min, setMin] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState(creneaux[1] ?? creneaux[0]);
  const [pers, setPers] = useState(couverts[0]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const d = new Date();
    setMin(iso(d));
    d.setDate(d.getDate() + 1);
    setDate(iso(d));
  }, []);

  if (done) {
    return (
      <div role="status" className="aj-pop-now flex flex-col gap-4 rounded-3xl border-2 border-violet p-[26px] shadow-[0_18px_40px_rgba(62,0,149,.12)]">
        <span aria-hidden="true" className="text-5xl">🎉</span>
        <h2 className="m-0 text-[26px] font-black">table réservée !</h2>
        <p className="m-0 text-[17px] leading-normal font-bold text-t2">{nom}<br />{fr(date)} à {heure}<br />{pers}</p>
        <button type="button" onClick={() => setDone(false)} className="aj-btn min-h-12 rounded-full border-2 border-violet font-black text-violet">Modifier</button>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="flex flex-col gap-4 rounded-3xl border-2 border-violet p-[26px] shadow-[0_18px_40px_rgba(62,0,149,.12)]">
      <h2 className="m-0 text-[26px] font-black">réserver une table.</h2>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="rdate" className="text-sm font-extrabold">Date</label>
        <input id="rdate" type="date" required min={min} value={date} onChange={(e) => setDate(e.target.value)} className="aj-field font-bold" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="rpers" className="text-sm font-extrabold">Couverts</label>
        <select id="rpers" value={pers} onChange={(e) => setPers(e.target.value)} className="aj-field font-bold">
          {couverts.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
        <legend className="mb-2 text-sm font-extrabold">Heure</legend>
        <div className="flex flex-wrap gap-2">
          {creneaux.map((c) => <button key={c} type="button" aria-pressed={heure === c} onClick={() => setHeure(c)} className="aj-chip">{c}</button>)}
        </div>
      </fieldset>
      <button type="submit" className="aj-btn min-h-14 rounded-full bg-violet text-[17px] font-black text-white">Réserver gratuitement</button>
      <p className="m-0 text-center text-sm text-t2">Gratuit · aucune carte bancaire demandée</p>
    </form>
  );
}
