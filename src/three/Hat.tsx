import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { Color, DoubleSide, type Mesh, type MeshStandardMaterial } from "three";
import { CAMINHO_MODELO_GLB, USAR_MODELO_GLB } from "../config";
import { criarAba, criarCopa } from "./hatGeometry";
import { texturaPalha, texturaRuido } from "./textures";
import type { Variante } from "./variants";

function HatProcedural({ variante }: { variante: Variante }) {
  const aba = useMemo(criarAba, []);
  const copa = useMemo(criarCopa, []);
  const palha = useMemo(texturaPalha, []);
  const ruido = useMemo(texturaRuido, []);
  const matFeltro = useRef<MeshStandardMaterial>(null);
  const matAba = useRef<MeshStandardMaterial>(null);
  const alvo = useMemo(() => new Color(variante.cor), [variante.cor]);

  useEffect(() => {
    for (const m of [matFeltro.current, matAba.current]) {
      if (!m) continue;
      m.map = variante.palha ? palha : null;
      m.bumpMap = ruido;
      m.bumpScale = variante.palha ? 0.6 : 1.4;
      m.roughness = variante.palha ? 0.7 : 0.92;
      m.needsUpdate = true;
    }
  }, [variante.palha, palha, ruido]);

  useFrame((_, dt) => {
    for (const m of [matFeltro.current, matAba.current]) m?.color.lerp(alvo, Math.min(1, dt * 7));
  });

  useEffect(() => () => { aba.dispose(); copa.dispose(); palha.dispose(); ruido.dispose(); }, [aba, copa, palha, ruido]);

  return (
    <group scale={[1, 1, 1.12]}>
      <mesh geometry={copa}>
        <meshStandardMaterial ref={matFeltro} color={variante.cor} side={DoubleSide} envMapIntensity={0.9} />
      </mesh>
      <mesh geometry={aba}>
        <meshStandardMaterial ref={matAba} color={variante.cor} side={DoubleSide} envMapIntensity={0.9} />
      </mesh>
      {/* faixa de couro */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.792, 0.797, 0.15, 96, 1, true]} />
        <meshStandardMaterial color="#2a1a10" roughness={0.55} side={DoubleSide} bumpMap={ruido} bumpScale={1.2} />
      </mesh>
      {/* pesponto da faixa */}
      {[0.045, 0.155].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.797, 0.004, 6, 120]} />
          <meshStandardMaterial color="#d8c08a" roughness={0.6} />
        </mesh>
      ))}
      {/* fivela dourada */}
      <group position={[0, 0.1, 0.835]}>
        {[
          [0, 0.085, 0.3, 0.03],
          [0, -0.085, 0.3, 0.03],
          [-0.135, 0, 0.03, 0.2],
          [0.135, 0, 0.03, 0.2],
        ].map(([x, y, w, h]) => (
          <mesh key={`${x}${y}`} position={[x, y, 0]}>
            <boxGeometry args={[w, h, 0.045]} />
            <meshStandardMaterial color="#C9A15B" metalness={1} roughness={0.22} />
          </mesh>
        ))}
        <mesh position={[0, 0, -0.005]}>
          <boxGeometry args={[0.24, 0.025, 0.03]} />
          <meshStandardMaterial color="#C9A15B" metalness={1} roughness={0.22} />
        </mesh>
      </group>
    </group>
  );
}

function HatGlb({ variante }: { variante: Variante }) {
  const { scene } = useGLTF(CAMINHO_MODELO_GLB);
  const clone = useMemo(() => scene.clone(true), [scene]);
  useEffect(() => {
    clone.traverse((o) => {
      const m = (o as Mesh).material as MeshStandardMaterial | undefined;
      if (m && "metalness" in m && m.metalness < 0.5) m.color.set(variante.cor);
    });
  }, [clone, variante.cor]);
  return <primitive object={clone} />;
}

/** Chapéu: usa public/models/chapeu.glb quando USAR_MODELO_GLB estiver ativo; senão o modelo procedural. */
export function Hat({ variante }: { variante: Variante }) {
  return USAR_MODELO_GLB ? <HatGlb variante={variante} /> : <HatProcedural variante={variante} />;
}
