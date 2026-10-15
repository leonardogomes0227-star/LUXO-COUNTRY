export interface Variante {
  id: string;
  nome: string;
  cor: string;
}

/** Imagens em public/images/estilo/{chapeu|cinto}-{id}.webp. CONFIRMAR as cores disponíveis na loja. */
export const CHAPEUS: Variante[] = [
  { id: "preto", nome: "Preto", cor: "#1b1613" },
  { id: "palha", nome: "Palha", cor: "#E2C98F" },
  { id: "marrom", nome: "Marrom", cor: "#5A3A26" },
  { id: "caramelo", nome: "Caramelo", cor: "#B07A45" },
];

export const CINTOS: Variante[] = [
  { id: "preto", nome: "Preto", cor: "#1f1814" },
  { id: "marrom", nome: "Marrom", cor: "#5A3A26" },
  { id: "caramelo", nome: "Caramelo", cor: "#B07A45" },
  { id: "palha", nome: "Areia", cor: "#CDB589" },
];
