"use client";

import { useState } from "react";
import { motion, useDragControls, PanInfo } from "framer-motion"; // Import PanInfo
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast"; // Adjust path as needed

interface DragItem {
  id: number;
  label: string;
  correctZone: string;
  feedback: string;
}

interface ToastMessage {
  id: number;
  text: string;
  duration?: number;
}

export default function ExploreCosmicConsole({
  chapterId,
  onComplete,
}: {
  chapterId: number;
  onComplete: () => void;
}) {
  const items: DragItem[] = [
    { id: 1, label: "log", correctZone: "console", feedback: "Adding cosmic entries to your portfolio..." },
    { id: 2, label: "error", correctZone: "console", feedback: "Debugging your portfolio’s orbit..." },
    { id: 3, label: "warn", correctZone: "console", feedback: "Polishing portfolio with cosmic alerts..." },
  ];
  const [droppedItems, setDroppedItems] = useState<Map<number, { x: number; y: number }>>(new Map());
  const [toastQueue, setToastQueue] = useState<ToastMessage[]>([]);
  const dragControls = useDragControls();
  const router = useRouter();

  const showToast = (message: string, duration = 2000) => {
    const newToast = { id: Date.now(), text: message, duration };
    setToastQueue((prev) => [...prev, newToast]);
  };

  const removeToast = (id: number) => {
    setToastQueue((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleDragEnd = (item: DragItem, info: PanInfo) => { // Replace 'any' with 'PanInfo'
    const dropZone = document.getElementById("console-drop-zone");
    if (!dropZone) return;

    const rect = dropZone.getBoundingClientRect();
    const droppedInZone =
      info.point.x >= rect.left &&
      info.point.x <= rect.right &&
      info.point.y >= rect.top &&
      info.point.y <= rect.bottom;

    if (droppedInZone && !droppedItems.has(item.id)) {
      const newDropped = new Map(droppedItems);
      const snapX = droppedItems.size * 60 + 10; // 60px apart, 10px padding
      const snapY = 10; // Fixed vertical position
      newDropped.set(item.id, { x: snapX, y: snapY });
      setDroppedItems(newDropped);

      showToast(item.feedback);

      if (newDropped.size === items.length) {
        setTimeout(() => {
          onComplete();
          router.push(`/chapters/${chapterId}/explore-the-cosmic-console/complete`);
        }, 1000); // Delay for completion
      }
    }
  };

  const handleAbort = () => {
    router.push(`/chapters/${chapterId}`);
  };

  return (
    <article className="relative p-4 bg-indigo-900/40 rounded-lg shadow-xl min-h-[20rem] flex flex-col">
      <h3 className="font-mono text-xl text-center text-gray-200 mb-4" aria-label="Quest: Explore the Cosmic Console">
        Command and Conquer
      </h3>
      <p className="font-mono text-sm text-gray-300 mb-6 text-center" aria-label="Instructions: Drag commands into the cosmic terminal below">
      As a coder, you’ll be using commands quite often. This challenge just checks to see if you can point, click, and follow instructions.
      </p>

      <div className="flex justify-around mb-6 relative">
        {items.map((item) => (
          !droppedItems.has(item.id) && (
            <motion.div
              key={item.id}
              drag
              dragControls={dragControls}
              dragElastic={0.5}
              dragConstraints={{ left: -100, right: 100, top: -50, bottom: 200 }}
              dragSnapToOrigin
              onDragEnd={(_, info) => handleDragEnd(item, info)}
              className="bg-indigo-600/60 p-2 rounded-md text-gray-200 font-mono text-sm cursor-grab z-10 border border-indigo-400/50 hover:bg-indigo-600/80 transition-colors"
              role="button"
              aria-label={`Drag ${item.label} command to the cosmic terminal`}
              whileDrag={{ scale: 1.1 }}
            >
              {item.label}
            </motion.div>
          )
        ))}
      </div>

      <div
        id="console-drop-zone"
        className="bg-gradient-to-br from-indigo-950 to-blue-700 p-4 rounded-lg border-2 border-indigo-500/20 h-32 relative overflow-hidden shadow-inner font-mono text-gray-200 mt-auto"
      >
        <div className="absolute top-0 left-0 right-0 h-6 bg-indigo-900/80 flex items-center px-2 gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
          <span className="text-xs text-gray-400 ml-2">Cosmic Code Terminal</span>
        </div>

        <div className="pt-8 h-full flex flex-col justify-between">
          <div className="relative flex-1">
            {Array.from(droppedItems.entries()).map(([id, pos]) => {
              const item = items.find((i) => i.id === id);
              return (
                <motion.div
                  key={id}
                  className="absolute bg-indigo-600/80 p-1 rounded-sm text-gray-200 text-xs border border-indigo-400/30"
                  initial={{ opacity: 0, x: pos.x, y: pos.y }}
                  animate={{ opacity: 1, x: pos.x, y: pos.y }}
                  transition={{ duration: 0.3 }}
                >
                  {item?.label}
                </motion.div>
              );
            })}
          </div>
          <p className="text-xs text-gray-300">
            {droppedItems.size === items.length
              ? "> Portfolio powered up!"
              : `> Awaiting commands (${droppedItems.size}/${items.length})`}
          </p>
        </div>
      </div>

      <button
        onClick={handleAbort}
        className="mt-4 bg-indigo-700/60 hover:bg-indigo-700/80 text-gray-200 font-mono text-sm py-2 px-4 rounded-md border border-indigo-500/50 flex items-center justify-center gap-2 transition-colors"
        aria-label="Abort quest and return to chapter"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        Abort
      </button>

      <Toast messages={toastQueue} onRemove={removeToast} />
    </article>
  );
}