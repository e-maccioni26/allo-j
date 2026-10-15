"use client";
import { useEffect, useRef, useState } from "react";

export default function Counter({ valeur, affichage }: { valeur: number; affichage: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState<number | null>(null); // null = valeur finale (SSR, reduced-motion)

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / 1400, 1);
        setN(p < 1 ? Math.round(valeur * (1 - Math.pow(1 - p, 3))) : null);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.15 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [valeur]);

  return <div ref={ref}>{n === null ? affichage : n.toLocaleString("fr-FR")}</div>;
}
