# DESIGN — Gizi Rush

## 1. Design Direction

Gizi Rush harus terasa seperti:

> **Game show + edukasi gizi + suasana kelas yang ramai.**

Bukan seperti:

> aplikasi e-learning formal.

Karakter visual:

- energetic;
- playful;
- colorful;
- modern;
- friendly;
- mudah dibaca dari proyektor.

---

# 2. Design Principle

## 2.1 Big

Elemen penting harus besar.

```text
PERTANYAAN

         SANGAT BESAR
```

Jangan membuat teks kecil karena aplikasi dilihat dari jauh.

---

## 2.2 Fast

Peserta harus langsung memahami:

```text
Apa pertanyaannya?
Apa pilihannya?
Apa yang harus dilakukan?
```

maksimal dalam beberapa detik.

---

## 2.3 Dramatic

Reveal harus menjadi bagian penting dari pengalaman.

```text
QUESTION
   ↓
COUNTDOWN
   ↓
SUSPENSE
   ↓
REVEAL
   ↓
RESULT
```

---

## 2.4 Fun

Gunakan:

- emoji;
- ilustrasi makanan;
- animasi;
- sound effect;
- countdown;
- confetti;
- efek skor.

---

# 3. Visual Theme

Tema visual:

```text
🥗 Healthy
⚡ Energetic
🎮 Game Show
🏫 Classroom
```

Gunakan bentuk:

- rounded cards;
- pill buttons;
- large typography;
- bold numbers;
- playful icons.

---

# 4. Color System

Contoh semantic colors:

```text
Primary
→ Brand / action utama

Secondary
→ Highlight

Success
→ Jawaban benar

Warning
→ Peringatan / suspense

Danger
→ Jawaban salah

Background
→ Dark / neutral

Surface
→ Card
```

Untuk proyektor, prioritaskan **kontras tinggi** daripada penggunaan banyak warna.

---

# 5. Typography

Recommended:

```text
Font Family:
Inter / Nunito Sans / system sans-serif
```

Hierarchy:

```text
H1
48–72 px

H2
36–48 px

Question
40–64 px

Option
28–40 px

Explanation
22–32 px

Score
48–72 px
```

Ukuran dapat disesuaikan berdasarkan resolusi proyektor.

---

# 6. Global Layout

```text
┌───────────────────────────────────────────────┐
│ GIZI RUSH              ROUND 1      SCORE    │
├───────────────────────────────────────────────┤
│                                               │
│                                               │
│               CONTENT AREA                    │
│                                               │
│                                               │
├───────────────────────────────────────────────┤
│              FACILITATOR AREA                 │
└───────────────────────────────────────────────┘
```

---

# 7. Operator vs Audience UI

Karena laptop terhubung ke proyektor, desain harus mempertimbangkan dua kebutuhan.

## Audience

Yang terlihat jelas:

- pertanyaan;
- pilihan;
- timer;
- leaderboard;
- animasi;
- hasil.

## Operator

Kontrol fasilitator berupa dock `fixed bottom-0` kompak agar konten game penuh di layar:

```text
[⬅️ Misi/Soal (←)] [💥 Reveal (R)] [(→) Misi/Soal] [🏆 Board (Tab)] [🏠 Menu (Space)] [Reset (Esc)] [?]
```

R = toggle reveal ↔ hide, Tab = toggle board. Header menampilkan `Level x/5` + tombol `?` semua kontrol. Picker skor: chips multi-tim + `Semua` + 1 tombol award + Undo. `Esc` = Reset game (tanpa confirm; tutup help/board/pending dulu bila terbuka).

Menu sesi: 3 kartu di baris atas, 2 kartu di baris tengah, Result full-width paling bawah; tiap kartu 🔒/⭐/✅ + progress bar + badge `Lanjut Lx ▶️` bila progres tersimpan; klik terkunci = shake. Keluar via Space aman: klik kartu yang sama otomatis lanjut dari level tersimpan (bintang 3 → Level 4).

Shortcut keyboard adalah kontrol utama:

```text
→ → Misi/Soal berikut, ← → Misi/Soal sebelumnya,
R → toggle Reveal/Hide, Tab → toggle Board,
Space → kembali Menu (posisi tersimpan), M → mute,
1-6 → toggle chips tim (dalam Quiz/Piring),
S → kasih skor (dalam Quiz/Piring),
? / H → bantuan semua kontrol, Esc → Reset game
```

Idealnya kontrol operator tidak mengganggu tampilan utama.

---

# 8. Setup Screen

```text
┌─────────────────────────────────────┐
│                                     │
│          🥗 GIZI RUSH               │
│                                     │
│       SIAP UNTUK BERMAIN?           │
│                                     │
│  Nama Kelompok (2–6, bebas, underline menyatu) │
│                                     │
│  Tutorial otomatis saat pertama buka│
│  (? buka ulang, [Lewati semua])     │
│                                     │
│  🍎  Apel        ×                  │
│  ─────────────────                  │
│  🥕  Wortel      ×                  │
│  ─────────────────                  │
│                 + Tambah kelompok   │
│                                     │
│          [ MULAI GAME ]             │
│                                     │
└─────────────────────────────────────┘
```

