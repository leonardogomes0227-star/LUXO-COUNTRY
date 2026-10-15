import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from "three";

function canvas(size: number) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  return c;
}

function finalizar(c: HTMLCanvasElement, rx: number, ry: number, srgb = true) {
  const t = new CanvasTexture(c);
  t.wrapS = t.wrapT = RepeatWrapping;
  t.repeat.set(rx, ry);
  if (srgb) t.colorSpace = SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Trama de palha trançada em tons de cinza (multiplica a cor do material). */
export function texturaPalha() {
  const c = canvas(128);
  const g = c.getContext("2d")!;
  g.fillStyle = "#cfcfcf";
  g.fillRect(0, 0, 128, 128);
  for (let y = 0; y < 128; y += 16) {
    for (let x = 0; x < 128; x += 16) {
      const alt = ((x + y) / 16) % 2 === 0;
      g.fillStyle = alt ? "#f2f2f2" : "#a9a9a9";
      g.fillRect(x + 1, y + 1, 14, 14);
      g.strokeStyle = "rgba(0,0,0,.25)";
      g.lineWidth = 1;
      for (let k = 3; k < 14; k += 4) {
        g.beginPath();
        if (alt) { g.moveTo(x + 1, y + k); g.lineTo(x + 15, y + k); } else { g.moveTo(x + k, y + 1); g.lineTo(x + k, y + 15); }
        g.stroke();
      }
    }
  }
  return finalizar(c, 14, 6);
}

/** Ruído suave para dar textura de feltro/couro (bump). */
export function texturaRuido() {
  const c = canvas(128);
  const g = c.getContext("2d")!;
  const d = g.createImageData(128, 128);
  for (let i = 0; i < d.data.length; i += 4) {
    const v = 128 + (Math.random() - 0.5) * 120;
    d.data[i] = d.data[i + 1] = d.data[i + 2] = v;
    d.data[i + 3] = 255;
  }
  g.putImageData(d, 0, 0);
  return finalizar(c, 10, 5, false);
}
