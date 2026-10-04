# PRD — Gizi Rush

## 1. Informasi Produk

| Item | Detail |
|---|---|
| Nama Produk | Gizi Rush |
| Jenis | Interactive Educational Web Game |
| Tema | Edukasi Gizi |
| Target Utama | Siswa SMP |
| Target Sekunder | Guru |
| Operator | Ahli Gizi / Fasilitator |
| Perangkat | 1 Laptop |
| Output | Proyektor / Layar Besar |
| Mode | Multiplayer kelompok secara offline |
| Platform | Web Browser |
| Internet | Tidak wajib |
| Durasi | ±30–45 menit |
| Bahasa | Bahasa Indonesia |

---

# 2. Latar Belakang

Edukasi gizi kepada siswa SMP sering disampaikan dalam bentuk presentasi atau penyuluhan satu arah. Metode tersebut dapat membuat peserta kurang aktif dan sulit mempertahankan perhatian.

Gizi Rush dirancang sebagai permainan edukatif yang menjadikan sesi edukasi gizi lebih interaktif.

Permainan tidak dimainkan menggunakan perangkat masing-masing siswa.

Satu laptop milik ahli gizi digunakan sebagai:

- pengendali permainan;
- sumber pertanyaan;
- pengatur ronde;
- pencatat skor;
- pemicu animasi;
- media pembelajaran.

Laptop kemudian ditampilkan melalui proyektor sehingga seluruh siswa dan guru dapat melihat permainan.

Peserta dibagi menjadi beberapa kelompok dan berkompetisi melalui diskusi, teriakan, pilihan jawaban, serta tantangan antarkelompok.

---

# 3. Tujuan Produk

## 3.1 Tujuan Utama

Membuat media edukasi gizi yang:

1. interaktif;
2. mudah dimainkan dalam kelompok;
3. dapat dijalankan oleh satu fasilitator;
4. menarik untuk siswa SMP;
5. tetap memiliki nilai edukasi;
6. dapat dimainkan tanpa perangkat siswa;
7. dapat digunakan menggunakan proyektor.

## 3.2 Tujuan Pembelajaran

Setelah mengikuti permainan, peserta diharapkan mampu:

- mengenali beberapa mitos dan fakta mengenai gizi;
- memahami prinsip dasar piring makan;
- membedakan pilihan makanan/minuman berdasarkan konteks gizi;
- memahami bahwa makanan perlu dilihat dari kandungan dan porsinya;
- mengingat beberapa pesan utama mengenai pola makan sehat.

---

# 4. Prinsip Permainan

Core loop permainan:

```text
TERIAK
   ↓
PILIH
   ↓
PENASARAN
   ↓
REVEAL
   ↓
KETAWA / REAKSI
   ↓
PENJELASAN AHLI GIZI
   ↓
LANJUT
```

Permainan harus terasa seperti acara kuis di depan kelas, bukan seperti aplikasi ujian.

---

# 5. Target Pengguna

## 5.1 Siswa

Karakteristik:

- siswa SMP;
- bermain dalam kelompok;
- melihat layar proyektor;
- tidak menggunakan perangkat pribadi;
- membutuhkan permainan yang cepat dan mudah dipahami.

Kebutuhan:

- pertanyaan yang menarik;
- kompetisi antarkelompok;
- visual yang jelas;
- feedback cepat;
- kesempatan untuk bereaksi bersama.

---

## 5.2 Guru

Guru berfungsi sebagai:

- peserta permainan;
- pendamping siswa;
- kompetitor dalam ronde tertentu;
- bagian dari suasana permainan.

Guru tidak membutuhkan perangkat tambahan.

---

## 5.3 Ahli Gizi / Fasilitator

Fasilitator merupakan pengguna utama aplikasi.

Fasilitator dapat:

- memulai permainan;
- menambah/menghapus kelompok (2–6, tanpa tentukan jumlah di awal);
- mengubah nama kelompok;
- memulai ronde;
- memilih pertanyaan;
- mencatat jawaban;
- memberikan skor;
- menampilkan jawaban;
- melihat penjelasan;
- mengontrol permainan;
- mengubah skor jika diperlukan;
- mengakhiri permainan.

---

# 6. Struktur Permainan

```text
SETUP → MENU SESI (5 kartu berurutan 🔒/⭐/✅)
  → MAIN (tiap sesi 5 level) → Space = kembali Menu
  → semua sesi ⭐⭐⭐⭐⭐ → RESULT
```

