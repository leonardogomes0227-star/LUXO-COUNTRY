/** Selo circular girando, com texto em volta, no estilo de etiqueta de couro. */
export function Selo({ texto, className = "" }: { texto: string; className?: string }) {
  return (
    <div aria-hidden className={`relative grid place-items-center ${className}`}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full motion-safe:animate-[spin_22s_linear_infinite]">
        <defs>
          <path id="selo-circ" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
        </defs>
        <text fontSize="11.5" fontWeight="600" letterSpacing="2.6" textLength="486" lengthAdjust="spacing" fill="currentColor" fontFamily="Inter Variable, sans-serif">
          <textPath href="#selo-circ">{texto}</textPath>
        </text>
      </svg>
      <svg viewBox="0 0 24 24" className="h-1/4 w-1/4 text-sol"><path fill="currentColor" d="m12 2 2.6 6.4 6.9.5-5.3 4.5 1.7 6.7L12 16.4 6.1 20.1l1.7-6.7L2.5 8.9l6.9-.5L12 2Z" /></svg>
    </div>
  );
}
