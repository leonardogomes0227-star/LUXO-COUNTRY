import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Cabeçalho editorial de seção: numeração, rótulo, título grande e descrição ao lado. */
export function SectionHeader({ n, eyebrow, title, desc, action }: { n: string; eyebrow: string; title: ReactNode; desc?: ReactNode; action?: ReactNode }) {
  return (
    <Reveal className="mb-10 grid gap-5 lg:mb-14 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
      <div>
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-current/60">
          <span className="font-display text-sm normal-case italic tracking-normal opacity-70">({n})</span>
          <span className="h-px w-10 bg-current opacity-30" />
          <span className="eyebrow !tracking-[0.3em]">{eyebrow}</span>
        </p>
        <h2 className="mt-4 font-display text-[2.5rem] font-semibold leading-[0.95] tracking-[-0.025em] sm:text-6xl lg:text-7xl">{title}</h2>
      </div>
      {(desc || action) && (
        <div className="flex flex-col gap-5 lg:items-start lg:pb-2">
          {desc && <p className="max-w-md text-[15px] leading-relaxed opacity-75 sm:text-base">{desc}</p>}
          {action}
        </div>
      )}
    </Reveal>
  );
}
