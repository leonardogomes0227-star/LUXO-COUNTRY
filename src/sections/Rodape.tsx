import { IconCard, IconInstagram, IconPin, IconTruck, IconWhatsapp } from "../components/Icons";
import { Logo } from "../components/Logo";
import { Reveal } from "../components/Reveal";
import { INSTAGRAM_URL, SITE } from "../config";
import { waLink } from "../lib/whatsapp";

export function CtaFinal() {
  return (
    <section id="contato" className="relative isolate overflow-hidden bg-gradient-to-b from-carvao via-[#3a1a0d] to-terra py-24 text-center text-creme lg:py-36">
      <div aria-hidden className="absolute left-1/2 top-[62%] -z-10 h-[46vw] max-h-[560px] w-[46vw] max-w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#F8C774_0%,#E9A85A_45%,transparent_70%)] opacity-70 blur-[2px]" />
      <svg aria-hidden viewBox="0 0 1600 200" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 -z-10 h-24 w-full lg:h-40">
        <path d="M0 120 C200 90 380 110 560 100 C760 88 900 130 1100 112 C1300 96 1460 120 1600 104 V200 H0Z" fill="#140c08" />
      </svg>
      <Reveal className="container-x relative">
        <Logo size={88} className="mx-auto ring-4 ring-sol/40" />
        <h2 className="mx-auto mt-8 max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-[-0.03em] sm:text-7xl lg:text-8xl">
          Pronto para vestir <em className="font-normal italic text-sol">o seu estilo?</em>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-creme/80">Chame a gente no WhatsApp. Enviamos para todo o Brasil e parcelamos no cartão.</p>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn mt-10 !min-h-14 bg-creme !px-9 !text-base text-carvao hover:bg-white"><IconWhatsapp className="text-[#1f9d55]" /> Pedir no WhatsApp</a>
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
    <footer className="section-dark overflow-hidden bg-[#140c08] pb-24 pt-14 lg:pb-8">
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

      <p aria-hidden className="mt-14 select-none whitespace-nowrap text-center font-display text-[19vw] font-semibold leading-[0.8] tracking-[-0.05em] bg-gradient-to-b from-sol/60 to-transparent bg-clip-text text-transparent">
        Luxo <em className="font-normal italic">Country</em>
      </p>
      <div className="container-x mt-2 flex flex-col gap-2 border-t border-creme/10 pt-6 text-xs text-creme/55 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {SITE.nome}. Todos os direitos reservados.</p>
        <p>Site por <a href={`https://www.instagram.com/${SITE.creditoInstagram}/`} target="_blank" rel="noopener noreferrer" className="text-ouro underline underline-offset-2">{SITE.creditoNome}</a> (@{SITE.creditoInstagram})</p>
      </div>
    </footer>
  );
}
