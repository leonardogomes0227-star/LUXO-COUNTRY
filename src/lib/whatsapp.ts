import { SITE } from "../config";
import type { Product } from "../data/products";

export const waLink = (mensagem: string = SITE.mensagemPadrao) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensagem)}`;

export const mensagemPeca = (p: Product, tamanho: string) =>
  `Olá! Vim pelo site da Luxo Country e quero a peça: ${p.nome}, tamanho ${tamanho}. Pode me ajudar?`;

export interface LinhaPedido {
  nome: string;
  tamanho: string;
  qtd: number;
}

export const mensagemPedido = (itens: LinhaPedido[], cidade: string) => {
  const linhas = itens.map((i) => `• ${i.qtd}x ${i.nome} (tam. ${i.tamanho})`);
  return [
    "Olá! Vim pelo site da Luxo Country e quero fazer este pedido:",
    "",
    ...linhas,
    "",
    `Cidade para envio: ${cidade.trim() || "a informar"}`,
    "",
    "Pode me passar valores, prazo e formas de pagamento?",
  ].join("\n");
};
