/**
 * Fotos de clientes, prints de feedback e posts do Instagram.
 * Sem foto, o site mostra um placeholder rotulado. Para usar a foto real,
 * coloque o arquivo em public/images/... e informe `src` (e `srcSet`, se houver).
 */
export interface Foto {
  id: string;
  alt: string;
  src?: string;
  srcSet?: string;
}

// CONFIRMAR: usar fotos somente com autorização dos clientes.
export const CLIENTES: Foto[] = Array.from({ length: 6 }, (_, i) => ({
  id: `cliente-${i + 1}`,
  alt: `Cliente da Luxo Country usando peças da loja (foto ${i + 1})`,
}));

// CONFIRMAR: prints de conversas apenas com autorização de quem enviou.
export const FEEDBACKS: Foto[] = Array.from({ length: 3 }, (_, i) => ({
  id: `feedback-${i + 1}`,
  alt: `Print de feedback de cliente (${i + 1})`,
}));

// CONFIRMAR: composições ilustrativas. Trocar por posts reais do perfil (public/images/instagram/).
export const POSTS_INSTAGRAM: Foto[] = Array.from({ length: 9 }, (_, i) => ({
  id: `post-${i + 1}`,
  alt: `Composição ilustrativa de peças country (${i + 1})`,
  src: `/images/arte/ig-${i + 1}.webp`,
}));
