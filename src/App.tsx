import { CartProvider } from "./store/cart";
import { FiltrosProvider } from "./store/filters";
import { useSmoothScroll } from "./lib/lenis";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Beneficios } from "./components/Beneficios";
import { Cursor } from "./components/Cursor";
import { CartDrawer } from "./components/CartDrawer";
import { MobileTabBar } from "./components/MobileTabBar";
import { Stories } from "./components/Stories";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { Lookbook } from "./sections/Lookbook";
import { Manifesto } from "./sections/Manifesto";
import { GiantMarquee } from "./components/GiantMarquee";
import { Categorias } from "./sections/Categorias";
import { Destaques } from "./sections/Destaques";
import { Catalogo } from "./sections/Catalogo";
import { Infantil } from "./sections/Infantil";
import { MonteSeuEstilo } from "./sections/MonteSeuEstilo";
import { ComoComprar } from "./sections/ComoComprar";
import { Mural } from "./sections/Mural";
import { Instagram } from "./sections/Instagram";
import { Loja } from "./sections/Loja";
import { Faq } from "./sections/Faq";
import { CtaFinal, Footer } from "./sections/Rodape";

export default function App() {
  useSmoothScroll();
  return (
    <CartProvider>
      <FiltrosProvider>
        <AnnouncementBar />
        <Header />
        <Stories />
        <main>
          <Hero />
          <Beneficios />
          <Lookbook />
          <Manifesto />
          <Categorias />
          <Destaques />
          <Catalogo />
          <GiantMarquee />
          <Infantil />
          <MonteSeuEstilo />
          <ComoComprar />
          <Mural />
          <Instagram />
          <Loja />
          <Faq />
          <CtaFinal />
        </main>
        <Footer />
        <CartDrawer />
        <Cursor />
        <MobileTabBar />
        <WhatsAppFloat />
      </FiltrosProvider>
    </CartProvider>
  );
}
