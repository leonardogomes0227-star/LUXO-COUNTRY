export interface Variante {
  id: string;
  nome: string;
  cor: string;
  palha?: boolean;
}

export const CHAPEUS: Variante[] = [
  { id: "preto", nome: "Preto", cor: "#17120f" },
  { id: "palha", nome: "Palha", cor: "#E2C98F", palha: true },
  { id: "marrom", nome: "Marrom", cor: "#5A3A26" },
  { id: "caramelo", nome: "Caramelo", cor: "#B07A45" },
];

export const CINTOS: Variante[] = [
  { id: "preto", nome: "Preto", cor: "#1a1411" },
  { id: "marrom", nome: "Marrom", cor: "#5A3A26" },
  { id: "caramelo", nome: "Caramelo", cor: "#B07A45" },
  { id: "palha", nome: "Areia", cor: "#CDB589" },
];
