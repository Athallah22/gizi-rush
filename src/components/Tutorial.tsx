import { useState } from "react";

const STEPS: { title: string; body: string }[] = [
  { title: "👋 Selamat datang di Gizi Rush!", body: "Game show gizi untuk SMP: 1 laptop + proyektor, kelompok berdiskusi dan menjawab bersama. Kamu sebagai fasilitator memegang semua kontrol." },
  { title: "🎮 Menu sesi berurutan", body: "Ada 5 sesi yang terbuka berurutan. Setiap kartu menunjukkan bintang ⭐ dan progres level. Selesaikan satu sesi untuk membuka berikutnya." },
  { title: "📶 Tiap sesi 5 level", body: "Setiap sesi punya Level 1–5. Selesai = jawaban sudah di-reveal agar materi tersampaikan. Keluar pakai Space aman: kembali ke sesi yang sama otomatis lanjut dari level terakhir." },
  { title: "💥 Reveal + skor sekali klik", body: "Tekan R untuk tampil/sembunyikan jawaban. Tap chips tim yang benar (atau Semua), lalu 1 klik +Skor. Ada Undo bila salah pencet." },
  { title: "🍱 Susun Piring spesial", body: "Drag makanan ke piring: skor live 0–250 dari kecocokan gizi (kalori, protein, serat, gula, lemak). Bintang naik otomatis saat piring ✅." },
  { title: "⌨️ Kontrol cepat", body: "→/← pindah soal, R reveal, Tab board, Space menu, S kasih skor, 1–6 pilih tim, M mute, Esc reset. Tekan ? kapan saja untuk bantuan." },
];

export default function Tutorial({ onClose }: { onClose: () => void }) {
  const [i, setI] = useState(0);
  const last = i === STEPS.length - 1;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="card-stage animate-pop w-full max-w-lg space-y-4 rounded-3xl p-6 text-center">
        <h2 className="text-3xl font-black text-yellow-300">{STEPS[i].title}</h2>
        <p className="text-xl text-neutral-100">{STEPS[i].body}</p>
        <div className="flex justify-center gap-2">
          {STEPS.map((_, d) => (
            <span key={d} className={`h-2 w-2 rounded-full ${d === i ? "bg-yellow-300" : "bg-white/25"}`} />
          ))}
        </div>
        <div className="flex justify-between gap-2">
          <button className="rounded-full bg-white/15 px-5 py-2 font-bold" onClick={onClose}>Lewati semua</button>
          <div className="flex gap-2">
            {i > 0 && (
              <button className="rounded-full bg-white/15 px-5 py-2 font-bold" onClick={() => setI((v) => v - 1)}>←</button>
            )}
            <button className="btn-heboh px-6 py-2" onClick={() => (last ? onClose() : setI((v) => v + 1))}>{last ? "Mulai! 🚀" : "Lanjut →"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