Sesi kebuka berurutan; sesi berikut hanya jika sesi sebelumnya `completed >= 5`. Selesai per level = sudah reveal agar edukasi ahli gizi tersampaikan. Susun Piring: 5 misi 4S5S + nilai gizi live, piring auto-kosong tiap ganti misi.

---

# 7. Game Mode

## 7.1 Opening

### Tujuan

Membangun energi sebelum permainan dimulai.

### Alur

1. Ahli gizi membuka aplikasi.
2. Memasukkan nama kelompok (2–6, tambah/hapus bebas, input underline menyatu).
3. Menekan MULAI GAME langsung ke Menu Sesi (tanpa countdown).
4. Countdown 3-2-1-GO muncul setiap kartu sesi dibuka (Esc membatalkan).
5. Permainan dimulai di Level 1/5.

### Contoh kelompok (dinamis 2–6, ikon 🍎🥕🥑🍌🍇🍉)

```text
🍎 Apel
🥕 Wortel
🥑 Alpukat
🍌 Pisang
```

---

# 8. Ronde 1 — Mitos atau Fakta

## Tujuan

Menguji pengetahuan dasar peserta mengenai informasi gizi.

## Gameplay

Sistem menampilkan sebuah pernyataan.

Contoh:

> "Sarapan dapat membantu memenuhi kebutuhan energi untuk memulai aktivitas."

Pilihan:

```text
[ MITOS ]       [ FAKTA ]
```

Kelompok berdiskusi.

Ahli gizi kemudian mengklik jawaban sesuai keputusan peserta.

### Setelah reveal

Sistem menampilkan:

```text
✓ FAKTA!

Penjelasan:
Sarapan dapat menjadi salah satu kesempatan
untuk memenuhi kebutuhan energi dan zat gizi
sebelum memulai aktivitas.

+100 POINT
```

Ahli gizi dapat memberikan penjelasan tambahan.

---

# 9. Ronde 2 — Susun Piring (Drag Murni)

## Tujuan

Mengenalkan konsep komposisi makanan dalam satu piring.

## Gameplay

Layar menampilkan tray makanan dan satu piring kosong.

Contoh:

```text
TRAY: 🍚 🍗 🥬 🍎 🍟 🧋 🍳

        ┌──────────────┐
        │    PIRING    │
        └──────────────┘
```

Peserta berdiskusi, ahli gizi drag gambar makanan dari tray ke piring memakai kursor.

Aturan drag murni:

- drag dari tray → piring untuk memasukkan;
- drag balik dari piring → tray untuk mengeluarkan;
- tanpa tombol [ CEK PIRING ], skor live saat drop.

### Rubrik Skor (0–250, dari jumlah gizi)

```text
Kelengkapan 100 + Kalori 50 + Protein 30 + Serat 20 + Gula 30 + Lemak 20
```

Skor = kecocokan total gizi piring vs target misi, live saat drop, maks 6 item anti-spam.

Makanan `junk` (mis. 🍟 🧋) menghukum otomatis via gula/lemak/kalori jebol + flag `⚠️`.

### Output

```text
PIRING KAMU (Level 1)

🍚  🥬  🍗  🍎

Skor live: 250 ✅

🔥 460 kkal (400–550) ✓ +50
🥩 31g protein (≥25g) ✓ +30
...

Ahli gizi menjelaskan...
```

---

# 10. Ronde 3 — Food Battle

## Tujuan

Mengajarkan peserta untuk memperhatikan karakteristik makanan/minuman.

## Gameplay

Dua pilihan ditampilkan.

```text
        FOOD BATTLE

       🧋        🥛
   Minuman A   Minuman B

        VS
```

Peserta memilih berdasarkan pertanyaan yang diberikan.

Contoh:

> "Mana yang perlu lebih diperhatikan konsumsinya jika diminum setiap hari?"

Peserta memilih.

Kemudian sistem melakukan reveal.

### Reveal

```text
💥 REVEAL!

Minuman A

Alasan:
Perhatikan kandungan gula dan frekuensi
konsumsi minuman tersebut.

+150 POINT
```

Penjelasan tetap diberikan oleh ahli gizi.

---

# 11. Ronde 4 — Guru vs Siswa

## Tujuan

Menciptakan puncak interaksi sosial dan humor.

## Gameplay

Guru dan siswa diberikan pertanyaan yang sama.

Contoh:

```text
        GURU 🧑‍🏫
           VS
        SISWA 👨‍🎓

Siapa yang lebih cepat?
```

