import { IconInstagram, IconPin, IconWhatsapp } from "../components/Icons";
import { Logo } from "../components/Logo";
import { Reveal } from "../components/Reveal";
import { INSTAGRAM_URL, SITE } from "../config";
import { waLink } from "../lib/whatsapp";

export function CtaFinal() {
  return (
    <section id="contato" className="section-cream relative overflow-hidden py-24 text-center lg:py-32">
      <div aria-hidden className="absolute inset-4 rounded-[2rem] border-2 border-dashed border-couro/30 sm:inset-8" />
      <Reveal className="container-x relative">
        <Logo size={96} className="mx-auto" />
        <h2 className="h-section mx-auto mt-8 max-w-3xl">Pronto para vestir o seu estilo?</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-carvao/70">Chame a gente no WhatsApp. Enviamos para todo o Brasil e parcelamos no cartão.</p>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-gold mt-9 !min-h-14 !px-9 !text-base"><IconWhatsapp /> Pedir no WhatsApp</a>
      </Reveal>
    </section>
  );
}

const LINKS = [
  { href: "#colecoes", t: "Coleções" },
  { href: "#catalogo", t: "Catálogo" },
  { href: "#infantil", t: "Infantil" },
  { href: "#como-comprar", t: "Como comprar" },
  { href: "#loja", t: "Loja" },
  { href: "#faq", t: "Dúvidas" },
];

export function Footer() {
  return (
    <footer className="section-dark border-t border-ouro/25 pb-8 pt-14">
      <div className="container-x grid gap-10 md:grid-cols-[1.2fr_1fr_1.2fr]">
        <div>
          <Logo size={72} />
          <p className="mt-4 max-w-xs text-sm text-creme/65">Moda country masculina, feminina e infantil. Enviamos para todo o Brasil.</p>
        </div>
        <nav aria-label="Rodapé">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {LINKS.map((l) => <li key={l.href}><a href={l.href} className="inline-block py-1 text-creme/80 hover:text-ouro">{l.t}</a></li>)}
          </ul>
        </nav>
        <div className="space-y-3 text-sm text-creme/80">
          <p className="flex gap-3"><IconPin className="mt-0.5 shrink-0 text-ouro" /> {SITE.endereco}</p>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-ouro"><IconInstagram className="text-ouro" /> @{SITE.instagram}</a>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-ouro"><IconWhatsapp className="text-ouro" /> Falar no WhatsApp</a>
        </div>
      </div>
      <div className="container-x mt-12 flex flex-col gap-2 border-t border-creme/10 pt-6 text-xs text-creme/55 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {SITE.nome}. Todos os direitos reservados.</p>
        <p>Site por <a href={`https://www.instagram.com/${SITE.creditoInstagram}/`} target="_blank" rel="noopener noreferrer" className="text-ouro underline underline-offset-2">{SITE.creditoNome}</a> (@{SITE.creditoInstagram})</p>
      </div>
    </footer>
  );
}
