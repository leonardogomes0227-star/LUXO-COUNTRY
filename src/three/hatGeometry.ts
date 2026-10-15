import { LatheGeometry, Vector2, type BufferGeometry } from "three";

const BRIM_IN = 0.76;
const BRIM_OUT = 1.5;
const CROWN_H = 0.94;

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Une as normais da costura do torno (primeira e última coluna) para não aparecer uma linha no brilho. */
function fecharCostura(g: BufferGeometry, segments: number, perRing: number) {
  const n = g.getAttribute("normal");
  for (let j = 0; j < perRing; j++) {
    const a = j;
    const b = segments * perRing + j;
    const x = n.getX(a) + n.getX(b), y = n.getY(a) + n.getY(b), z = n.getZ(a) + n.getZ(b);
    const l = Math.hypot(x, y, z) || 1;
    n.setXYZ(a, x / l, y / l, z / l);
    n.setXYZ(b, x / l, y / l, z / l);
  }
  n.needsUpdate = true;
}

function lathe(points: Vector2[], segments: number, deform: (x: number, y: number, z: number) => [number, number, number]) {
  const g = new LatheGeometry(points, segments);
  g.rotateY(Math.PI); // costura nas costas do chapéu
  const p = g.getAttribute("position");
  for (let i = 0; i < p.count; i++) {
    const [x, y, z] = deform(p.getX(i), p.getY(i), p.getZ(i));
    p.setXYZ(i, x, y, z);
  }
  g.computeVertexNormals();
  fecharCostura(g, segments, points.length);
  return g;
}

/** Aba: sobe nas laterais e cai levemente na frente e atrás. */
export const curvaAba = (x: number, y: number, z: number): [number, number, number] => {
  const r = Math.hypot(x, z) || 1;
  const t = smooth(BRIM_IN, BRIM_OUT, r);
  const lado = (x / r) ** 2;
  return [x, y + 0.5 * t * t * lado - 0.13 * t * t * (1 - lado), z];
};

export function criarAba() {
  const pts: Vector2[] = [];
  const passos = 28;
  for (let i = 0; i <= passos; i++) pts.push(new Vector2(BRIM_IN + ((BRIM_OUT - BRIM_IN) * i) / passos, 0));
  pts.push(new Vector2(BRIM_OUT + 0.012, -0.012));
  for (let i = passos; i >= 0; i--) pts.push(new Vector2(BRIM_IN + ((BRIM_OUT - BRIM_IN) * i) / passos, -0.032));
  return lathe(pts, 96, curvaAba);
}

/** Copa com vinco central e laterais marcadas, mais estreita na frente. */
export function criarCopa() {
  const perfil: [number, number][] = [
    [0.78, 0], [0.775, 0.2], [0.75, 0.42], [0.71, 0.62], [0.66, 0.78], [0.58, 0.88],
    [0.45, 0.925], [0.3, 0.94], [0.15, 0.945], [0, 0.945],
  ];
  const pts = perfil.map(([r, y]) => new Vector2(r, y));
  return lathe(pts, 96, (x, y, z) => {
    const f = smooth(0.5, CROWN_H, y);
    const vinco = 0.17 * f * Math.exp(-(x * x) / (2 * 0.19 * 0.19));
    const frente = smooth(-0.2, 0.75, z);
    const afunila = 1 - 0.2 * f * frente;
    const lateral = 1 - 0.05 * f;
    return [x * afunila * lateral, y - vinco - 0.02 * f * Math.max(0, -z), z];
  });
}
