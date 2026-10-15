import { CONFIANCA } from "../data/content";
import { IconStar } from "./Icons";

export function Marquee() {
  const itens = [...CONFIANCA, ...CONFIANCA, ...CONFIANCA, ...CONFIANCA];
  return (
    <div className="relative overflow-hidden border-y border-ouro/30 bg-couro py-4 text-creme" aria-label={CONFIANCA.join(", ")}>
      <div aria-hidden className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {itens.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-lg italic">
            {t} <IconStar width={12} height={12} className="text-ouro" />
          </span>
        ))}
      </div>
    </div>
  );
}
