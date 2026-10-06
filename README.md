# Gizi Rush

Game show edukasi gizi.

![Preview Gizi Rush](./public/UI.png)

🔗 **Demo:** https://gizi-rush.vercel.app/

> Lokal: jalankan `npm run dev` lalu buka alamat yang tampil di terminal (default Vite `http://localhost:5173`).

Acuan desain: `docs/PRD.md`, `docs/Design.md`, `docs/Architecture.md`.

## Fitur Utama

- Menu 5 sesi berurutan dengan sistem kunci (`🔒`/`⭐`/`✅`), tiap sesi 5 level
- Bank 10 soal per sesi kuis (2 per level), 5 yang tampil dipilih acak 1 per level — tiap buka sesi susunannya bisa berganti; tombol `🔀 Acak soal` di kartu sesi
- 5 sesi: Mitos/Fakta (+100), Susun Piring drag-and-drop (0–250), Food Battle (+150), Guru vs Siswa (+200), Final Rush (+500)
- Susun Piring: 27 makanan (pool 6–8 per misi berisi jebakan), 5 misi 4 Sehat 5 Sempurna + total nilai gizi live (kkal, protein, karbo, lemak, serat, gula) vs target misi; angka gizi acuan TKPI/USDA, wajib review ahli gizi
- Skor multi-tim sekali klik: tap chips tim yang benar, 1 klik award, ada `↩ Undo` anti salah tap
- Countdown 3-2-1-GO setiap buka sesi, confetti juara, sound effect synth lokal + mute
- Kontrol keyboard penuh untuk fasilitator (lihat [Kontrol](#-kontrol-fasilitator))
- Leaderboard, progress tersimpan di `localStorage` (refresh tidak menghilangkan sesi)
- 100% offline untuk game inti; AI (`🥗 Tanya Ahli` + saran piring) opsional via Vercel AI Gateway, game tetap jalan bila AI mati
- 🤖 AI: Nutrisi Coach RAG (TF-IDF + Gemini/Groq/OpenRouter, cache + fallback + sumber kutipan) — detail di `docs/AI.md`

## 🧰 Tech Stack

| Komponen | Teknologi |
|---|---|
| Bahasa | TypeScript |
| UI | React 19 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Linter | Oxlint |
| Data | JSON lokal (`src/data/`) |
| Penyimpanan | `localStorage` (tanpa backend) |

## ✅ Prasyarat

- Node.js >= 20 (disarankan versi LTS terbaru; teruji di Node.js v22)
- npm >= 10 (atau pnpm/yarn yang kompatibel)
- Browser modern (Chrome/Edge/Firefox terbaru)
- Untuk sesi kelas: 1 laptop + proyektor/layar besar

## 🚀 Instalasi & Menjalankan Lokal

```sh
git clone <url-repo-anda>
cd Gizi-Game

npm install

npm run dev
```

Buka alamat lokal yang tampil di terminal (default `http://localhost:5173`).

Konfigurasi `.env`: **tidak diperlukan** — proyek ini tanpa backend, tanpa API key, tanpa environment variable.

## 📜 Daftar Skrip

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan dev server Vite (hot reload) |
| `npm run build` | Typecheck (`tsc -b`) + build static ke `dist/` |
| `npm run preview` | Menjalankan pratinjau hasil `build` secara lokal |
| `npm run lint` | Menjalankan Oxlint |
| `node --experimental-strip-types src/features/game/scoring.check.ts` | Mengecek kebenaran rubrik skor piring |
| `npm run knowledge` | Membangun `knowledge/chunks.json` (±72 chunk dari `src/data/`) |
| `npm run eval:rag` | Evaluasi retrieval (top1/top4 + guardrail) |

## 🗂️ Struktur Folder

```text
Gizi-Game/
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── maskot-gizi.svg
│       └── food/*.svg            # pack gambar makanan (lokal, offline)
├── src/
│   ├── components/               # Quiz, TeamPicker, SessionMenu, Leaderboard, Countdown, Confetti
│   ├── rounds/SusunPiring/       # SusunPiring.tsx, Plate.tsx, DraggableFood.tsx
│   ├── features/game/            # useGame.ts, sessions.ts, quizPool.ts, scoring.ts, scoring.check.ts
│   ├── data/                     # 4× kuis 10 soal, susun-piring.json (27 makanan + 5 misi + target gizi)
│   ├── utils/                    # sound.ts (synth WebAudio), useAwardKeys.ts, aiClient.ts
│   ├── types/game.ts
│   ├── App.tsx                   # setup → menu sesi → main → result
│   ├── main.tsx
│   └── index.css                 # tema game-show + keyframes animasi
├── api/                          # Vercel Functions: health.ts, ask.ts, saran.ts
├── rag/                          # corpus, retrieve (TF-IDF), prompt, providers, cache, validate, service
├── knowledge/                    # chunks.json (generated, jangan tulis manual)
├── eval/                         # golden.json + eval-rag.ts
├── scripts/                      # build-knowledge.ts, eval-rag.ts
├── .env.example                  # AI_GATEWAY + provider + key (tanpa secret)
├── docs/                         # PRD.md, Design.md, Architecture.md, AI.md
├── package.json
└── README.md
```

## 🎮 Alur Main

```text
Setup (nama kelompok 2–6, bebas tambah/hapus)
  → Menu Sesi (5 kartu berurutan 🔒/⭐/✅)
  → klik sesi → Countdown 3-2-1-GO (Esc batal) → Main Level 1–5
  → Space = kembali Menu → semua sesi ⭐⭐⭐⭐⭐ → Result + confetti
```

Selesai per level = sudah reveal (agar momen edukasi tersampaikan). Bintang misi piring naik otomatis saat piring `✅` pertama; tombol skor tetap bisa dipakai untuk nilai parsial. Piring auto-kosong tiap ganti misi (skor tim aman).

## ⌨️ Kontrol Fasilitator

| Tombol | Fungsi |
|---|---|
| `→` / `←` | Misi/soal berikut / sebelumnya |
| `R` | Toggle reveal ↔ sembunyikan jawaban |
| `Tab` | Toggle leaderboard |
| `Space` | Kembali ke menu sesi |
| `S` | Kasih skor ke tim terpilih (di layar Quiz/Piring) |
| `1–6` | Toggle chips tim (di layar Quiz/Piring) |
| `M` | Mute |
| `Esc` | Tutup board / batalkan countdown sesi |

## 🧮 Rubrik Susun Piring (maks 250)

Skor = kecocokan total gizi piring vs target misi, live saat drop, maks 6 item anti-spam:

```text
Kelengkapan 100 + Kalori 50 + Protein 30 + Serat 20 + Gula 30 + Lemak 20
```

Makanan `junk` menghukum otomatis lewat gula/lemak/kalori yang jebol + flag `⚠️`. Tiap misi punya target sendiri (L1–L4 empat sehat, L5 4 Sehat 5 Sempurna + susu).

## 🔒 Keamanan

- Game inti tanpa backend, tanpa akun, tanpa data pribadi — tidak ada PII di `src/data/`.
- Seluruh aset game lokal, tanpa CDN.
- Input nama kelompok (max 24) dan pertanyaan AI (max 300) dirender sebagai JSX text (auto-escape, anti-XSS).
- API key LLM hanya di Vercel env (server) — tak pernah ke browser; frontend hanya panggil `/api/*`.
- `dist/`, `node_modules/`, `.env*` ter-cover `.gitignore` (kecuali `.env.example`) — jangan commit ketiganya.

## 🤖 AI (detail: `docs/AI.md`)

- Nutrisi Coach: panel `🥗 Tanya Ahli` (badge `🤖 AI` / `AI off`), RAG top-4 chunk + jawaban ber-sumber; bila tak ada di materi, jawab jujur + dilengkapi hasil web Gemini ber-link (`📚 Materi game` vs `🌐 Web`), fallback offline bila API mati/limit.
- Evaluator Piring: 1 kalimat saran saat misi `✅` (skor tetap dari Game Engine).
- Provider gratis: Gemini Flash default (gampang ganti via `LLM_PROVIDER`), cache SHA256 hemat kuota, `max_tokens` 400.
- Tanpa secret = AI nonaktif tapi game 100% jalan. Isi key di Vercel env sesuai `.env.example`.

Metrik retrieval saat ini (`npm run eval:rag`, 20 kasus + 1 guardrail + 1 web + 2 sapaan + 1 noground):

```text
retrieval top1: 20/20, top4: 20/20
greeting cases: 2 (template lokal, tanpa LLM, tanpa sumber)
noground cases: 1 (skor di bawah 0.08 → sumber materi disembunyikan)
```

Sumber materi hanya tampil bila skor chunk teratas di atas ambang relevansi 0.08; sapaan ("halo", "makasih", dsb) dijawab template lokal tanpa panggil LLM. Panel AI terkunci saat soal kuis aktif (anti bocor jawaban); saran piring tersedia otomatis saat `✅` dan manual saat gagal. `/api/*` dilindungi origin-check + rate-limit 20/menit; `/api/health` timeout 2 dtk; PWA aktif untuk offline pasca-muat pertama.

3 miss korpus diatasi web grounding (lihat `docs/AI.md §22`); jalur naik permanen: tambah sinonim di chunk atau naik ke embedding (`§12`).

## 👥 Informasi Tambahan

- Dikembangkan sebagai media edukasi gizi.
- Dokumen perancangan lengkap: `docs/PRD.md` (kebutuhan produk), `docs/Design.md` (UI/UX), `docs/Architecture.md` (arsitektur). 
