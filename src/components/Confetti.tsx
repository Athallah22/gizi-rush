const COLORS = ["#ffd54a", "#ff5a5a", "#4ade80", "#38bdf8", "#c084fc", "#fb923c", "#f472b6"];

const PIECES = Array.from({ length: 70 }, (_, i) => ({
  left: (i * 97 + 13) % 100,
  delay: ((i * 37) % 30) / 10,
  dur: 2.6 + ((i * 53) % 20) / 10,
  size: 8 + ((i * 29) % 10),
  color: COLORS[i % COLORS.length],
  round: i % 3 === 0,
}));

export default function Confetti() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {PIECES.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.round ? p.size : p.size * 0.5,
            background: p.color,
            borderRadius: p.round ? "50%" : "2px",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
