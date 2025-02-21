"use client";

import { motion } from "framer-motion";

export default function SatelliteIcon() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -2 24 26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 shrink-0"
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    >
      {/* Satellite Body */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 12a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-4 2h8"
      />
      {/* Solar Panels */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 10h4v8H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Zm12 0h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4v-8Z"
      />
      {/* Antenna */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 12V6m0 0 2-2m-2 2-2-2"
      />
      {/* Pulsing Beacon - Neon Green */}
      <motion.circle
        cx="12"
        cy="4"
        r="1"
        fill="#39FF14" // Neon green hex
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );
}