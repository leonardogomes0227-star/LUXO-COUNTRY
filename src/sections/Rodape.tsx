import { IconCard, IconInstagram, IconPin, IconTruck, IconWhatsapp } from "../components/Icons";
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

const COLUNAS = [
  { t: "Compre", links: [["#colecoes", "Coleções"], ["#categorias", "Categorias"], ["#catalogo", "Todos os produtos"], ["#estilo", "Monte seu estilo"]] },
  { t: "Ajuda", links: [["#como-comprar", "Como comprar"], ["#faq", "Perguntas frequentes"], ["#clientes", "Clientes e feedbacks"]] },
  { t: "A loja", links: [["#loja", "Nossa loja"], ["#instagram", "Instagram"], ["#contato", "Contato"]] },
];

export function Footer() {
  return (
    <footer className="section-dark border-t-4 border-couro pb-8 pt-14">
      <div className="container-x grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.3fr]">
        <div>
          <Logo size={80} />
          <p className="mt-4 max-w-xs text-sm text-creme/65">Moda country masculina, feminina e infantil. Enviamos para todo o Brasil.</p>
        </div>
        {COLUNAS.map((c) => (
          <nav key={c.t} aria-label={c.t}>
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-ouro">{c.t}</h3>
            <ul className="mt-4 space-y-1 text-sm">
              {c.links.map(([h, t]) => <li key={h}><a href={h} className="inline-block py-1.5 text-creme/80 hover:text-ouro">{t}</a></li>)}
            </ul>
          </nav>
        ))}
        <div className="space-y-3 text-sm text-creme/80">
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-ouro">Atendimento</h3>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-ouro"><IconWhatsapp className="text-[#25D366]" /> Falar no WhatsApp</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-ouro"><IconInstagram className="text-ouro" /> @{SITE.instagram}</a>
          <p className="flex gap-3"><IconPin className="mt-0.5 shrink-0 text-ouro" /> {SITE.endereco}</p>
          <p className="pl-8 text-creme/60">{SITE.horario}</p>
        </div>
      </div>

      <div className="container-x mt-10 grid gap-4 border-t border-creme/10 pt-6 text-xs text-creme/70 sm:grid-cols-2">
        <div>
          <p className="mb-2 font-bold uppercase tracking-widest text-creme/50">Pagamento</p>
          <p className="inline-flex items-center gap-2 rounded-md border border-creme/20 px-3 py-2"><IconCard width={16} height={16} /> Cartão de crédito parcelado</p>
          {/* CONFIRMAR: demais formas de pagamento aceitas (Pix, débito, etc.) */}
        </div>
        <div>
          <p className="mb-2 font-bold uppercase tracking-widest text-creme/50">Envio</p>
          <p className="inline-flex items-center gap-2 rounded-md border border-creme/20 px-3 py-2"><IconTruck width={16} height={16} /> Enviamos para todo o Brasil</p>
        </div>
      </div>

      <div className="container-x mt-8 flex flex-col gap-2 border-t border-creme/10 pt-6 text-xs text-creme/55 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {SITE.nome}. Todos os direitos reservados.</p>
        <p>Site por <a href={`https://www.instagram.com/${SITE.creditoInstagram}/`} target="_blank" rel="noopener noreferrer" className="text-ouro underline underline-offset-2">{SITE.creditoNome}</a> (@{SITE.creditoInstagram})</p>
      </div>
    </footer>
  );
}
