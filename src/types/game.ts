export type RoundType = "mitos_fakta" | "susun_piring" | "food_battle" | "guru_vs_siswa" | "final";

export type Team = {
  id: string;
  name: string;
  icon: string;
  score: number;
};

export type Option = {
  id: string;
  label: string;
  image?: string;
};

export type Question = {
  id: string;
  type: RoundType;
  question: string;
  options?: Option[];
  answer: string;
  explanation: string;
  points: number;
  level: 1 | 2 | 3 | 4 | 5;
};

export type FoodCategory = "makanan-pokok" | "lauk" | "sayur" | "buah" | "susu" | "junk";

export type Gizi = {
  kalori: number;
  protein_g: number;
  karbo_g: number;
  lemak_g: number;
  serat_g: number;
  gula_g: number;
};

export type Food = {
  id: string;
  label: string;
  category: FoodCategory;
  image: string;
  gizi: Gizi;
};

export type GiziTarget = {
  kalori: [number, number];
  protein_min: number;
  serat_min: number;
  gula_max: number;
  lemak_max: number;
};

export type FoodMission = {
  level: 1 | 2 | 3 | 4 | 5;
  prompt: string;
  wajib: FoodCategory[];
  pool: string[];
  target: GiziTarget;
};

export type GameState = {
  status: "setup" | "menu" | "playing" | "finished";
  currentRound: RoundType;
  currentQuestion: number;
  teams: Team[];
  plate: string[];
  revealState: boolean;
  completed: Partial<Record<RoundType, number>>;
  quizSeed: Partial<Record<RoundType, number>>;
};
