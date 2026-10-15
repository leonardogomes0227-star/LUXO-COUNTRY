import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AVISOS } from "../data/content";

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setI((n) => (n + 1) % AVISOS.length), 4000);
    return () => window.clearInterval(t);
  }, []);
  return (
    <div className="relative z-[51] flex h-9 items-center justify-center overflow-hidden bg-couro text-xs font-semibold tracking-wide text-creme sm:text-[13px]" role="status" aria-live="off">
      <AnimatePresence mode="wait">
        <motion.p key={i} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.3 }}>
          {AVISOS[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
