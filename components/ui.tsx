import Image from "next/image";
import Link from "next/link";

/** Lien interne réel si href est une route ; sinon <a> inerte (démo). */
export function L({ href, children, ...p }: React.ComponentProps<"a">) {
  return href && href !== "#" && !href.startsWith("tel:") ? <Link href={href} {...p}>{children}</Link> : <a {...p}>{children}</a>;
}

export const lc = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export const Wrap = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div className={`mx-auto max-w-[1280px] px-4 md:px-8 ${className}`}>{children}</div>
);

export const Img = ({ src, alt, sizes, className = "", priority, style }: { src: string; alt: string; sizes: string; className?: string; priority?: boolean; style?: React.CSSProperties }) => (
  <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={style} className={`object-cover ${className}`} />
);

export const Tag = ({ children, className = "bg-violet text-white" }: { children: React.ReactNode; className?: string }) => (
  <span className={`flex items-center gap-2 px-2.5 py-1 text-xs font-black tracking-[1.5px] md:px-3.5 md:py-[5px] md:text-[13px] ${className}`}>{children}</span>
);

export const H2 = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`m-0 text-[32px] leading-[1.05] font-black tracking-[-1px] md:text-[length:var(--aj-h2)] md:tracking-[-1.5px] ${className}`}>{children}</h2>
);

export const SeeAll = ({ children, href }: { children: React.ReactNode; href?: string }) => (
  <L href={href} className="py-2.5 text-[15px] font-black md:py-3 md:text-base">{children}</L>
);

export const Play = ({ size, className = "" }: { size: number; className?: string }) => (
  <span className={`aj-pulse flex items-center justify-center rounded-full bg-white/95 ${className}`}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#3E0095" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
  </span>
);

export const Emoji = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span aria-hidden="true" className={`aj-emoji absolute flex items-center justify-center rounded-full bg-white shadow-[0_8px_18px_rgba(20,0,60,.25)] ${className}`}>{children}</span>
);

/** Carte de remplacement quand une photo manque : dégradé lilas + gros emoji. */
export const Ph = ({ emoji, className = "" }: { emoji: string; className?: string }) => (
  <div aria-hidden="true" className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-lfond to-lilas text-[64px] ${className}`}>{emoji}</div>
);
