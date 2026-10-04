import type { DragEvent } from "react";
import type { Food } from "../../types/game";
import { sfx } from "../../utils/sound";

export default function DraggableFood({ food }: { food: Food }) {
  const onStart = (e: DragEvent) => {
    e.dataTransfer.setData("text/plain", food.id);
    e.dataTransfer.effectAllowed = "move";
  };
  return (
    <div
      draggable
      onDragStart={(e) => { onStart(e); sfx.tick(); }}
      title={food.label}
      className="cursor-grab rounded-2xl border-2 border-white/20 bg-gradient-to-b from-indigo-600 to-purple-700 p-2 text-center transition hover:scale-105 select-none active:cursor-grabbing"
    >
      <img src={food.image} alt={food.label} draggable={false} className="mx-auto h-20 w-20 drop-shadow-[0_4px_0_rgba(0,0,0,0.4)]" />
      <div className="mt-1 text-sm font-bold text-white">{food.label}</div>
    </div>
  );
}
