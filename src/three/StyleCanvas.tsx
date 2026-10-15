import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group } from "three";
import { Belt } from "./Belt";
import { Hat } from "./Hat";
import { Studio, useRig } from "./Studio";
import type { Variante } from "./variants";

function Cena({ chapeu, cinto }: { chapeu: Variante; cinto: Variante }) {
  const g = useRef<Group>(null);
  const rig = useRig();
  useFrame((_, dt) => {
    const o = g.current;
    if (!o) return;
    if (!rig.current.dragging) rig.current.yaw += dt * 0.25;
    o.rotation.y += (rig.current.yaw - o.rotation.y) * Math.min(1, dt * 6);
  });
  return (
    <>
      <group ref={g} position={[-0.95, 0.25, 0]} rotation={[0.2, 0, 0]}>
        <Hat variante={chapeu} />
      </group>
      <group position={[1.55, 0.2, 0.3]} scale={0.8}>
        <Belt variante={cinto} />
      </group>
      <ContactShadows position={[0, -0.75, 0]} opacity={0.55} scale={24} blur={2.6} far={2.5} frames={1} color="#000" />
    </>
  );
}

export default function StyleCanvas({ chapeu, cinto, ativo }: { chapeu: Variante; cinto: Variante; ativo: boolean }) {
  return (
    <Canvas
      frameloop={ativo ? "always" : "never"}
      dpr={[1, 1.6]}
      camera={{ position: [0, 1.2, window.innerWidth < 640 ? 12.5 : 8.6], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      aria-label="Chapéu e cinto em 3D com cores selecionáveis. Arraste para girar."
    >
      <Suspense fallback={null}>
        <Studio />
        <Cena chapeu={chapeu} cinto={cinto} />
      </Suspense>
    </Canvas>
  );
}
