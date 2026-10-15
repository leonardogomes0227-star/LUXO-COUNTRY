import { Counter } from "../components/Counter";
import { IconInstagram } from "../components/Icons";
import { Img } from "../components/Img";
import { Reveal } from "../components/Reveal";
import { INSTAGRAM_URL, SITE } from "../config";
import { POSTS_INSTAGRAM } from "../data/vitrine";

const FORMAS = ["chapeus", "botas", "camisas", "cavalo", "jeans", "cintos", "pessoa", "camisetas", "acessorios"] as const;

export function Instagram() {
  return (
    <section id="instagram" className="section-dark py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="eyebrow">Instagram</p>
            <h2 className="h-section mt-3">@{SITE.instagram}</h2>
            <dl className="mt-5 flex gap-10">
              <div>
                <dt className="text-sm text-creme/60">Seguidores</dt>
                <dd className="font-display text-3xl font-bold text-ouro"><Counter to={SITE.instagramSeguidores} prefix="+" /></dd>
              </div>
              <div>
                <dt className="text-sm text-creme/60">Publicações</dt>
                <dd className="font-display text-3xl font-bold text-ouro"><Counter to={SITE.instagramPublicacoes} prefix="+" /></dd>
              </div>
            </dl>
          </div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-gold"><IconInstagram width={18} height={18} /> Seguir @{SITE.instagram}</a>
        </Reveal>

        <ul className="mt-10 grid grid-cols-3 gap-2 sm:gap-4">
          {POSTS_INSTAGRAM.map((p, i) => (
            <li key={p.id} className="list-none">
              <Reveal delay={(i % 3) * 0.08} className="group relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={`${p.alt}, abrir no Instagram`} className="block h-full">
                  <Img src={p.src} srcSet={p.srcSet} sizes="(min-width:1024px) 400px, 33vw" alt={p.alt} forma={FORMAS[i % FORMAS.length]} rotulo={i === 0 ? "Post · exemplo" : undefined} className="transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute inset-0 grid place-items-center bg-carvao/55 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"><IconInstagram width={32} height={32} /></span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
