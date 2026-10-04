import { useState, type DragEvent } from "react";
import DraggableFood from "./DraggableFood";
import type { Food } from "../../types/game";
import { sfx } from "../../utils/sound";

export default function Plate({ plate, foods, onDropFood }: { plate: string[]; foods: Food[]; onDropFood: (id: string) => void }) {
  const [over, setOver] = useState(false);
  const byId = new Map(foods.map((f) => [f.id, f]));
  const drop = (e: DragEvent) => {
    e.preventDefault();
    setOver(false);
    const id = e.dataTransfer.getData("text/plain");
    if (id) {
      onDropFood(id);
      sfx.drop();
    }
  };
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={drop}
      className={`plate-bump mx-auto flex min-h-64 w-full max-w-2xl flex-wrap items-center justify-center gap-3 rounded-[50%] border-8 p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition ${over ? "scale-105 border-green-300 bg-white text-black" : "border-white bg-gradient-to-b from-slate-100 to-slate-300 text-black"}`}
    >
      {plate.length === 0 ? (
        <p className="text-2xl font-bold text-slate-500">🍽️ PIRING — drag makanan ke sini!</p>
      ) : (
        plate.map((id) => {
          const f = byId.get(id);
          return f ? <DraggableFood key={id} food={f} /> : null;
        })
      )}
    </div>
  );
}
