import { motion } from "framer-motion";
import { Img } from "../components/Img";
import { Reveal } from "../components/Reveal";
import { IconArrow, IconStar } from "../components/Icons";
import { SITE } from "../config";
import { useFiltros } from "../store/filters";
import { waLink } from "../lib/whatsapp";

const POSTS = ["chapeus", "botas", "camisas"] as const;

export function Infantil() {
  const { ir } = useFiltros();
  return (
    <section id="infantil" className="relative overflow-hidden bg-[#F8E9CC] py-20 text-carvao lg:py-28 on-cream">
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-turquesa/20 blur-3xl" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Linha infantil</p>
          <h2 className="h-section mt-3">Os pequenos também <span className="italic text-turquesa">cavalgam em estilo</span></h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-carvao/75">
            Chapéu, bota, camisa e jeans no tamanho das crianças, com o mesmo cuidado da linha adulta. Para os pais que gostam de ver a família toda combinando.
          </p>
          <ul className="mt-6 space-y-2 text-carvao/80">
            {["Peças do tamanho certo para cada idade", "Conversa pelo WhatsApp para tirar dúvidas de tamanho", "Envio para todo o Brasil"].map((t) => (
              <li key={t} className="flex items-center gap-3"><IconStar width={14} height={14} className="text-caramelo" /> {t}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#catalogo" onClick={(e) => { e.preventDefault(); ir({ publico: "infantil" }); }} className="btn-dark">Ver linha infantil <IconArrow width={18} height={18} /></a>
            <a href={waLink(`Olá! Vim pelo site da ${SITE.nome} e quero ver peças infantis.`)} target="_blank" rel="noopener noreferrer" className="btn-ghost">Falar sobre tamanhos</a>
          </div>
        </Reveal>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {POSTS.map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: (i - 1) * 3 }}
              whileHover={{ rotate: 0, scale: 1.04 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 120 }}
              className={`aspect-[3/5] overflow-hidden rounded-[1.4rem] border-4 border-white shadow-xl ${i === 1 ? "mt-8" : ""}`}
            >
              {/* CONFIRMAR: fotos das crianças (public/images/infantil/), com autorização dos responsáveis */}
              <Img alt="Criança vestindo chapéu e bota country da Luxo Country" forma={f} rotulo="Foto infantil" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
