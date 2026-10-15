import { motion, useTransform, type MotionValue } from "framer-motion";

const DUST = Array.from({ length: 22 }, (_, i) => ({
  x: (i * 47) % 100,
  y: (i * 29) % 90,
  r: 1 + (i % 3) * 0.8,
  d: 6 + (i % 5) * 2,
  o: 0.18 + (i % 4) * 0.08,
}));

/** Camadas de parallax: poeira, silhuetas de cavalo e cactos. Cada camada anda numa velocidade diferente. */
export function Parallax({ progress }: { progress: MotionValue<number> }) {
  const yDust = useTransform(progress, [0, 1], [0, -160]);
  const yHorse = useTransform(progress, [0, 1], [0, -70]);
  const yCactus = useTransform(progress, [0, 1], [0, 40]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div style={{ y: yDust }} className="absolute inset-0">
        {DUST.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-ouro motion-safe:animate-pulse"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.r * 2, height: p.r * 2, opacity: p.o, animationDuration: `${p.d}s` }}
          />
        ))}
      </motion.div>

      <motion.svg style={{ y: yHorse }} viewBox="0 0 240 160" className="absolute bottom-6 left-[-8%] w-[70%] max-w-[560px] text-couro opacity-30 lg:left-[44%] lg:w-[28%]">
        <g fill="currentColor">
          <path d="M44 66C46 54 62 50 80 52c20 4 38 2 54-2 12-6 20-20 30-32l6-8 5 7 3 3c8 12 18 26 22 34 2 4-2 8-8 6l-12-10c-4-2-8 2-12 6-4 6-8 12-12 20-2 8-2 16-4 24l2 40-8 2-2-30-4-12c-10 4-40 4-54 0l-2 12 4 28-8 2-6-30-8-12c-8-8-16-20-22-34Z" />
          <path d="M130 100l6 38-8 2-6-36ZM96 100l4 36-8 2-4-38Z" opacity=".7" />
          <path d="M44 66C30 70 22 90 26 120c6-20 12-32 22-40Z" />
        </g>
      </motion.svg>

      <motion.svg style={{ y: yCactus }} viewBox="0 0 100 100" className="absolute -right-2 bottom-0 w-32 text-turquesa opacity-25 sm:w-44 lg:w-56">
        <g fill="currentColor">
          <path d="M44 100V28a7 7 0 0 1 14 0v72Z" />
          <path d="M26 58a5.5 5.5 0 0 1 11 0v18H26ZM26 70h18v8H26Z" />
          <path d="M64 46a5.5 5.5 0 0 1 11 0v24H64ZM58 64h17v8H58Z" />
        </g>
      </motion.svg>
      <motion.svg style={{ y: yCactus }} viewBox="0 0 100 100" className="absolute -left-4 bottom-0 hidden w-28 text-turquesa opacity-20 sm:block lg:w-40">
        <g fill="currentColor">
          <path d="M44 100V34a7 7 0 0 1 14 0v66Z" />
          <path d="M28 62a5 5 0 0 1 10 0v14H28ZM28 72h16v7H28Z" />
        </g>
      </motion.svg>
    </div>
  );
}
