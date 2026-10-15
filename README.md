# Luxo Country — site de apresentação

Vite + React + TypeScript + Tailwind, Framer Motion, Lenis e Three.js (react-three-fiber). Sem backend.

## Como rodar
```bash
npm install
npm run dev      # desenvolvimento em http://localhost:5173
npm run build    # checagem de tipos + build de produção (dist/)
npm run preview  # testar o build
```

## O que trocar (tudo marcado com `// CONFIRMAR`)
| O quê | Onde |
|---|---|
| Número de WhatsApp, horário, mapa, domínio, seguidores | `src/config.ts` |
| Produtos (nome, tamanhos, preço, fotos) | `src/data/products.ts` (`preco: null` mostra "Consulte") |
| FAQ, passos, texto da loja | `src/data/content.ts` |
| Fotos de clientes, feedbacks, Instagram | `src/data/vitrine.ts` + `public/images/` (veja `public/images/LEIA-ME.md`) |
| Chapéu 3D próprio | `public/models/chapeu.glb` + `USAR_MODELO_GLB` em `src/config.ts` |
| Domínio no SEO | `index.html`, `public/sitemap.xml`, `public/robots.txt` |

## Publicar na Vercel
1. Suba o repositório no GitHub.
2. Em vercel.com → *Add New Project* → importe o repositório. O `vercel.json` já define build e cache.
3. Ou via CLI: `npx vercel` (preview) e `npx vercel --prod`.
4. Depois de definir o domínio, atualize-o nos arquivos de SEO acima.

## Pendências para confirmar com o cliente
- Número de WhatsApp real, horário de funcionamento e link de embed do Google Maps
- Catálogo real (nomes, tamanhos, preços ou "consulte") e fotos autorizadas
- Fotos de clientes/feedbacks e de crianças: autorização de uso
- Respostas do FAQ (envio, prazos, trocas, pagamento, tamanhos) e texto "Nossa loja"
- Seguidores/publicações exibidos (valores aproximados do perfil) e domínio final
- Logo oficial em vetor (o selo atual é uma recriação)
