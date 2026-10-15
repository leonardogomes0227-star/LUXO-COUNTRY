# Modelo 3D do chapéu

O site usa um chapéu procedural. Para usar um modelo próprio:
1. Salve o arquivo como `public/models/chapeu.glb` (ideal: abaixo de 2 MB, com compressão Draco/Meshopt).
2. Em `src/config.ts`, mude `USAR_MODELO_GLB` para `true`.
3. Ajuste escala/posição do modelo no editor 3D se necessário (o chapéu deve ter ~3 unidades de largura e ficar centrado na origem).
