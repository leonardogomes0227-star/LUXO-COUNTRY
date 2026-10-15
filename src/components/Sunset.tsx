import { motion, useTransform, type MotionValue } from "framer-motion";

const VB = "0 0 1600 1000";
const camada = "absolute inset-0 h-full w-full";

const DUST = Array.from({ length: 26 }, (_, i) => ({
  x: (i * 61) % 100,
  y: 20 + ((i * 37) % 70),
  r: 1 + (i % 3) * 0.9,
  d: 5 + (i % 6) * 1.6,
  o: 0.2 + (i % 4) * 0.12,
}));

/** Cena de pôr do sol no campo, em camadas com parallax: céu, sol, serras, pasto com cerca e moinho, poeira. */
export function Sunset({ progress }: { progress: MotionValue<number> }) {
  const ySol = useTransform(progress, [0, 1], [0, 160]);
  const yLonge = useTransform(progress, [0, 1], [0, 90]);
  const yMeio = useTransform(progress, [0, 1], [0, 45]);
  const yPerto = useTransform(progress, [0, 1], [0, -20]);
  const yPo = useTransform(progress, [0, 1], [0, -180]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg viewBox={VB} preserveAspectRatio="xMidYMax slice" className={camada}>
        <defs>
          <linearGradient id="ss-ceu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0E0C0A" />
            <stop offset=".34" stopColor="#24130b" />
            <stop offset=".56" stopColor="#5c2914" />
            <stop offset=".7" stopColor="#9C4A2B" />
            <stop offset=".8" stopColor="#d4813f" />
            <stop offset=".86" stopColor="#E9A85A" />
          </linearGradient>
        </defs>
        <rect width="1600" height="1000" fill="url(#ss-ceu)" />
      </svg>

      <motion.svg style={{ y: ySol }} viewBox={VB} preserveAspectRatio="xMidYMax slice" className={camada}>
        <defs>
          <radialGradient id="ss-sol" cx=".5" cy=".42" r=".6">
            <stop offset="0" stopColor="#FFF1C9" />
            <stop offset=".55" stopColor="#F8C774" />
            <stop offset="1" stopColor="#EC9446" />
          </radialGradient>
          <radialGradient id="ss-brilho" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#F6C06A" stopOpacity=".55" />
            <stop offset=".45" stopColor="#E9A85A" stopOpacity=".18" />
            <stop offset="1" stopColor="#E9A85A" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="860" cy="700" r="520" fill="url(#ss-brilho)" />
        <circle cx="860" cy="700" r="165" fill="url(#ss-sol)" />
      </motion.svg>

      <motion.svg style={{ y: yLonge }} viewBox={VB} preserveAspectRatio="xMidYMax slice" className={camada}>
        <path d="M0 735 C120 700 210 690 320 712 C430 734 520 660 640 668 C760 676 820 726 930 718 C1050 708 1120 650 1250 664 C1380 678 1480 720 1600 702 V1000 H0Z" fill="#7a3519" opacity=".8" />
      </motion.svg>

      <motion.svg style={{ y: yMeio }} viewBox={VB} preserveAspectRatio="xMidYMax slice" className={camada}>
        <path d="M0 790 C160 756 300 772 440 780 C600 790 700 742 860 750 C1020 758 1120 800 1280 784 C1420 770 1520 752 1600 760 V1000 H0Z" fill="#41200f" />
      </motion.svg>

      <motion.svg style={{ y: yPerto }} viewBox={VB} preserveAspectRatio="xMidYMax slice" className={camada}>
        <g fill="#140c08">
          <path d="M0 842 C240 818 520 836 800 830 C1080 824 1340 812 1600 826 V1000 H0Z" />
          {/* cerca */}
          {Array.from({ length: 13 }, (_, i) => 40 + i * 58).map((x) => (
            <rect key={x} x={x} y={792 - (x % 3) * 2} width="7" height="58" rx="1.5" />
          ))}
          <path d="M40 806 L740 800 M40 826 L740 822" stroke="#140c08" strokeWidth="3" fill="none" />
          {/* moinho */}
          <g transform="translate(1290 600)">
            <path d="M-4 0 L-26 236 H26 L4 0Z" />
            <path d="M-20 160 L20 160 M-14 100 L14 100 M-24 210 L18 120 M24 210 L-18 120" stroke="#140c08" strokeWidth="4" />
            <g>
              {Array.from({ length: 12 }, (_, i) => (
                <path key={i} d="M0 0 L-7 -72 L7 -72Z" transform={`rotate(${i * 30})`} />
              ))}
              <circle r="9" />
            </g>
            <path d="M6 -4 L70 -14 L70 6Z" />
          </g>
          {/* cacto */}
          <path d="M1480 846 V744 a12 12 0 0 1 24 0 V846Z M1456 790 a9 9 0 0 1 18 0 v24 h12 v14 h-30Z M1514 772 a9 9 0 0 1 18 0 v40 h-30 v-14 h12Z" />
        </g>
      </motion.svg>

      <motion.div style={{ y: yPo }} className="absolute inset-0">
        {DUST.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#F8D9A0] motion-safe:animate-pulse"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.r * 2, height: p.r * 2, opacity: p.o, animationDuration: `${p.d}s`, boxShadow: "0 0 8px 1px rgba(248,217,160,.6)" }}
          />
        ))}
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-carvao via-carvao/75 to-transparent lg:h-1/2 lg:via-carvao/60" />
    </div>
  );
}
