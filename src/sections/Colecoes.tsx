import { motion } from "framer-motion";
import { Img } from "../components/Img";
import { Reveal } from "../components/Reveal";
import { IconArrow } from "../components/Icons";
import type { Publico } from "../data/products";
import { useFiltros } from "../store/filters";

const COLECOES: { id: Publico; t: string; d: string; forma: "camisas" | "chapeus" | "botas" }[] = [
  { id: "masculino", t: "Masculina", d: "Camisas, jeans, chapéus e botas com presença.", forma: "chapeus" },
  { id: "feminino", t: "Feminina", d: "Bordados, jeans e acessórios para o seu estilo.", forma: "camisas" },
  { id: "infantil", t: "Infantil", d: "Chapéu e bota no tamanho dos pequenos.", forma: "botas" },
];

// CONFIRMAR: trocar `src` pelas fotos reais (public/images/produtos/...)
export function Colecoes() {
  const { ir } = useFiltros();
  return (
    <section id="colecoes" className="section-cream py-12 lg:py-16">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Para cada um da família</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {COLECOES.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.1}>
              <motion.a
                href="#catalogo"
                onClick={(e) => { e.preventDefault(); ir({ publico: c.id }); }}
                whileHover="hover"
                className="group relative block aspect-square overflow-hidden rounded-2xl md:aspect-[4/5] lg:aspect-[5/4] bg-carvao"
              >
                <motion.div variants={{ hover: { scale: 1.08 } }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-x-0 top-0 bottom-[42%] md:bottom-0">
                  <Img alt={`Coleção ${c.t.toLowerCase()} Luxo Country`} forma={c.forma} />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-carvao via-carvao/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-creme">
                  <h3 className="text-4xl font-bold">{c.t}</h3>
                  <p className="mt-2 max-w-xs text-sm text-creme/80">{c.d}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ouro">
                    Ver peças <IconArrow width={18} height={18} className="transition-transform group-hover:translate-x-1.5" />
                  </span>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
