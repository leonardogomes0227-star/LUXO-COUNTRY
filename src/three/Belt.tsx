import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Color, DoubleSide, type MeshStandardMaterial } from "three";
import { texturaRuido } from "./textures";
import type { Variante } from "./variants";

/** Cinto de couro enrolado, com pesponto e fivela dourada. */
export function Belt({ variante }: { variante: Variante }) {
  const mat = useRef<MeshStandardMaterial>(null);
  const alvo = useMemo(() => new Color(variante.cor), [variante.cor]);
  const ruido = useMemo(texturaRuido, []);
  useFrame((_, dt) => mat.current?.color.lerp(alvo, Math.min(1, dt * 7)));
  useEffect(() => () => ruido.dispose(), [ruido]);

  const R = 0.85;
  return (
    <group rotation={[0.55, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[R, R, 0.26, 96, 1, true]} />
        <meshStandardMaterial ref={mat} color={variante.cor} roughness={0.5} side={DoubleSide} bumpMap={ruido} bumpScale={1.6} />
      </mesh>
      {[0.1, -0.1].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[R + 0.002, 0.006, 6, 140]} />
          <meshStandardMaterial color="#e6d3a3" roughness={0.6} />
        </mesh>
      ))}
      {/* fivela */}
      <group position={[0, 0, R + 0.03]}>
        <mesh>
          <boxGeometry args={[0.42, 0.34, 0.045]} />
          <meshStandardMaterial color="#C9A15B" metalness={1} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[0.3, 0.22, 0.03]} />
          <meshStandardMaterial color="#8c6a30" metalness={1} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.11, 0.11, 0.02]} />
          <meshStandardMaterial color="#C9A15B" metalness={1} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}
