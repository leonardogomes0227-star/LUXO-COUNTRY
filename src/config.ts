/**
 * Configuração central do site. Troque aqui o que for específico da loja.
 * Itens marcados com `CONFIRMAR` precisam de validação do cliente antes de publicar.
 */
export const SITE = {
  nome: "Luxo Country",
  url: "https://luxocountry.vercel.app", // CONFIRMAR domínio final (atualizar também index.html, sitemap.xml e robots.txt)
  instagram: "luxocountryrv",
  whatsapp: "55XXXXXXXXXXX", // TROCAR pelo número real, com DDI+DDD, só dígitos. Ex.: 5567999999999
  endereco: "Avenida Euclides Goes, 510, Rio Verde de Mato Grosso, MS, 79480-000",
  cidade: "Rio Verde de Mato Grosso, MS",
  horario: "Seg a Sex 8h–18h · Sáb 8h–12h", // CONFIRMAR com o cliente
  mapsEmbed: "", // colar a URL de embed do Google Maps (Compartilhar > Incorporar um mapa > src do iframe)
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Avenida+Euclides+Goes+510+Rio+Verde+de+Mato+Grosso+MS",
  mensagemPadrao: "Olá! Vim pelo site da Luxo Country e quero atendimento.",
  instagramSeguidores: 9000, // CONFIRMAR (aproximado, visto no perfil)
  instagramPublicacoes: 790, // CONFIRMAR (aproximado, visto no perfil)
  creditoNome: "STCK.Labs",
  creditoInstagram: "stck.labs",
} as const;

/** Frete, prazos e pagamento: nada prometido além do que a loja informou. */
export const ATENDIMENTO = {
  envioBrasil: true, // loja informa envio para todo o Brasil
  parcelaNoCartao: true, // loja informa parcelamento no cartão
} as const;

/** Mude para `true` depois de colocar o arquivo em `public/models/chapeu.glb`. */
export const USAR_MODELO_GLB = false;
export const CAMINHO_MODELO_GLB = "/models/chapeu.glb";

export const WHATSAPP_CONFIGURADO = !SITE.whatsapp.includes("X");
export const INSTAGRAM_URL = `https://www.instagram.com/${SITE.instagram}/`;
