"use client"; // Mark this as a client component for interactivity

import { motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";

export default function Home() {
  const [init, setInit] = useState(false);

  // Initialize the tsParticles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadAll(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container): Promise<void> => {
    console.log("Particles loaded:", container);
  }, []);

  // Particle configuration for a cosmic starfield (static, no hover effect)
  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 60,
      particles: {
        color: {
          value: "#f0f3f7", // Soft gray for stars
        },
        move: {
          enable: true,
          speed: 0.3, // Slow drift for stars
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "out",
          },
        },
        number: {
          density: {
            enable: true,
            value_area: 1000,
          },
          value: 600, // Dense starfield
        },
        opacity: {
          value: 0.5,
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.1,
            sync: false,
          },
        },
        size: {
          value: { min: 0.5, max: 1.5 }, // Small stars for depth
          random: true,
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.1,
            sync: false,
          },
        },
      },
      detectRetina: true,
    }),
    [] // No dependencies, as options are static
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-indigo-900 text-gray-200 flex flex-col items-center justify-center p-4">
      {/* Starry Background */}
      {init && (
        <Particles
          id="tsparticles"
          options={options}
          particlesLoaded={particlesLoaded}
          className="absolute inset-0 z-0"
        />
      )}

      {/* Guidebook Content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl md:text-6xl font-bold mb-4">
          Welcome to the Data Galaxy, Coder!
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Your portfolio project is just a wormhole away. <span className="italic">Don’t Panic</span>—grab your guidebook and start your journey!
        </p>
        <Link href="/quests">
          <motion.div
            className="text-gray-100 text-lg tracking-wider font-semibold flex justify-center items-center space-x-2 hover:text-indigo-300 transition-colors"
            whileHover={{ x: 10 }} // Slight shift on hover
          >
            <span>Start Your Cosmic Journey</span>
            <motion.span
              className="text-indigo-300"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }} // Arrow moves further on hover
              transition={{ type: "spring", stiffness: 300 }}
            >
              →
            </motion.span>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}