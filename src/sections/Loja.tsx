import { IconPin } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { SITE } from "../config";
import { HISTORIA } from "../data/content";

export function Loja() {
  return (
    <section id="loja" className="section-cream py-14 lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Nossa loja</p>
          <h2 className="h-section mt-3">Atendimento de perto, envio para o Brasil inteiro</h2>
          {/* CONFIRMAR: texto editável em src/data/content.ts (HISTORIA) */}
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-carvao/80">
            {HISTORIA.map((t) => <p key={t}>{t}</p>)}
          </div>
          <address className="mt-8 space-y-3 not-italic">
            <p className="flex gap-3"><IconPin className="mt-1 shrink-0 text-couro" /> <span><strong>Endereço</strong><br />{SITE.endereco}</span></p>
            <p className="pl-8"><strong>Horário</strong><br />{SITE.horario}</p>
          </address>
          <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer" className="btn-dark mt-8">Como chegar</a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="aspect-[4/3] overflow-hidden rounded-[2rem] border border-couro/25 bg-carvao lg:aspect-auto lg:h-full lg:min-h-[420px]">
            {SITE.mapsEmbed ? (
              <iframe title={`Mapa: ${SITE.nome}`} src={SITE.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0" allowFullScreen />
            ) : (
              <div className="grid h-full place-items-center p-8 text-center text-creme/80">
                <div>
                  <IconPin width={40} height={40} className="mx-auto text-ouro" />
                  <p className="mt-4 font-display text-2xl font-bold">{SITE.nome}</p>
                  <p className="mt-1 text-sm">{SITE.endereco}</p>
                  <p className="mt-4 text-xs uppercase tracking-widest text-ouro">Mapa: colar a URL de embed em config.ts</p>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
