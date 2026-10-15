import { waLink } from "../lib/whatsapp";
import { IconWhatsapp } from "./Icons";

export function WhatsAppFloat() {
  return (
    <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Falar com a Luxo Country no WhatsApp" className="fixed bottom-4 right-4 z-40 grid h-12 w-12 sm:bottom-5 sm:right-5 sm:h-14 sm:w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(0,0,0,.6)] transition-transform hover:scale-110">
      <span aria-hidden className="absolute inset-0 rounded-full bg-[#25D366] motion-safe:animate-pulseRing" />
      <IconWhatsapp width={28} height={28} className="relative" />
    </a>
  );
}
