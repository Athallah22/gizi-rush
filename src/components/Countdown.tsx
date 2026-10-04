import { useEffect, useState } from "react";
import { sfx } from "../utils/sound";

const STEPS = ["3", "2", "1", "GO! 🚀"];

export default function Countdown({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (i >= STEPS.length) {
      onDone();
      return;
    }
    sfx[i < 3 ? "tick" : "go"]();
    const t = setTimeout(() => setI((v) => v + 1), i < 3 ? 620 : 800);
    return () => clearTimeout(t);
  }, [i, onDone]);

  if (i >= STEPS.length) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div key={i} className="count-zoom title-glow text-[10rem] font-black text-yellow-300">
        {STEPS[i]}
      </div>
    </div>
  );
}
