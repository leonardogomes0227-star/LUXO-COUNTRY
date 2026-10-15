import { useState } from "react";
import { CartProvider } from "./store/cart";
import { useSmoothScroll } from "./lib/lenis";
import type { Publico } from "./data/products";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Cursor } from "./components/Cursor";
import { CartDrawer } from "./components/CartDrawer";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { Stitch } from "./components/Stitch";
import { Colecoes } from "./sections/Colecoes";
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
  const [publico, setPublico] = useState<Publico | "todos">("todos");

  return (
    <CartProvider>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Colecoes onEscolher={setPublico} />
        <Catalogo publico={publico} setPublico={setPublico} />
        <Stitch tone="cream" />
        <Infantil onEscolher={setPublico} />
        <Stitch tone="dark" />
        <MonteSeuEstilo />
        <ComoComprar />
        <Stitch tone="dark" />
        <Mural />
        <Instagram />
        <Loja />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <CartDrawer />
      <Cursor />
      <WhatsAppFloat />
    </CartProvider>
  );
}
