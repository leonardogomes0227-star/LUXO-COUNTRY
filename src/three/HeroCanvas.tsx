import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group } from "three";
import type { MotionValue } from "framer-motion";
import { Hat } from "./Hat";
import { Studio, useRig } from "./Studio";
import { CHAPEUS } from "./variants";

function Cena({ progress, onPronto }: { progress: MotionValue<number>; onPronto: () => void }) {
  const g = useRef<Group>(null);
  const rig = useRig();
  const pronto = useRef(false);

  useFrame((s, dt) => {
    const o = g.current;
    if (!o) return;
    if (!pronto.current) { pronto.current = true; onPronto(); }
    const r = rig.current;
    const p = progress.get();
    if (!r.dragging) r.yaw += dt * 0.35; // giro suave
    o.rotation.y += (r.yaw + p * 2.4 - o.rotation.y) * Math.min(1, dt * 6);
    o.rotation.x += (0.42 + r.py * 0.18 - o.rotation.x) * Math.min(1, dt * 4);
    o.rotation.z += (-r.px * 0.12 - o.rotation.z) * Math.min(1, dt * 4);
    const sc = 1 - p * 0.3;
    o.scale.setScalar(sc);
    s.camera.position.x += (r.px * 0.25 - s.camera.position.x) * Math.min(1, dt * 3);
    s.camera.lookAt(0, 0.15, 0);
  });

  return (
    <Float speed={1.4} rotationIntensity={0} floatIntensity={0.5} floatingRange={[-0.05, 0.08]}>
      <group ref={g}>
        <Hat variante={CHAPEUS[0]} />
      </group>
    </Float>
  );
}

export default function HeroCanvas({ progress, ativo, onPronto }: { progress: MotionValue<number>; ativo: boolean; onPronto: () => void }) {
  return (
    <Canvas
      frameloop={ativo ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.2, window.innerWidth < 640 ? 6.9 : 7.6], fov: 32 }}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      aria-label="Chapéu de cowboy em 3D. Arraste para girar."
    >
      <Suspense fallback={null}>
        <Studio />
        <Cena progress={progress} onPronto={onPronto} />
      </Suspense>
    </Canvas>
  );
}
