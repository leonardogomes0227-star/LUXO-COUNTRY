export const FAQ: { p: string; r: string }[] = [
  // CONFIRMAR: respostas genéricas, validar cada uma com o cliente antes de publicar.
  { p: "Vocês enviam para todo o Brasil?", r: "Sim, enviamos para todo o Brasil. Informe sua cidade no pedido pelo WhatsApp e combinamos o envio com você." },
  { p: "Qual é o prazo de entrega?", r: "O prazo depende da sua região e da forma de envio. Passamos a estimativa certinha no atendimento, antes de você fechar o pedido." },
  { p: "Como funcionam as trocas?", r: "Se o tamanho não servir, fale com a gente pelo WhatsApp. Combinamos a troca conforme a política da loja (a confirmar com a Luxo Country)." },
  { p: "Quais são as formas de pagamento?", r: "Parcelamos no cartão. As demais formas de pagamento são confirmadas no atendimento pelo WhatsApp." },
  { p: "Como escolho o tamanho certo?", r: "Cada peça mostra os tamanhos disponíveis. Em caso de dúvida, mande suas medidas pelo WhatsApp e ajudamos a escolher." },
  { p: "Posso ver a peça antes de comprar?", r: "Pode. Atendemos pelo WhatsApp com fotos e vídeos das peças, e a loja física fica em Rio Verde de Mato Grosso, MS." },
];

export const PASSOS = [
  { n: "01", t: "Escolha a peça", d: "Navegue pelas coleções, escolha o tamanho e monte sua sacola." },
  { n: "02", t: "Chame no WhatsApp", d: "Enviamos o pedido pronto na conversa. Tiramos dúvidas e confirmamos tudo com você." },
  { n: "03", t: "Receba em casa", d: "Enviamos para todo o Brasil, com parcelamento no cartão." },
];

export const AVISOS = ["Enviamos para todo o Brasil", "Parcelamos no cartão", "Peça pelo WhatsApp e receba em casa"];

export const BENEFICIOS = [
  { t: "Envio para todo o Brasil", d: "Combine o envio pelo WhatsApp", icone: "truck" },
  { t: "Parcelamos no cartão", d: "Condições no atendimento", icone: "card" },
  { t: "Atendimento pelo WhatsApp", d: "Do pedido à entrega", icone: "chat" },
  { t: "Loja física", d: "Rio Verde de Mato Grosso, MS", icone: "pin" },
] as const;

/** CONFIRMAR: texto de apresentação, editável pelo cliente. */
export const HISTORIA = [
  "A Luxo Country nasceu do gosto por um estilo que combina tradição e elegância. Aqui você encontra camisas, jeans, chapéus, cintos, botas e acessórios para toda a família, escolhidos com cuidado.",
  "Em Rio Verde de Mato Grosso, o atendimento é próximo: você é recebido na loja e conhece cada peça de perto. Para quem está longe, a conversa continua pelo WhatsApp e o pedido segue para o Brasil inteiro.",
];
