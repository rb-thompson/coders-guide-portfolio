"use client";

import { motion } from "framer-motion";

export default function GalacticEntity() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className="absolute w-12 h-12 opacity-50 z-5 pointer-events-none"
      initial={{ x: "0vw", y: "0vh" }}
      animate={{
        x: ["0vw", "3vw", "20vw", "65vw", "20vw", "65vw", "90vw"],
        y: ["0vh", "5vh", "0vh", "33vh", "5vh", "0vh", "30vh"],
        rotate: [0, 75, 90, 360, -90, 90, 360],
        scale: [0, 2, 1.05, 1.8, .6, 1.2, 0],
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
      style={{ transformOrigin: "center" }}
    >
      {/* Pulsing Core - Indigo */}
      <motion.circle
        cx="12"
        cy="12"
        r="2"
        fill="#6366F1" // indigo-500
        stroke="#6366F1"
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Signal Wave 1 - Round, Indigo */}
      <motion.circle
        cx="12"
        cy="12"
        r="3"
        fill="none"
        stroke="#818CF8" // indigo-400
        strokeWidth="0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeOut", delay: 0 }}
      />
      {/* Signal Wave 2 - Round, Indigo */}
      <motion.circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="#818CF8"
        strokeWidth="0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
      />
      {/* Signal Wave 3 - Round, Indigo */}
      <motion.circle
        cx="12"
        cy="12"
        r="5"
        fill="none"
        stroke="#818CF8"
        strokeWidth="0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeOut", delay: 1 }}
      />
    </motion.svg>
  );
}