---

# 9. Opening Screen (tiap buka sesi)

Countdown 3-2-1-GO muncul setiap kartu sesi dibuka (bukan saat MULAI GAME), Esc membatalkan.

```text
╔══════════════════════════════════════╗
║                                      ║
║           🔥 GIZI RUSH 🔥            ║
║                                      ║
║       SIAPA PALING JAGO GIZI?        ║
║                                      ║
║             3                        ║
║             2                        ║
║             1                        ║
║                                      ║
║             GO! 🚀                   ║
║                                      ║
╚══════════════════════════════════════╝
```

---

# 10. Leaderboard

Leaderboard dibuat seperti papan skor game show.

```text
🏆 LEADERBOARD

┌────┬──────────────┬────────┐
│ #  │ KELOMPOK     │ SCORE  │
├────┼──────────────┼────────┤
│ 🥇 │ 🍎 APEL      │ 1.200  │
│ 🥈 │ 🥑 ALPUKAT   │ 1.000  │
│ 🥉 │ 🥕 WORTEL    │   850  │
│ 4  │ 🍌 PISANG    │   700  │
└────┴──────────────┴────────┘
```

Ketika posisi berubah:

```text
↑
🥑 ALPUKAT naik ke posisi 1!
```

Gunakan animasi perpindahan posisi.

---

# 11. Kuis Screen (Mitos/Fakta, Food Battle, Guru vs Siswa, Final)

```text
┌────────────────────────────────────────────┐
│ 🧠 MITOS ATAU FAKTA · Level 3/5            │
│                                            │
│ "PERNYATAAN / PERTANYAAN + OPSI A/B"       │
│                                            │
│         [ 💥 REVEAL! (R) ]                 │
│                                            │
│  💥 JAWABAN! +POIN                         │
│  Penjelasan singkat...                     │
│  [🍎][🥕][🥑][🍌] [Semua]                 │
│  [ 🏆 +Skor (n tim) (S) ] [↩ Undo]        │
│  [ 🙈 Sembunyikan (R) ]                    │
└────────────────────────────────────────────┘
```

R = toggle reveal ↔ hide. Skor: tap chips tim yang benar, 1 klik award.

---

# 12. Reveal Screen

Jawaban muncul via suspense 😱 → pop `💥 JAWABAN! +POIN` + penjelasan + chips multi-tim + Undo. R / tombol sembunyikan menutup lagi (toggle).

---

# 13. Susun Piring Screen (Drag Murni, 5 Misi 4S5S + Gizi)

```text
┌────────────────────────────────────────────┐
│ 🍱 Misi 4: Awas ada pengecoh! · Level 4/5  │
│                                            │
│        ┌──────────────────┐                │
│        │  PIRING (drop)   │                │
│        └──────────────────┘                │
│ TRAY (SVG): [makanan misi]                 │
│                                            │
│ ⭐ SKOR LIVE: 200 (maks 250)               │
│ 🔥 kkal · 🥩 protein · 🍚 karbo            │
│ 🧈 lemak · 🥬 serat · 🍬 gula              │
│ [🧺 Lengkap] [🔥][🥩][🥬][🍬][🧈]          │
│ 🎯 Target: kkal · protein · serat · gula · lemak │
│ [🍎][🥕]... [ 🏆 +Skor (S) ] [↩ Undo]     │
│ [🔄 Reset Piring]                          │
└────────────────────────────────────────────┘
```

tray → drag → piring = masuk (maks 6), piring → drag → tray = keluar. Bintang misi naik otomatis saat `✅` pertama; tombol skor untuk parsial.

---

# 14. Food Battle Screen

Pakai layout kuis (§11): pertanyaan duel A-vs-B + opsi + reveal + chips multi-tim. Poin +150/soal, 5 level.

---

# 15. Guru vs Siswa

Pakai layout kuis (§11) dengan judul dramatis 🧑‍🏫 Guru vs Siswa. Poin +200/soal, 5 level (termasuk jebakan edukatif).

---

# 16. Final Screen

Pakai layout kuis (§11) dengan judul 🔥 Final Rush. Poin +500/soal, 5 level penutup.

---

# 17. Winner Screen

Gunakan animasi kemenangan.

```text
🎉 🎉 🎉 🎉 🎉

             🏆

          JUARA 1

       🍎 KELOMPOK APEL

         SKOR AKHIR (akumulasi award)

🎉 🎉 🎉 🎉 🎉
```

Confetti dapat digunakan selama tidak membuat proyektor terlalu ramai.

---

# 18. Educational Message Screen

Setelah pemenang diumumkan, jangan langsung selesai.

