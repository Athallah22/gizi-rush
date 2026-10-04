# Architecture — Gizi Rush

## 1. Architecture Overview

Gizi Rush menggunakan arsitektur **Local Single-Application / Offline-First**.

Tidak diperlukan backend untuk MVP.

```text
                 ┌──────────────────────┐
                 │     AHLI GIZI        │
                 │      Laptop          │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │     Web Browser      │
                 │                      │
                 │     Gizi Rush        │
                 └──────────┬───────────┘
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
        Game Engine      Content       Local State
             │             │              │
             └─────────────┼──────────────┘
                           │
                           ▼
                    Projector / TV
                           │
                           ▼
                 👨‍🎓 👩‍🎓 🧑‍🏫
                 Siswa & Guru
```

---

# 2. Architectural Principle

Arsitektur mengikuti prinsip:

```text
Simple
↓
Offline
↓
Reliable
↓
Fast
↓
Easy to Operate
```

Tidak perlu membuat backend jika kebutuhan utamanya hanya satu laptop.

---

# 3. Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

---

# 4. State Management

State utama:

```text
GameState
├── status (setup | menu | playing | finished)
├── currentRound
├── currentQuestion (index level 0–4)
├── teams (dinamis 2–6)
├── plate
├── revealState
└── completed (level tertinggi reveal per sesi)
```

Contoh:

```typescript
type GameState = {
  status: "setup" | "menu" | "playing" | "finished";
  currentRound: RoundType;
  currentQuestion: number;
  teams: Team[];
  plate: string[];
  revealState: boolean;
  completed: Partial<Record<RoundType, number>>;
};
```

---

# 5. Domain Model

## Team

Jumlah dinamis 2–6 (tanpa tentukan jumlah di awal, ikon 🍎🥕🥑🍌🍇🍉):

```typescript
type Team = {
  id: string;
  name: string;
  icon: string;
  score: number;
};
```

## Question

```typescript
type Question = {
  id: string;
  type: RoundType;
  question: string;
  options?: Option[];
  answer: string;
  explanation: string;
  points: number;
  level: 1 | 2 | 3 | 4 | 5;
};
```

## Option

```typescript
type Option = {
  id: string;
  label: string;
  image?: string;
};
```

## Food (Susun Piring, drag murni, 4S5S + gizi)

```typescript
type FoodCategory = "makanan-pokok" | "lauk" | "sayur" | "buah" | "susu" | "junk";

type Gizi = {
  kalori: number;
  protein_g: number;
  karbo_g: number;
  lemak_g: number;
  serat_g: number;
  gula_g: number;
};

type Food = {
  id: string;
  label: string;
  category: FoodCategory;
  image: string;
  gizi: Gizi;
};

type GiziTarget = {
  kalori: [number, number];
  protein_min: number;
  serat_min: number;
  gula_max: number;
  lemak_max: number;
};

type FoodMission = {
  level: 1 | 2 | 3 | 4 | 5;
  prompt: string;
  wajib: FoodCategory[];
  pool: string[];
  target: GiziTarget;
};
```

---

# 6. Round Model

```typescript
type RoundType =
  | "mitos_fakta"
  | "susun_piring"
  | "food_battle"
  | "guru_vs_siswa"
  | "final";
```

Setiap ronde memiliki game handler masing-masing.

```text
Game
│
├── MitosFakta
├── SusunPiring
├── FoodBattle
├── GuruVsSiswa
└── Final
```

---

# 7. Recommended Project Structure

```text
gizi-rush/
│
├── public/
│   ├── images/
│   │   ├── food/*.svg (pack lokal AI-generate, offline)
│   │   └── maskot-gizi.svg
│   ├── icons/
│   └── sounds/ (tidak dipakai, sound = synth WebAudio)
│
├── src/
│   │
│   ├── components/
│   │   ├── Leaderboard/
│   │   ├── Countdown/ (tiap buka sesi baru, Esc batal)
│   │   ├── Confetti/ (CSS-only)
│   │   ├── Quiz/
│   │   ├── TeamPicker/ (chips multi-tim + award + undo)
│   │   ├── SessionMenu/ (layout 3-2-1 + badge Lanjut)
│   │   ├── ControlsHelp/ (overlay semua kontrol, ?/H)
│   │   └── Tutorial/ (6 langkah, flag gizi-rush-seen-tutorial)
│   │
│   ├── features/
│   │   └── game/
│   │       ├── useGame.ts (addScoreMany/undoLast/addTeam/removeTeam/markDone/goMenu)
│   │       ├── sessions.ts (gating 🔒/⭐/✅)
│   │       ├── scoring.ts (missionScore + MAX_ITEMS)
│   │       └── scoring.check.ts
│   │
│   ├── rounds/
│   │   └── SusunPiring/
│   │       ├── SusunPiring.tsx
│   │       ├── Plate.tsx
│   │       └── DraggableFood.tsx
│   │
│   ├── data/
│   │   ├── mitos-fakta.json
│   │   ├── susun-piring.json
│   │   ├── food-battle.json
│   │   ├── guru-vs-siswa.json
│   │   └── final.json
│   │
│   ├── types/
│   │   └── game.ts
│   │
│   ├── utils/
│   │   ├── sound.ts (synth WebAudio lokal)
│   │   └── useAwardKeys.ts (keyboard 1-6 + S)
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css (tema + keyframes heboh)
│
├── docs/
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   └── DESIGN.md
│
├── package.json
└── README.md
```

---

# 8. Application Flow

