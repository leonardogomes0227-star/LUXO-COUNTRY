import { Counter } from "../components/Counter";
import { IconInstagram } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { INSTAGRAM_URL, SITE } from "../config";
import { POSTS_INSTAGRAM } from "../data/vitrine";

export function Instagram() {
  return (
    <section id="instagram" className="section-dark py-16 lg:py-28">
      <div className="container-x">
        <SectionHeader
          n="10"
          eyebrow="Instagram"
          title={<>Siga a <em className="font-normal italic text-sol">@{SITE.instagram}</em></>}
          desc={
            <span className="flex gap-10">
              <span><span className="block font-display text-4xl font-semibold text-sol"><Counter to={SITE.instagramSeguidores} prefix="+" /></span><span className="text-sm text-creme/60">seguidores</span></span>
              <span><span className="block font-display text-4xl font-semibold text-sol"><Counter to={SITE.instagramPublicacoes} prefix="+" /></span><span className="text-sm text-creme/60">publicações</span></span>
            </span>
          }
          action={<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-gold"><IconInstagram width={18} height={18} /> Seguir no Instagram</a>}
        />
        <ul className="grid grid-cols-3 gap-1.5 sm:gap-3">
          {POSTS_INSTAGRAM.map((p, i) => (
            <li key={p.id}>
              <Reveal delay={(i % 3) * 0.08} className="group relative aspect-square overflow-hidden rounded-lg sm:rounded-2xl">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={`${p.alt}, abrir Instagram`} className="block h-full">
                  {p.src && <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />}
                  <span className="absolute inset-0 grid place-items-center bg-carvao/55 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"><IconInstagram width={32} height={32} /></span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-creme/45">Imagens ilustrativas até conectar as fotos do perfil.</p>
      </div>
    </section>
  );
}
