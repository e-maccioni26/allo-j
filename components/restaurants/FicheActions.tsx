"use client";
import { useState } from "react";

const btn = "aj-btn flex size-12 items-center justify-center rounded-full border-2 border-[#D8CCF2] bg-white";

export default function FicheActions({ nom }: { nom: string }) {
  const [fav, setFav] = useState(false);
  const [toast, setToast] = useState(false);

  async function share() {
    if (navigator.share) {
      try { await navigator.share({ title: `${nom} · AlloJ`, url: location.href }); } catch { /* annulé par l'utilisateur */ }
      return;
    }
    try { await navigator.clipboard.writeText(location.href); } catch { /* presse-papiers indisponible */ }
    setToast(true);
    setTimeout(() => setToast(false), 2200);
  }

  return (
    <div className="flex gap-2">
      <button type="button" aria-pressed={fav} aria-label={fav ? "Retirer des favoris" : "Ajouter aux favoris"} onClick={() => setFav(!fav)} className={btn}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill={fav ? "#E0245E" : "none"} stroke={fav ? "#E0245E" : "#3E0095"} strokeWidth="2.2" strokeLinejoin="round" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
      </button>
      <button type="button" aria-label="Partager" onClick={share} className={btn}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3E0095" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 15V3M7 8l5-5 5 5M5 13v6h14v-6" /></svg>
      </button>
      <div role="status" className="sr">{toast ? "Lien copié" : ""}</div>
      {toast && <div aria-hidden="true" className="aj-pop-now fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full bg-encre px-5 py-3 text-[15px] font-extrabold text-white shadow-lg">Lien copié ✅</div>}
    </div>
  );
}