```text
Setup (nama tim 2–6 + tutorial pertama buka, flag gizi-rush-seen-tutorial)
  │
  ▼
Menu (3 kartu atas, 2 kartu tengah, Result bawah; badge Lanjut Lx)
  │  └─ klik sesi baru → Countdown (Esc batal) →
  │  └─ klik sesi berprogres → langsung lanjut level tersimpan →
  ▼
Playing (Level 1–5 per sesi, Space = Menu tanpa reset progres)
  │
  ▼
Finished (semua sesi ⭐⭐⭐⭐⭐ → confetti + juara)
  │
  ▼
Reset via Esc (skor + completed nol, nama tim dipertahankan)
```

---

# 9. Game Engine

Game engine (`useGame` + `sessions` + `scoring`, tanpa class) bertanggung jawab terhadap:

- pindah sesi/soal/misi (maju/mundur, Space = Menu tanpa reset progres; buka ulang lanjut dari `completed`);
- countdown tiap buka sesi baru (`pending`, Esc batal);
- reveal toggle + auto-bintang (`markDone`);
- skor multi-tim 1-klik + Undo (`addScoreMany` / `undoLast`);
- leaderboard + tim dinamis (`addTeam` / `removeTeam`);
- piring Susun Piring (`setPlate`, drag murni native HTML5 DnD, skor gizi live, auto-kosong ganti misi);
- game completion (semua sesi ⭐⭐⭐⭐⭐ → finished).
```

---

# 10. State Flow

```text
User Action
     │
     ▼
Game Controller
     │
     ▼
Update Game State
     │
     ▼
React Re-render
     │
     ▼
Animation / UI
```

Contoh:

```text
Ahli Gizi klik "Reveal"
        │
        ▼
revealAnswer()
        │
        ▼
revealState = true
        │
        ▼
React render
        │
        ▼
Animation
        │
        ▼
Jawaban + Penjelasan
```

---

# 11. Persistence

MVP dapat menggunakan `localStorage`.

Data yang disimpan:

```text
gizi-rush-session
├── status, currentRound, currentQuestion
├── teams (nama + skor)
├── plate
├── revealState
└── completed (bintang per sesi)
```

Tujuannya agar jika browser mengalami refresh, sesi dapat dipulihkan.

---

# 12. Content Architecture

Konten dipisahkan dari logic.

```text
Game Logic
     │
     ├───────────────┐
     ▼               ▼
Question JSON     Food JSON (susun-piring.json, drag murni)
```

Contoh `susun-piring.json`:

```json
{
  "foods": [
    { "id": "nasi", "label": "Nasi", "category": "makanan-pokok", "image": "./images/food/nasi.svg", "gizi": { "kalori": 175, "protein_g": 4, "karbo_g": 38, "lemak_g": 0, "serat_g": 1, "gula_g": 0 } }
  ],
  "missions": [
    { "level": 1, "wajib": ["makanan-pokok", "lauk", "sayur", "buah"], "target": { "kalori": [400, 550], "protein_min": 25, "serat_min": 6, "gula_max": 25, "lemak_max": 15 } }
  ]
}
```

Rubrik: `Lengkap 100 + Kalori 50 + Protein 30 + Serat 20 + Gula 30 + Lemak 20 = 0–250`, `junk` jebolkan target + flag `⚠️`, skor live saat drop, maks 6 item anti-spam.

Dengan demikian ahli gizi atau developer dapat menambahkan pertanyaan tanpa mengubah game engine.

---

# 13. Offline Architecture

Semua resource penting harus tersedia secara lokal.

```text
Browser
│
├── JS
├── CSS
├── Images
├── Sounds
├── Questions
└── Game Logic
```

Tidak boleh ada dependency terhadap:

```text
Google Fonts
External API
Cloud database
CDN
Online image
```

untuk fitur inti.

Deploy Vercel sebagai static (`vite build`) tetap offline: semua JS/CSS/images/sounds/questions di-bundle lokal, nol Google Fonts/API/CDN. `localStorage` (`+ plate`) untuk resume, ditambah Reset anti-crash (tanpa Export).

---

# 14. Optional PWA

Versi berikutnya dapat menggunakan PWA.

```text
Browser
   │
   ▼
Service Worker
   │
   ├── Cache JS
   ├── Cache CSS
   ├── Cache Images
   └── Cache Questions
```

Sehingga aplikasi dapat dipasang dan dijalankan seperti aplikasi lokal.

---

# 15. Error Handling

Jika terjadi kesalahan:

```text
Error
 │
 ├── Tidak crash
 ├── Tampilkan fallback UI
 └── Fasilitator dapat kembali
```

Contoh:

```text
⚠️ Terjadi masalah

[ KEMBALI ]
```

---

# 16. Security

Karena MVP berjalan secara lokal:

- tidak ada akun;
- tidak ada password;
- tidak ada data siswa;
- tidak ada server;
- tidak ada data pribadi yang dikirim.

Risiko keamanan relatif rendah.

---

# 17. Scalability

Arsitektur dapat dikembangkan menjadi:

```text
                    Gizi Rush
                       │
            ┌──────────┴──────────┐
            ▼                     ▼
       Offline Mode          Online Mode
                                  │
                                  ▼
                              Backend
                                  │
                     ┌────────────┼───────────┐
                     ▼            ▼           ▼
                   Auth        Database     Admin
```

Namun backend tidak diperlukan untuk MVP.

---

# 18. Future Features

Versi berikutnya dapat menambahkan:

- Question Editor;
- Admin Dashboard;
- statistik permainan;
- penyimpanan hasil;
- export hasil;
- custom branding sekolah;
- mode online;
- remote controller;
- buzzer fisik;
- QR voting siswa.

Tetapi semuanya berada di luar scope MVP.