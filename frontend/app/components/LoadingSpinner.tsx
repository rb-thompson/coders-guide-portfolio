"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a minimum display time of 1000ms (1 second)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    // Cleanup timer if component unmounts early
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="loading-spinner absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1000"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }} // Fade out over 0.3s
    >
      <div className="slider slider-1"></div>
      <div className="slider slider-2"></div>
      <div className="slider slider-3"></div>
    </motion.div>
  );
}