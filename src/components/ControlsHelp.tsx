const GLOBAL: [string, string][] = [
  ["→ / ←", "Misi/soal berikut / sebelumnya"],
  ["R", "Tampilkan / sembunyikan jawaban (toggle)"],
  ["Tab", "Tampilkan / sembunyikan leaderboard (toggle)"],
  ["Space", "Kembali ke menu sesi (posisi tersimpan)"],
  ["M", "Mute / unmute"],
  ["Esc", "Reset game"],
  ["H", "Buka / tutup bantuan ini"],
];

const CONTEXT: [string, string][] = [
  ["S", "Kasih skor ke tim terpilih (layar Quiz/Piring)"],
  ["1–6", "Pilih / lepas tim (layar Quiz/Piring)"],
];

export default function ControlsHelp({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div className="card-stage animate-pop max-h-[85vh] w-full max-w-lg space-y-3 overflow-y-auto rounded-3xl p-6 text-left" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black text-yellow-300">🎮 Semua Kontrol</h2>
          <button className="rounded-full bg-white/15 px-3 py-1 font-bold" onClick={onClose}>×</button>
        </div>
        <div>
          <p className="mb-1 font-bold text-neutral-300">Global (di mana saja)</p>
          <ul className="space-y-1 text-lg">
            {GLOBAL.map(([k, v]) => (
              <li key={k} className="flex gap-2"><kbd className="shrink-0 rounded bg-white/15 px-2 py-0.5 font-bold">{k}</kbd><span>{v}</span></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-1 font-bold text-neutral-300">Konteks Quiz / Susun Piring</p>
          <ul className="space-y-1 text-lg">
            {CONTEXT.map(([k, v]) => (
              <li key={k} className="flex gap-2"><kbd className="shrink-0 rounded bg-white/15 px-2 py-0.5 font-bold">{k}</kbd><span>{v}</span></li>
            ))}
          </ul>
        </div>
        <button className="btn-heboh w-full py-3 text-xl" onClick={onClose}>Siap! (Esc/?)</button>
      </div>
    </div>
  );
}
