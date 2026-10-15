import { lazy, Suspense, useState } from "react";
import { HatIllustration } from "../components/HatIllustration";
import { IconWhatsapp } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { useCan3D, useInView, useVisible } from "../lib/device";
import { waLink } from "../lib/whatsapp";
import { CHAPEUS, CINTOS, type Variante } from "../three/variants";

const StyleCanvas = lazy(() => import("../three/StyleCanvas"));

function Seletor({ titulo, opcoes, valor, onChange }: { titulo: string; opcoes: Variante[]; valor: Variante; onChange: (v: Variante) => void }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold uppercase tracking-[0.2em] text-ouro">{titulo}: <span className="text-creme">{valor.nome}</span></legend>
      <div className="mt-3 flex flex-wrap gap-3">
        {opcoes.map((o) => (
          <label key={o.id} className="cursor-pointer">
            <input type="radio" name={titulo} checked={valor.id === o.id} onChange={() => onChange(o)} className="peer sr-only" />
            <span
              title={o.nome}
              className="relative grid h-14 w-14 place-items-center rounded-full border-2 border-creme/20 transition-all peer-checked:scale-110 peer-checked:border-ouro peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-ouro"
              style={{ background: `radial-gradient(circle at 30% 30%, ${o.cor}, ${o.cor} 55%, #000 160%)` }}
            >
              <span className="sr-only">{o.nome}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function MonteSeuEstilo() {
  const [chapeu, setChapeu] = useState(CHAPEUS[0]);
  const [cinto, setCinto] = useState(CINTOS[1]);
  const can3D = useCan3D();
  const [setNear, perto] = useInView<HTMLDivElement>("300px");
  const [setVis, visivel] = useVisible<HTMLDivElement>();

  const msg = `Olá! Vim pelo site da Luxo Country e montei meu estilo: chapéu ${chapeu.nome.toLowerCase()} e cinto ${cinto.nome.toLowerCase()}. Pode me mostrar as opções disponíveis?`;

  return (
    <section id="estilo" className="section-dark relative overflow-hidden py-14 lg:py-28">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(90,58,38,.55),transparent_65%)]" />
      <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
        <div
          ref={(el) => { setNear(el); setVis(el); }}
          className="relative h-[52svh] min-h-[320px] overflow-hidden rounded-[2rem] border border-ouro/25 bg-gradient-to-b from-couro/30 to-carvao lg:h-[600px]"
        >
          <HatIllustration className={`absolute inset-0 m-auto h-full w-full max-w-md ${can3D && perto ? "opacity-0" : ""}`} />
          {can3D && perto && (
            <Suspense fallback={null}>
              <StyleCanvas chapeu={chapeu} cinto={cinto} ativo={visivel} />
            </Suspense>
          )}
          <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs uppercase tracking-[0.25em] text-creme/45">Arraste para girar</p>
        </div>

        <Reveal className="space-y-8">
          <div>
            <p className="eyebrow">Monte seu estilo</p>
            <h2 className="h-section mt-3">Escolha as cores, veja ao vivo</h2>
            <p className="mt-4 text-creme/75">Combine o chapéu e o cinto do seu jeito e envie a combinação pelo WhatsApp. A disponibilidade de cada cor é confirmada no atendimento.</p>
          </div>
          <Seletor titulo="Chapéu" opcoes={CHAPEUS} valor={chapeu} onChange={setChapeu} />
          <Seletor titulo="Cinto" opcoes={CINTOS} valor={cinto} onChange={setCinto} />
          <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-gold w-full sm:w-auto"><IconWhatsapp width={18} height={18} /> Pedir esta combinação</a>
        </Reveal>
      </div>
    </section>
  );
}
