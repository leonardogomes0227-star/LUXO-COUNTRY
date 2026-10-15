import { waLink } from "../lib/whatsapp";
import { useCart } from "../store/cart";
import { IconBag, IconGrid, IconHome, IconWhatsapp } from "./Icons";

/** Barra de navegação fixa no rodapé, só no celular, no estilo de aplicativo de loja. */
export function MobileTabBar() {
  const { total, setAberta } = useCart();
  const item = "flex h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold text-creme/75 active:text-ouro";
  return (
    <nav aria-label="Atalhos" className="fixed inset-x-0 bottom-0 z-40 border-t border-ouro/25 bg-carvao/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-4">
        <a href="#topo" className={item}><IconHome width={22} height={22} />Início</a>
        <a href="#categorias" className={item}><IconGrid width={22} height={22} />Categorias</a>
        <button onClick={() => setAberta(true)} className={`${item} relative`}>
          <IconBag width={22} height={22} />Sacola
          {total > 0 && <span className="absolute right-[26%] top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-ouro px-1 text-[10px] font-bold text-carvao">{total}</span>}
        </button>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className={`${item} !text-[#25D366]`}><IconWhatsapp width={22} height={22} />WhatsApp</a>
      </div>
    </nav>
  );
}
