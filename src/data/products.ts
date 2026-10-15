export type Publico = "masculino" | "feminino" | "infantil";
export type Categoria = "camisas" | "camisetas" | "jeans" | "chapeus" | "cintos" | "botas" | "acessorios";

export interface Product {
  id: string;
  nome: string;
  categoria: Categoria;
  publico: Publico;
  tamanhos: string[];
  /** Preço em reais. `null` mostra "Consulte". Não inventar preços. */
  preco: number | null;
  /** Fotos [frente, detalhe]. Sem foto, usa o placeholder. Hoje são ilustrações de exemplo; trocar por fotos reais (ex.: "/images/produtos/camisa-xadrez.webp"). */
  fotos?: [string, string?];
  /** Marca como dado de exemplo. Remover quando a peça real for cadastrada. */
  exemplo: true;
}

export const CATEGORIAS: { id: Categoria; nome: string }[] = [
  { id: "camisas", nome: "Camisas" },
  { id: "camisetas", nome: "Camisetas" },
  { id: "jeans", nome: "Jeans" },
  { id: "chapeus", nome: "Chapéus" },
  { id: "cintos", nome: "Cintos" },
  { id: "botas", nome: "Botas" },
  { id: "acessorios", nome: "Acessórios" },
];

export const PUBLICOS: { id: Publico; nome: string }[] = [
  { id: "masculino", nome: "Masculina" },
  { id: "feminino", nome: "Feminina" },
  { id: "infantil", nome: "Infantil" },
];

const ADULTO = ["P", "M", "G", "GG"];
const INFANTIL = ["2", "4", "6", "8", "10", "12"];

// CONFIRMAR: todas as peças abaixo são EXEMPLOS. Substituir pelo catálogo real da loja.
export const PRODUCTS: Product[] = [
  { id: "ex-camisa-masc", nome: "Camisa bordada masculina", categoria: "camisas", publico: "masculino", tamanhos: ADULTO, preco: null, fotos: ["/images/produtos/ex-camisa-masc-frente.webp", "/images/produtos/ex-camisa-masc-detalhe.webp"], exemplo: true },
  { id: "ex-camiseta-masc", nome: "Camiseta estampa de sela", categoria: "camisetas", publico: "masculino", tamanhos: ADULTO, preco: null, fotos: ["/images/produtos/ex-camiseta-masc-frente.webp", "/images/produtos/ex-camiseta-masc-detalhe.webp"], exemplo: true },
  { id: "ex-jeans-masc", nome: "Calça jeans reta country", categoria: "jeans", publico: "masculino", tamanhos: ["38", "40", "42", "44", "46"], preco: null, fotos: ["/images/produtos/ex-jeans-masc-frente.webp", "/images/produtos/ex-jeans-masc-detalhe.webp"], exemplo: true },
  { id: "ex-chapeu-preto", nome: "Chapéu de feltro", categoria: "chapeus", publico: "masculino", tamanhos: ["56", "58", "60"], preco: null, fotos: ["/images/produtos/ex-chapeu-preto-frente.webp", "/images/produtos/ex-chapeu-preto-detalhe.webp"], exemplo: true },
  { id: "ex-cinto-couro", nome: "Cinto de couro com fivela", categoria: "cintos", publico: "masculino", tamanhos: ["90", "100", "110", "120"], preco: null, fotos: ["/images/produtos/ex-cinto-couro-frente.webp", "/images/produtos/ex-cinto-couro-detalhe.webp"], exemplo: true },
  { id: "ex-bota-masc", nome: "Bota de couro cano médio", categoria: "botas", publico: "masculino", tamanhos: ["38", "39", "40", "41", "42", "43"], preco: null, fotos: ["/images/produtos/ex-bota-masc-frente.webp", "/images/produtos/ex-bota-masc-detalhe.webp"], exemplo: true },
  { id: "ex-camisa-fem", nome: "Camisa feminina com bordado", categoria: "camisas", publico: "feminino", tamanhos: ADULTO, preco: null, fotos: ["/images/produtos/ex-camisa-fem-frente.webp", "/images/produtos/ex-camisa-fem-detalhe.webp"], exemplo: true },
  { id: "ex-camiseta-fem", nome: "Camiseta feminina country", categoria: "camisetas", publico: "feminino", tamanhos: ADULTO, preco: null, fotos: ["/images/produtos/ex-camiseta-fem-frente.webp", "/images/produtos/ex-camiseta-fem-detalhe.webp"], exemplo: true },
  { id: "ex-jeans-fem", nome: "Calça jeans feminina cintura alta", categoria: "jeans", publico: "feminino", tamanhos: ["36", "38", "40", "42", "44"], preco: null, fotos: ["/images/produtos/ex-jeans-fem-frente.webp", "/images/produtos/ex-jeans-fem-detalhe.webp"], exemplo: true },
  { id: "ex-bota-fem", nome: "Bota feminina bordada", categoria: "botas", publico: "feminino", tamanhos: ["34", "35", "36", "37", "38", "39"], preco: null, fotos: ["/images/produtos/ex-bota-fem-frente.webp", "/images/produtos/ex-bota-fem-detalhe.webp"], exemplo: true },
  { id: "ex-chapeu-palha", nome: "Chapéu de palha", categoria: "chapeus", publico: "feminino", tamanhos: ["54", "56", "58"], preco: null, fotos: ["/images/produtos/ex-chapeu-palha-frente.webp", "/images/produtos/ex-chapeu-palha-detalhe.webp"], exemplo: true },
  { id: "ex-acessorio", nome: "Bolsa de couro com franjas", categoria: "acessorios", publico: "feminino", tamanhos: ["Único"], preco: null, fotos: ["/images/produtos/ex-acessorio-frente.webp", "/images/produtos/ex-acessorio-detalhe.webp"], exemplo: true },
  { id: "ex-camisa-kids", nome: "Camisa infantil xadrez", categoria: "camisas", publico: "infantil", tamanhos: INFANTIL, preco: null, fotos: ["/images/produtos/ex-camisa-kids-frente.webp", "/images/produtos/ex-camisa-kids-detalhe.webp"], exemplo: true },
  { id: "ex-bota-kids", nome: "Bota infantil country", categoria: "botas", publico: "infantil", tamanhos: ["22", "24", "26", "28", "30", "32"], preco: null, fotos: ["/images/produtos/ex-bota-kids-frente.webp", "/images/produtos/ex-bota-kids-detalhe.webp"], exemplo: true },
  { id: "ex-chapeu-kids", nome: "Chapéu infantil", categoria: "chapeus", publico: "infantil", tamanhos: ["50", "52", "54"], preco: null, fotos: ["/images/produtos/ex-chapeu-kids-frente.webp", "/images/produtos/ex-chapeu-kids-detalhe.webp"], exemplo: true },
  { id: "ex-jeans-kids", nome: "Calça jeans infantil", categoria: "jeans", publico: "infantil", tamanhos: INFANTIL, preco: null, fotos: ["/images/produtos/ex-jeans-kids-frente.webp", "/images/produtos/ex-jeans-kids-detalhe.webp"], exemplo: true },
];

export const categoriaNome = (id: Categoria) => CATEGORIAS.find((c) => c.id === id)?.nome ?? id;
export const publicoNome = (id: Publico) => PUBLICOS.find((p) => p.id === id)?.nome ?? id;

export const formatPreco = (p: number | null) =>
  p === null ? "Consulte" : p.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
