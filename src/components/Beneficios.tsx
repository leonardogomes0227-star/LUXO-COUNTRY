import { BENEFICIOS } from "../data/content";
import { IconCard, IconPin, IconTruck, IconWhatsapp } from "./Icons";

const ICONES = { truck: IconTruck, card: IconCard, chat: IconWhatsapp, pin: IconPin };

export function Beneficios() {
  return (
    <section aria-label="Vantagens" className="border-b border-couro/15 bg-creme text-carvao">
      <ul className="container-x grid grid-cols-2 gap-x-4 gap-y-5 py-6 lg:grid-cols-4">
        {BENEFICIOS.map((b) => {
          const I = ICONES[b.icone];
          return (
            <li key={b.t} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-couro/10 text-couro"><I width={22} height={22} /></span>
              <span className="leading-tight"><strong className="block text-[13px] sm:text-sm">{b.t}</strong><span className="text-xs text-carvao/65 sm:text-[13px]">{b.d}</span></span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