Fasilitator menentukan siapa yang menjawab terlebih dahulu.

Jawaban kemudian direveal.

### Variasi

- Guru mendapatkan pertanyaan sulit.
- Siswa mendapatkan pertanyaan sulit.
- Pertanyaan bonus.
- Pertanyaan jebakan yang tetap edukatif.
- "Guru yakin?"
- "Siswa yakin?"

Tujuannya bukan mempermalukan peserta, tetapi menciptakan suasana kompetitif dan menyenangkan.

---

# 12. Final Round

Final menjadi ronde dengan nilai terbesar.

Contoh:

```text
🔥 FINAL RUSH 🔥

Pertanyaan terakhir bernilai

       +500 POINT
```

Kelompok berdiskusi.

Setelah jawaban diberikan:

```text
3...
2...
1...

REVEAL!
```

Skor kemudian diperbarui.

---

# 13. Scoring System

Contoh sistem skor:

| Aktivitas | Poin |
|---|---:|
| Mitos/Fakta | +100 |
| Susun Piring | 0–250 (skor = kecocokan gizi vs target, live saat drop) |
| Food Battle | +150 |
| Guru vs Siswa | +200 |
| Final | +500 |

Kategori `junk` menghukum otomatis via gula/lemak/kalori jebol + flag `⚠️`, tanpa penalti khusus.
Maks 6 item per piring anti-spam. Skor hanya via award multi-tim + `↩ Undo` 1 langkah (tanpa tombol bonus/edit manual).

## Sistem Skor Multi-Tim (1 klik)

Fasilitator tap chips tim yang benar (`1-4` / tap / `Semua`), lalu 1 klik `🏆 + Skor (S)`: semua tim kepilih dapat poin sama. Ada `↩ Undo` 1 langkah anti salah tap. Pilihan di-clear otomatis habis award anti klik ganda.

## Rubrik Susun Piring (maks 250)

```text
Kelengkapan 100 (proporsional per kategori wajib misi)
+ Kalori masuk range 50 + Protein ≥ min 30 + Serat ≥ min 20
+ Gula ≤ max 30 + Lemak ≤ max 20
```

Biner per komponen agar jelas di proyektor. Tiap misi punya target sendiri (L1–L4 4S, L5 4S5S + susu). Bintang misi piring naik otomatis saat `✅` pertama per level (tanpa klik skor); tombol skor tetap untuk parsial.

---

# 14. Leaderboard

Leaderboard ditampilkan setelah ronde tertentu.

Contoh:

```text
🏆 LEADERBOARD

1. 🍎 APEL       1.150
2. 🥑 ALPUKAT      950
3. 🥕 WORTEL       800
4. 🍌 PISANG       650
```

Leaderboard tidak harus muncul setiap pertanyaan.

Lebih baik digunakan untuk menciptakan suspense.

---

# 15. Content Management

Versi awal tidak membutuhkan CMS.

Pertanyaan dan makanan disimpan dalam file JSON.

Contoh mitos/fakta:

```json
{
  "id": "mf-001",
  "category": "mitos_fakta",
  "statement": "Contoh pernyataan gizi",
  "answer": true,
  "explanation": "Penjelasan singkat...",
  "points": 100
}
```

Contoh susun piring (drag murni):

```json
{
  "id": "nasi",
  "label": "Nasi",
  "category": "makanan-pokok",
  "image": "./images/food/nasi.svg",
  "gizi": { "kalori": 175, "protein_g": 4, "karbo_g": 38, "lemak_g": 0, "serat_g": 1, "gula_g": 0 }
}
```

Kategori makanan `susun_piring`: `makanan-pokok | lauk | sayur | buah | susu | junk`.

Kategori ronde:

```text
mitos_fakta
susun_piring
food_battle
guru_vs_siswa
final
```

---

# 16. Functional Requirements

## FR-01 — Setup Game

Sistem harus dapat:

- membuat sesi permainan;
- menambah/menghapus kelompok (2–6, tanpa tentukan jumlah di awal);
- memasukkan nama kelompok;
- memulai permainan.

## FR-02 — Score Management

Sistem harus dapat:

- menambahkan skor;
- mengurangi skor;
- menampilkan skor;
- memperbarui leaderboard.

## FR-03 — Question Display

Sistem harus dapat:

- menampilkan pertanyaan;
- menampilkan pilihan;
- menyembunyikan jawaban;
- menampilkan jawaban;
- menampilkan penjelasan.

