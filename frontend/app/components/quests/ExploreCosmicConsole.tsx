"use client";

import { useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { useRouter } from "next/navigation";

interface DragItem {
  id: number;
  label: string;
  correctZone: string;
}

export default function ExploreCosmicConsole({
  chapterId,
  questId,
  onComplete,
}: {
  chapterId: number;
  questId: number;
  onComplete: () => void;
}) {
  const [items, setItems] = useState<DragItem[]>([
    { id: 1, label: "log", correctZone: "console" },
    { id: 2, label: "error", correctZone: "console" },
    { id: 3, label: "warn", correctZone: "console" },
  ]);
  const [droppedItems, setDroppedItems] = useState<number[]>([]);
  const dragControls = useDragControls();
  const router = useRouter();

  const handleDragEnd = (itemId: number) => {
    if (!droppedItems.includes(itemId)) {
      const newDropped = [...droppedItems, itemId];
      setDroppedItems(newDropped);
      if (newDropped.length === items.length) {
        onComplete();
        router.push(`/chapters/${chapterId}/explore-the-cosmic-console/complete`);
      }
    }
  };

  return (
    <article className="relative p-4 bg-indigo-900/40 rounded-lg shadow-xl min-h-[20rem]">
      <h3 className="font-mono text-xl text-center text-gray-200 mb-4" aria-label="Quest: Explore the Cosmic Console">
        Explore the Cosmic Console
      </h3>
      <p className="font-mono text-sm text-gray-300 mb-6 text-center" aria-label="Instructions: Drag all commands into the console">
        Drag all commands into the console to activate it!
      </p>

      <div className="flex justify-around mb-8">
        {items.map((item) => (
          !droppedItems.includes(item.id) && (
            <motion.div
              key={item.id}
              drag
              dragControls={dragControls}
              dragElastic={0.2}
              dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
              onDragEnd={() => handleDragEnd(item.id)}
              className="bg-indigo-600/60 p-2 rounded-md text-gray-200 font-mono text-sm cursor-grab"
              role="button"
              aria-label={`Drag ${item.label} command to the console`}
              aria-grabbed={false}
              whileDrag={{ scale: 1.1 }}
            >
              {item.label}
            </motion.div>
          )
        ))}
      </div>

      <div
        className="bg-gradient-to-br from-indigo-950 to-blue-700 p-4 rounded-lg border-2 border-indigo-500/20 h-32 flex items-center justify-center"
        role="region"
        aria-label="Cosmic Console drop zone"
      >
        <p className="font-mono text-gray-200">
          {droppedItems.length === items.length
            ? "Console Activated!"
            : `Drop commands here (${droppedItems.length}/${items.length})`}
        </p>
      </div>
    </article>
  );
}