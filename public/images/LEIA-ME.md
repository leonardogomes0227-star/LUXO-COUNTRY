# Fotos da Luxo Country

Coloque aqui as fotos reais da loja (do Instagram @luxocountryrv), **somente com autorização do cliente** e de quem aparece nas fotos (principalmente crianças).

| Pasta | Uso |
|---|---|
| `hero/` | Imagens de destaque (opcional) |
| `produtos/` | Fotos das peças (frente e detalhe) |
| `infantil/` | Seção infantil |
| `clientes/` | Mural de clientes e prints de feedback |
| `instagram/` | Grade de 6 a 9 posts |
| `loja/` | Fachada e interior da loja |

## Como usar
1. Exporte as fotos em **WebP** (ou AVIF), largura máxima 1200px, idealmente também versões 600px.
2. Salve na pasta correspondente, por exemplo `public/images/produtos/camisa-xadrez.webp`.
3. Informe o caminho no arquivo de dados:
   - Produtos: `src/data/products.ts` → `fotos: ["/images/produtos/camisa-xadrez.webp", "/images/produtos/camisa-xadrez-detalhe.webp"]`
   - Clientes, feedbacks e Instagram: `src/data/vitrine.ts` → `src` (e `srcSet`, ex.: `"/images/instagram/p1-600.webp 600w, /images/instagram/p1-1200.webp 1200w"`).

Enquanto não houver foto, o site mostra um placeholder elegante rotulado como exemplo. Nada aparece quebrado.
