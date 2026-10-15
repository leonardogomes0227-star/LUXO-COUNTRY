/** Selo oficial da Luxo Country (public/images/logo.jpg). CONFIRMAR: pedir ao cliente o arquivo em alta resolução (PNG/SVG). */
export function Logo({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src="/images/logo.jpg"
      width={size}
      height={size}
      alt="Selo Luxo Country, chapéu de cowboy"
      decoding="async"
      className={`rounded-full ${className}`}
    />
  );
}
