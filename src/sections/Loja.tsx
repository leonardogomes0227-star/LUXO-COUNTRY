import { IconArrow, IconPin } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { SITE } from "../config";
import { HISTORIA } from "../data/content";

export function Loja() {
  return (
    <section id="loja" className="section-cream py-16 lg:py-28">
      <div className="container-x">
        <SectionHeader n="11" eyebrow="Nossa loja" title={<>Atendimento de perto, <em className="font-normal italic text-terra">envio para o Brasil</em></>} />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            {/* CONFIRMAR: texto editável em src/data/content.ts (HISTORIA) */}
            <div className="space-y-5 text-lg leading-relaxed text-carvao/80">
              {HISTORIA.map((t, i) => <p key={t} className={i === 0 ? "font-display text-2xl leading-snug text-carvao first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-terra" : ""}>{t}</p>)}
            </div>
            <dl className="mt-10 grid gap-6 border-t border-couro/20 pt-8 sm:grid-cols-2">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-couro">Endereço</dt>
                <dd className="mt-2 flex gap-2"><IconPin className="mt-0.5 shrink-0 text-terra" /> {SITE.endereco}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-couro">Horário</dt>
                <dd className="mt-2">{SITE.horario}</dd>
              </div>
            </dl>
            <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer" className="btn-dark mt-8">Como chegar <IconArrow width={18} height={18} /></a>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-carvao lg:aspect-auto lg:h-full lg:min-h-[460px]">
              {SITE.mapsEmbed ? (
                <iframe title={`Mapa: ${SITE.nome}`} src={SITE.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0" allowFullScreen />
              ) : (
                <div className="relative grid h-full place-items-center overflow-hidden p-8 text-center text-creme">
                  <svg aria-hidden viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full opacity-30">
                    {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M0 ${20 + i * 22} C120 ${10 + i * 22} 260 ${40 + i * 22} 400 ${18 + i * 22}`} stroke="#C9A15B" strokeWidth=".8" fill="none" />)}
                    <path d="M60 0 L180 300 M300 0 L240 300" stroke="#E9A85A" strokeWidth="5" opacity=".6" />
                  </svg>
                  <div className="relative">
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sol text-carvao shadow-[0_0_0_12px_rgba(233,168,90,.2)]"><IconPin width={28} height={28} /></span>
                    <p className="mt-5 font-display text-3xl font-semibold">{SITE.nome}</p>
                    <p className="mt-1 text-sm text-creme/75">{SITE.cidade}</p>
                    <p className="mt-5 text-[10px] uppercase tracking-[0.25em] text-sol">Mapa: colar a URL de embed em config.ts</p>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
