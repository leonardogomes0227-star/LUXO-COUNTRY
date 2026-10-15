/** Selo da Luxo Country: círculo off-white, chapéu, cactos, "Luxo" em script e "COUNTRY". Recriação vetorial; trocar por arquivo oficial se o cliente enviar. */
export function Logo({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Selo Luxo Country" className={className}>
      <circle cx="60" cy="60" r="58" fill="#F4EDE0" stroke="#2a1a10" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="52" fill="none" stroke="#5A3A26" strokeWidth="1" strokeDasharray="2.5 2.5" />
      {/* chapéu */}
      <path d="M26 46c10 6 22 8 34 8s24-2 34-8c-4 8-18 12-34 12S30 54 26 46Z" fill="#1a1411" />
      <path d="M42 46c0-12 5-20 18-20s18 8 18 20c-6 3-12 4-18 4s-12-1-18-4Z" fill="#1a1411" />
      <path d="M42 43c6 2 12 3 18 3s12-1 18-3" stroke="#C9A15B" strokeWidth="2.2" fill="none" />
      {/* cactos */}
      <g fill="#2a1a10">
        <path d="M22 78h5V64a2.5 2.5 0 0 1 5 0v14h2V56a2.5 2.5 0 0 1 5 0v22h3v4H22Z" transform="translate(-4 0) scale(.9)" />
        <path d="M82 78h5V64a2.5 2.5 0 0 1 5 0v14h2V56a2.5 2.5 0 0 1 5 0v22h3v4H82Z" transform="translate(4 0) scale(.9)" />
      </g>
      <text x="60" y="76" textAnchor="middle" fontFamily="'Great Vibes', cursive" fontSize="30" fill="#1a1411">Luxo</text>
      <text x="60" y="92" textAnchor="middle" fontFamily="'Playfair Display', serif" fontWeight="700" fontSize="10.5" letterSpacing="3.2" fill="#1a1411">COUNTRY</text>
    </svg>
  );
}
