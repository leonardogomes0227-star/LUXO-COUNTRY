import { useState } from "react";
import type { Categoria } from "../data/products";

type Forma = Categoria | "cavalo" | "pessoa" | "cacto";

const SILHUETAS: Record<Forma, string> = {
  chapeus: "M14 58c10 8 24 12 36 12s26-4 36-12c-5 12-20 18-36 18S19 70 14 58Zm14-6c0-18 8-30 22-30s22 12 22 30c-7 4-14 6-22 6s-15-2-22-6Z",
  camisas: "M30 16l14 6c3 5 9 5 12 0l14-6 16 14-8 14-8-4v44H30V40l-8 4-8-14Z",
  camisetas: "M32 18l12 5c3 4 9 4 12 0l12-5 14 12-7 12-7-3v38H32V39l-7 3-7-12Z",
  jeans: "M30 14h40l6 74H56L50 44l-6 44H24Z",
  cintos: "M10 46h70v10H10Zm74-4h14v18H84Zm5 5v8h4v-8Z",
  botas: "M34 12h22v42l24 8c6 2 8 8 8 14v6H28Z",
  acessorios: "M26 36h48l6 44H20Zm10 0c0-14 6-22 14-22s14 8 14 22h-6c0-9-3-15-8-15s-8 6-8 15Z",
  cavalo: "M14 78c4-14 8-22 18-26l8-20 8 6c8-2 14 2 18 8l14 6-4 10-12-4-4 24H52l-4-14-14 14H14Z",
  pessoa: "M50 14a12 12 0 1 1 0 24 12 12 0 0 1 0-24Zm-26 74c0-22 8-40 26-40s26 18 26 40Z",
  cacto: "M44 90V30a6 6 0 0 1 12 0v60Zm-14-36a5 5 0 0 1 10 0v14H30Zm30-12a5 5 0 0 1 10 0v22H60Z",
};

/** Placeholder elegante: couro + pesponto + silhueta. Rotulado para o cliente saber que falta foto. */
export function Placeholder({ forma, rotulo, detalhe = false, className = "" }: { forma: Forma; rotulo?: string; detalhe?: boolean; className?: string }) {
  const id = `g-${forma}-${detalhe ? "d" : "f"}`;
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} role="img" aria-label={rotulo ?? "Imagem ilustrativa"}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={detalhe ? "#B07A45" : "#7a5236"} />
            <stop offset="1" stopColor={detalhe ? "#5A3A26" : "#2b1b12"} />
          </linearGradient>
          <pattern id={`${id}-p`} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <path d="M6 0v12M0 6h12" stroke="#C9A15B" strokeWidth=".35" opacity=".28" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#${id})`} />
        <rect width="100" height="100" fill={`url(#${id}-p)`} />
        <rect x="4" y="4" width="92" height="92" rx="3" fill="none" stroke="#F4EDE0" strokeWidth=".5" strokeDasharray="2.4 2" opacity=".55" />
        <g transform={detalhe ? "translate(50 52) scale(.9) translate(-50 -50)" : "translate(50 52) scale(.6) translate(-50 -50)"}>
          <path d={SILHUETAS[forma]} fill="#0E0C0A" opacity=".78" transform="translate(5 4)" />
          <path d={SILHUETAS[forma]} fill="#F4EDE0" opacity={detalhe ? 0.55 : 0.88} transform="translate(3 2)" />
        </g>
        {detalhe && <circle cx="74" cy="26" r="3" fill="#3F8F8A" />}
      </svg>
      {rotulo && (
        <span className="absolute bottom-2 left-2 rounded-full bg-carvao/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-creme backdrop-blur">
          {rotulo}
        </span>
      )}
    </div>
  );
}

interface ImgProps {
  src?: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  forma: Forma;
  rotulo?: string;
  detalhe?: boolean;
  className?: string;
}

/** Foto real quando existir; senão (ou se falhar ao carregar) placeholder. Nunca mostra imagem quebrada. */
export function Img({ src, srcSet, sizes = "(min-width:1024px) 33vw, 100vw", alt, forma, rotulo, detalhe, className = "" }: ImgProps) {
  const [erro, setErro] = useState(false);
  if (!src || erro) return <Placeholder forma={forma} rotulo={rotulo} detalhe={detalhe} className={className} />;
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setErro(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
