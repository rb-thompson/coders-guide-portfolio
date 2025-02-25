"use client";

import { useState, useRef } from "react";
import { motion, useDragControls, PanInfo } from "framer-motion";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";

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
  questId,
  onComplete,
}: {
  chapterId: number;
  questId?: number;
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
  const containerRef = useRef<HTMLDivElement>(null); // Constrain draggables
  const dropZoneRef = useRef<HTMLDivElement>(null); // Drop zone bounds

  const showToast = (message: string, duration = 2000) => {
    const newToast = { id: Date.now(), text: message, duration };
    setToastQueue((prev) => [...prev, newToast]);
  };

  const removeToast = (id: number) => {
    setToastQueue((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleDragEnd = (item: DragItem, info: PanInfo) => {
    const dropZone = dropZoneRef.current;
    if (!dropZone) return;

    const rect = dropZone.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;

    // Adjust drop coordinates for scroll position
    const droppedInZone =
      info.point.x >= rect.left + scrollX &&
      info.point.x <= rect.right + scrollX &&
      info.point.y >= rect.top + scrollY &&
      info.point.y <= rect.bottom + scrollY;

    if (droppedInZone && !droppedItems.has(item.id)) {
      const newDropped = new Map(droppedItems);
      const snapX = droppedItems.size * 60 + 10; // Kept px for simplicity, matches original
      const snapY = 10;
      newDropped.set(item.id, { x: snapX, y: snapY });
      setDroppedItems(newDropped);

      showToast(item.feedback);

      if (newDropped.size === items.length) {
        setTimeout(() => {
          onComplete();
          // Use questId if provided, fallback to hardcoded slug
          const slug = questId ? `quest-${questId}` : "explore-the-cosmic-console";
          router.push(`/chapters/${chapterId}/${slug}/complete`);
        }, 1000);
      }
    }
  };

  return (
    <article ref={containerRef} className="relative p-4 bg-indigo-900/40 rounded-lg shadow-xl min-h-[20rem]">
      <h3 className="font-mono text-xl text-center text-gray-200 mb-4" aria-label="Quest: Explore the Cosmic Console">
        Explore the Cosmic Console
      </h3>
      <p className="font-mono text-sm text-gray-300 mb-6 text-center" aria-label="Instructions: Drag all commands into the console below">
        Drag all commands into the console below to activate it!
      </p>

      <div className="flex justify-around mb-8 relative">
        {items.map((item) => (
          !droppedItems.has(item.id) && (
            <motion.div
              key={item.id}
              drag
              dragControls={dragControls}
              dragElastic={0.5}
              dragConstraints={containerRef} // Constrain to container
              dragSnapToOrigin
              onDragEnd={(_, info) => handleDragEnd(item, info)}
              className="bg-indigo-600/60 p-2 rounded-md text-gray-200 font-mono text-sm cursor-grab z-10"
              role="button"
              aria-label={`Drag ${item.label} command to the console`}
              whileDrag={{ scale: 1.1 }}
            >
              {item.label}
            </motion.div>
          )
        ))}
      </div>

      <div
        ref={dropZoneRef}
        id="console-drop-zone"
        className="bg-gradient-to-br from-indigo-950 to-blue-700 p-4 rounded-lg border-2 border-indigo-500/20 h-32 relative overflow-hidden font-mono text-gray-200"
        role="region"
        aria-label="Cosmic Console drop zone"
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
                  className="absolute bg-indigo-600/80 p-1 rounded-sm text-gray-200 text-xs"
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
              ? "> Console Activated!"
              : `> Drop commands here (${droppedItems.size}/${items.length})`}
          </p>
        </div>
      </div>

      <Toast messages={toastQueue} onRemove={removeToast} />
    </article>
  );
}