Tampilkan:

```text
🧠 JANGAN LUPA!

① Makan beragam
② Perhatikan komposisi dan porsi
③ Bijak memilih makanan/minuman
④ Sesuaikan dengan kebutuhan tubuh
```

Ahli gizi kemudian menjelaskan poin tersebut.

---

# 19. Animation Guidelines

Implementasi heboh (CSS-only, `src/index.css`, hormati `prefers-reduced-motion`):

- `count-zoom` countdown 3-2-1-GO + `Countdown.tsx`;
- `pop` reveal jawaban + skor live piring + juara;
- `float-up` angka `+poin` saat tambah skor;
- `slide-in` stagger leaderboard;
- `plate-bump` saat drop makanan, `shake` untuk flag junk;
- `confetti-fall` via `Confetti.tsx` (CSS-only, tanpa dep);
- `glow-pulse` judul game-show.

Hindari animasi berlebihan pada:

- teks penjelasan;
- informasi edukasi;
- navigasi operator.

---

# 20. Sound Design

Implementasi: synth WebAudio lokal via `src/utils/sound.ts` (nol file wav, tetap offline): `start/tick/go/reveal/correct/drop/score/winner` + tombol mute `🔊/🔇` tersimpan di `localStorage gizi-rush-sound`.

---

# 21. UX Rule untuk Fasilitator

Fasilitator harus dapat menjalankan game hanya dengan beberapa tombol utama.

Primary controls (dock bawah):

```text
[⬅️ Misi/Soal (←)] [💥 Reveal (R)] [(→) Misi/Soal]
[🏆 Board (Tab)] [🏠 Menu (Space)] [Reset (Esc)] [?]
```

Jangan membuat fasilitator harus membuka menu yang dalam.

---

# 22. Keyboard Shortcut

Kontrol final (terbaik, tanpa H/N/P/L):

```text
→ → Misi/Soal berikut
← → Misi/Soal sebelumnya
R → toggle Reveal/Hide
Tab → toggle Board
Space → kembali Menu sesi (posisi tersimpan)
S → kasih skor ke tim terpilih (dalam Quiz/Piring)
M → mute, 1-6 → toggle chips tim (dalam Quiz/Piring)
? / H → bantuan semua kontrol
Esc → Reset game (tutup help/board/pending dulu bila terbuka)
```

---

# 23. Responsive Design

Prioritas:

```text
1920 × 1080
     ↓
1280 × 720
     ↓
Laptop screen
```

Target utama adalah layar landscape.

Mobile bukan target utama MVP.

---

# 24. Projection Safety

Karena aplikasi digunakan dengan proyektor:

### Hindari

- teks kecil;
- abu-abu terlalu terang;
- gradient berlebihan;
- informasi terlalu padat;
- animasi yang terlalu cepat;
- tombol kecil.

### Prioritaskan

- font besar;
- kontras tinggi;
- whitespace;
- visual sederhana;
- layout konsisten.

---

# 25. UX State

Alur status aplikasi:

```text
SETUP (nama tim)
  │
  ▼
MENU (5 kartu 🔒/⭐/✅, countdown tiap buka sesi)
  │
  ▼
PLAYING (Level 1–5 per sesi)
  │
  ├─ Kuis: QUESTION → SUSPENSE → REVEAL ⇄ HIDE → EXPLANATION → AWARD (multi-tim + Undo) → NEXT
  └─ Piring: DRAG → SKOR LIVE GIZI → ✅ AUTO-BINTANG → AWARD (parsial boleh)
  │
  ▼
FINISHED (semua sesi ⭐⭐⭐⭐⭐ → confetti + juara)
```

---

# 26. Design Rule Utama

Setiap layar harus menjawab tiga pertanyaan:

### 1. Apa yang sedang terjadi?

Contoh:

> MITOS ATAU FAKTA

### 2. Apa yang harus dilakukan peserta?

Contoh:

> PILIH JAWABAN

### 3. Apa yang terjadi setelahnya?

Contoh:

> REVEAL

Jika peserta tidak dapat memahami ketiganya dalam beberapa detik, UI perlu disederhanakan.

---

# 27. Experience Goal

Pengalaman ideal:

```text
👀 Lihat pertanyaan
      ↓
🤔 "Hmm..."
      ↓
🗣️ Diskusi
      ↓
🙋 "FAKTA!"
      ↓
⏳ Suspense
      ↓
💥 REVEAL!
      ↓
😂 Reaksi
      ↓
🧑‍⚕️ Ahli gizi menjelaskan
      ↓
🏆 Skor berubah
      ↓
🔥 "Lanjut!"
```

---

# 28. Final Design Principle

Gizi Rush harus membuat peserta merasa:

> "Saya sedang bermain game."

Tetapi setelah satu sesi selesai:

> "Oh, ternyata saya baru belajar banyak tentang gizi."

Itulah tujuan utama desain Gizi Rush.