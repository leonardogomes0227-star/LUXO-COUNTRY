import { Environment, Lightformer } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

/** Iluminação de estúdio sem baixar HDR externo: softboxes procedurais + luz de recorte dourada. */
export function Studio() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={2.4} color="#fff1dc" />
      <directionalLight position={[-4, 2, -3]} intensity={3} color="#e8c27a" />
      {/* contraluz quente do pôr do sol */}
      <directionalLight position={[1.5, -0.4, -5]} intensity={5} color="#F0A050" />
      <Environment resolution={256} frames={1} environmentIntensity={1.4}>
        <Lightformer form="rect" intensity={3.2} position={[0, 5, 2]} scale={[8, 3, 1]} rotation-x={Math.PI / 2} />
        <Lightformer form="rect" intensity={2} position={[-5, 1, 2]} scale={[3, 5, 1]} rotation-y={Math.PI / 2} />
        <Lightformer form="rect" intensity={1.6} color="#C9A15B" position={[5, 1, -2]} scale={[3, 5, 1]} rotation-y={-Math.PI / 2} />
        <Lightformer form="ring" intensity={1.2} color="#3F8F8A" position={[0, -1, -5]} scale={4} />
      </Environment>
    </>
  );
}

export interface Rig {
  px: number;
  py: number;
  yaw: number;
  dragging: boolean;
}

/** Ponteiro (mouse), arrastar (toque/mouse) e giroscópio (onde não exige permissão) controlam a cena. */
export function useRig() {
  const gl = useThree((s) => s.gl);
  const rig = useRef<Rig>({ px: 0, py: 0, yaw: 0, dragging: false });
  useEffect(() => {
    const el = gl.domElement;
    el.style.touchAction = "pan-y";
    let lastX = 0;
    const move = (e: PointerEvent) => {
      rig.current.px = (e.clientX / window.innerWidth) * 2 - 1;
      rig.current.py = (e.clientY / window.innerHeight) * 2 - 1;
      if (rig.current.dragging) {
        rig.current.yaw += (e.clientX - lastX) * 0.012;
        lastX = e.clientX;
      }
    };
    const down = (e: PointerEvent) => { rig.current.dragging = true; lastX = e.clientX; };
    const up = () => { rig.current.dragging = false; };
    const tilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      rig.current.px = Math.max(-1, Math.min(1, e.gamma / 35));
      rig.current.py = Math.max(-1, Math.min(1, (e.beta - 45) / 35));
    };
    const needsPermission = typeof (DeviceOrientationEvent as unknown as { requestPermission?: unknown }).requestPermission === "function";
    window.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    if (!needsPermission) window.addEventListener("deviceorientation", tilt, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      window.removeEventListener("deviceorientation", tilt);
    };
  }, [gl]);
  return rig;
}
