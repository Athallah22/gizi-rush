import type { Team } from "../types/game";

export default function Leaderboard({ teams }: { teams: Team[] }) {
  const sorted = [...teams].sort((a, b) => b.score - a.score);
  const medal = ["🥇", "🥈", "🥉"];
  return (
    <div className="card-stage mx-auto max-w-2xl rounded-3xl p-6 text-center shadow-2xl">
      <h2 className="title-glow text-5xl font-black text-yellow-300">🏆 LEADERBOARD</h2>
      <ul className="mt-4 space-y-3 text-2xl">
        {sorted.map((t, i) => (
          <li
            key={t.id}
            style={{ animationDelay: `${i * 0.12}s` }}
            className={`animate-slide-in flex items-center justify-between rounded-2xl px-4 py-3 font-bold ${i === 0 ? "scale-105 bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg" : "bg-white/10"}`}
          >
            <span>{medal[i] ?? `${i + 1}`} {t.icon} {t.name.toUpperCase()}</span>
            <b className="text-3xl">{t.score.toLocaleString("id-ID")}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}