## FR-04 — Round Management

Sistem harus dapat:

- berpindah ronde (maju/mundur sesi);
- mengulang ronde;
- pindah soal (maju/mundur) dalam satu sesi;
- menyembunyikan kembali jawaban setelah reveal;
- kembali ke pertanyaan sebelumnya jika diperlukan;
- menyelesaikan permainan.

## FR-05 — Final Result

Sistem harus menampilkan:

- skor akhir;
- ranking kelompok;
- kelompok pemenang;
- pesan penutup.

## FR-06 — Susun Piring Drag Murni

Sistem harus dapat:

- drag makanan dari tray ke piring memakai kursor;
- drag balik dari piring ke tray untuk mengeluarkan;
- menghitung skor live berbasis gizi saat drop (maks 250);
- menandai `junk` dengan `⚠️` (otomatis jebolkan target gula/lemak);
- reset piring.

---

# 17. Non-Functional Requirements

## Performance

Target:

- transisi UI < 300 ms;
- animasi tidak menyebabkan lag;
- aplikasi dapat berjalan pada laptop standar.

## Reliability

Aplikasi harus dapat tetap berjalan tanpa internet.

## Usability

Fasilitator harus dapat memahami kontrol utama tanpa membaca dokumentasi panjang.

## Visibility

Semua teks penting harus terbaca dari proyektor.

## Accessibility

- ukuran font besar;
- kontras tinggi;
- tidak bergantung hanya pada warna;
- ikon + teks digunakan bersama.

---

# 18. Offline Requirement

Gizi Rush sebaiknya:

```text
Internet
   │
   X
   │
Gizi Rush
   │
   ├── Questions
   ├── Images
   ├── Sounds
   ├── Game Logic
   └── Scores
```

Semua aset utama disimpan lokal.

Deploy Vercel sebagai static (`vite build`): bundle font/images/sounds/questions lokal, nol fetch eksternal. Sekali dibuka di laptop fasilitator, refresh/proyektor tanpa internet tetap jalan via `localStorage` resume. Wajib ada Reset agar aman crash (tanpa Export).

---

# 19. Status Implementasi (tercapai)

- Setup nama kelompok dinamis 2–6 + Menu Sesi 5 kartu berurutan;
- 5 sesi × 5 level (Mitos/Fakta, Susun Piring drag murni, Food Battle, Guru vs Siswa, Final);
- scoring multi-tim 1-klik + Undo + leaderboard + result;
- countdown tiap buka sesi + reset game + offline mode.

---

# 20. Success Metrics

Keberhasilan produk dapat dievaluasi melalui:

### Engagement

- peserta aktif menjawab;
- peserta mengikuti setiap ronde;
- interaksi antarkelompok.

### Learning

- peserta dapat menjelaskan kembali pesan utama;
- peserta dapat membedakan beberapa mitos/fakta;
- peserta memahami prinsip dasar komposisi makanan.

### Operational

- fasilitator dapat menjalankan game tanpa bantuan teknis;
- tidak terjadi crash;
- permainan dapat selesai dalam 30–45 menit.

---

# 21. End Game

Setelah leaderboard final:

```text
🏆 SELAMAT!

JUARA 1
🍎 KELOMPOK APEL

TOTAL SCORE
(skor akhir sesuai akumulasi award: kuis +100/+150/+200/+500, piring 0–250)
```

Kemudian tampil:

```text
🧠 4 HAL YANG HARUS DIINGAT

1. Makan beragam.
2. Perhatikan komposisi dan porsi.
3. Perhatikan konsumsi makanan/minuman
   tinggi gula, garam, dan lemak.
4. Pilih pola makan yang sesuai kebutuhan
   dan kondisi masing-masing.
```

Pesan akhir menjadi bagian dari edukasi ahli gizi.

---

# 22. Out of Scope

Untuk versi awal:

- tidak ada akun siswa;
- tidak ada aplikasi Android;
- tidak ada voting dari smartphone;
- tidak ada multiplayer online;
- tidak ada pembayaran;
- tidak ada AI diagnosis kesehatan;
- tidak memberikan rekomendasi medis personal.

---

# 23. Product Principle

> Gizi Rush bukan aplikasi ujian.

Gizi Rush adalah **alat bantu ahli gizi untuk membuat sesi edukasi terasa seperti game show.**

Fasilitator tetap menjadi sumber penjelasan utama.

Game bertugas menciptakan:

**rasa penasaran → interaksi → kejutan → diskusi → pembelajaran.**