let ctx: AudioContext | null = null;
let on = true;

try {
  on = localStorage.getItem("gizi-rush-sound") !== "0";
} catch {
  // ponytail: storage gagal, sound tetap nyala default
}

export function isSoundOn() {
  return on;
}

export function setSoundOn(v: boolean) {
  on = v;
  try {
    localStorage.setItem("gizi-rush-sound", v ? "1" : "0");
  } catch {
    // ponytail: abaikan agar game tidak crash
  }
}

function ac() {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function play(freqs: number[], { slide, dur = 0.14, type = "square", gap = 0.1, vol = 0.06 }: { slide?: [number, number]; dur?: number; type?: OscillatorType; gap?: number; vol?: number } = {}) {
  if (!on) return;
  try {
    const c = ac();
    freqs.forEach((f, i) => {
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = type;
      const at = c.currentTime + i * gap;
      if (slide) {
        o.frequency.setValueAtTime(slide[0], at);
        o.frequency.exponentialRampToValueAtTime(slide[1], at + dur);
      } else {
        o.frequency.value = f;
      }
      g.gain.value = vol;
      o.connect(g).connect(c.destination);
      o.start(at);
      o.stop(at + dur);
    });
  } catch {
    // ponytail: audio gagal, game tetap jalan tanpa suara
  }
}

export const sfx = {
  start() {
    play([523, 659, 784]);
  },
  tick() {
    play([440], { dur: 0.09 });
  },
  go() {
    play([880], { dur: 0.35, vol: 0.08 });
  },
  reveal() {
    play([0], { slide: [280, 720], dur: 0.7, type: "sawtooth" });
  },
  correct() {
    play([784, 988, 1175], { dur: 0.13, gap: 0.09 });
  },
  drop() {
    play([620], { dur: 0.08, type: "triangle", vol: 0.08 });
  },
  score() {
    play([659, 880], { dur: 0.12 });
  },
  winner() {
    play([523, 523, 659, 784, 1047], { dur: 0.18, gap: 0.13, vol: 0.07 });
  },
};
