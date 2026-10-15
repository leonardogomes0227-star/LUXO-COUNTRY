/** Chapéu em SVG: hero estático quando o 3D não está disponível e enquanto ele carrega. */
export function HatIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 300" role="img" aria-label="Chapéu de cowboy preto com faixa de couro e fivela dourada" className={className}>
      <defs>
        <linearGradient id="hi-felt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a302a" />
          <stop offset="1" stopColor="#0e0c0a" />
        </linearGradient>
        <linearGradient id="hi-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0d089" />
          <stop offset="1" stopColor="#a67a33" />
        </linearGradient>
        <radialGradient id="hi-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#C9A15B" stopOpacity=".28" />
          <stop offset="1" stopColor="#C9A15B" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="210" cy="170" rx="200" ry="130" fill="url(#hi-glow)" />
      {/* aba */}
      <path d="M18 168c26 40 106 62 192 62s166-22 192-62c-12-12-34-9-48 4-38 20-90 28-144 28S104 192 66 172c-14-13-36-16-48-4Z" fill="url(#hi-felt)" stroke="#5a4a3e" strokeWidth="1.5" />
      {/* copa */}
      <path d="M106 172c-4-62 10-118 54-132 22-8 40 8 50 6 10 2 28-14 50-6 44 14 58 70 54 132-30 18-78 24-104 24s-74-6-104-24Z" fill="url(#hi-felt)" stroke="#5a4a3e" strokeWidth="1.5" />
      <path d="M210 46c-4 24-4 50 0 78" stroke="#000" strokeOpacity=".55" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M170 60c-14 26-18 60-16 92" stroke="#fff" strokeOpacity=".1" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* faixa */}
      <path d="M107 150c32 16 74 22 103 22s71-6 103-22l1 24c-32 18-74 24-104 24s-72-6-104-24l1-24Z" fill="#2a1a10" />
      <path d="M109 156c32 14 72 20 101 20s69-6 101-20M110 190c32 14 70 20 100 20s68-6 100-20" stroke="#d8c08a" strokeWidth="1.5" strokeDasharray="5 4" fill="none" />
      {/* fivela */}
      <rect x="186" y="156" width="48" height="36" rx="4" fill="url(#hi-gold)" />
      <rect x="194" y="163" width="32" height="22" rx="2" fill="#2a1a10" opacity=".85" />
      <rect x="203" y="168" width="14" height="12" rx="1.5" fill="url(#hi-gold)" />
    </svg>
  );
}
