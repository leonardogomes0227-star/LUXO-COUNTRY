/** Divisor de pesponto (costura) entre seções de cor diferente. */
export function Stitch({ tone = "dark" }: { tone?: "dark" | "cream" }) {
  return (
    <div aria-hidden className={`px-5 py-1 ${tone === "dark" ? "bg-carvao" : "bg-creme"}`}>
      <svg width="100%" height="8" className="block">
        <line x1="0" y1="4" x2="100%" y2="4" stroke={tone === "dark" ? "#C9A15B" : "#5A3A26"} strokeWidth="2" strokeDasharray="9 7" strokeLinecap="round" opacity=".7" />
      </svg>
    </div>
  );
}
