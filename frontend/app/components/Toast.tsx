"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ToastMessage {
  id: number;
  text: string;
  duration?: number;
}

interface ToastProps {
  messages: ToastMessage[];
  onRemove: (id: number) => void; // Callback to remove a toast from the queue
}

export default function Toast({ messages, onRemove }: ToastProps) {
  return (
    <div className="fixed bottom-4 left-0 right-0 flex flex-col items-center gap-2 z-50">
      <AnimatePresence>
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: -index * 40, opacity: 1 }} // Stack upwards (40px per toast)
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={() => {
              if (index === 0) {
                // Only remove the bottom-most toast after its animation completes
                setTimeout(() => onRemove(msg.id), msg.duration || 2000);
              }
            }}
            className="w-fit max-w-md bg-indigo-800/90 text-gray-200 font-mono text-sm p-3 rounded-md shadow-lg"
            role="alert"
            aria-live="polite"
          >
            {msg.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}