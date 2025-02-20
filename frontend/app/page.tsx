"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";
import { useUser } from './contexts/UserContext';
import SatelliteIcon from "./components/SatelliteIcon";


export default function Home() {
  const [init, setInit] = useState(false);
  const { user } = useUser();

  // Initialize the tsParticles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadAll(engine);
    }).then(() => {
      setInit(true);
    });
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-700 text-gray-200">
      <div className="flex flex-col items-center justify-center pt-20 pb-6">
        {/* Starry Background */}
        {init && (
          <Particles
            id="tsparticles"
            options={options}
            className="absolute inset-0 z-0 pointer-events-none"
          />
        )}

        {/* Guidebook Content */}
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: .5, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl md:text-6xl font-bold mb-4 px-2">
            It&apos;s portfolios all the way down, partner!
          </h1>

          <div className="h-12 md:h-20 flex items-center justify-center">
            <SatelliteIcon />
          </div>

          <p className="text-lg md:text-xl mb-8 px-2">
            Your portfolio project is just a wormhole away. <br /><span className="italic">Don’t Panic</span>—grab your notepad and start your journey.
          </p>
          <div className="flex justify-center items-center space-x-2 font-mono bg-black/20 w-64 m-auto p-2 rounded-lg">
          {user ? (
            <>
              <Link href="/chapters" className="text-indigo-300">
                <span className="text-lg tracking-wider font-normal text-white hover:bg-indigo-600/70 border-2 border-indigo-600 hover:border-transparent px-2 py-1 rounded-lg outline-offset-2 transition-colors">
                  Continue Adventure
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <span className="text-white text-lg md:text-xl font-normal hover:bg-indigo-600/70 border-2 border-indigo-600 hover:border-transparent rounded-md px-3 py-1 transition-colors duration-500">
                    Log In
                </span>
              </Link>
              <Link href="/signup">
                <span className="text-white text-lg md:text-xl font-normal hover:bg-indigo-600/70 border-2 border-indigo-600 hover:border-transparent rounded-md px-3 py-1 transition-colors duration-500">
                    Sign Up
                </span>
              </Link>
            </>
          )}
          </div>
        </motion.div>
      </div>
      <article className="grid grid-cols-1 md:grid-cols-4 justify-center gap-6 px-8 md:px-12 py-4 max-w-screen-xl mx-auto">
      {/* Sign Up Card */}
      <motion.section
        className="bg-black/80 p-4 rounded-lg shadow-xl flex flex-col items-center text-center min-h-[12rem] md:min-h-[18rem]"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="h-12 md:h-20 flex items-center justify-center">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 shrink-0"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
            />
          </motion.svg>
        </div>
        <h2 className="font-mono text-lg sm:text-xl md:text-2xl h-14 flex items-center justify-center">Sign Up</h2>
        <p className="text-md text-gray-300 text-pretty flex-grow flex items-center justify-center">
          Sign up to track your progress and view your profile.
        </p>
      </motion.section>

      {/* Complete Quests Card */}
      <motion.section
        className="bg-indigo-900/40 border border-indigo-500/20 p-4 rounded-lg shadow-xl flex flex-col items-center text-center min-h-[12rem] md:min-h-[18rem]"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="h-12 md:h-20 flex items-center justify-center">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 shrink-0"
            whileHover={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, ease: "easeInOut", repeat: 1 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
            />
          </motion.svg>
        </div>
        <h2 className="font-mono text-lg sm:text-xl md:text-2xl h-14 flex items-center justify-center">Complete Quests</h2>
        <p className="text-md text-gray-300 text-pretty flex-grow flex items-center justify-center">
          Complete chapters in the quest log to unlock new quests and rewards.
        </p>
      </motion.section>

      {/* Earn Badges Card */}
      <motion.section
        className="bg-indigo-600/60 border border-indigo-500/40 p-4 rounded-lg shadow-xl flex flex-col items-center text-center min-h-[12rem] md:min-h-[18rem]"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="h-12 md:h-20 flex items-center justify-center">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 shrink-0"
            whileHover={{ scale: 1.2, rotate: 15 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
            />
          </motion.svg>
        </div>
        <h2 className="font-mono text-lg sm:text-xl md:text-2xl h-14 flex items-center justify-center">Earn Badges</h2>
        <p className="text-md text-gray-300 text-pretty flex-grow flex items-center justify-center">
          Earn badges along the way for each quest you complete.
        </p>
      </motion.section>

      {/* Level Up Card */}
      <motion.section
        className="bg-indigo-600/100 border border-indigo-500/80 p-4 rounded-lg shadow-xl flex flex-col items-center text-center min-h-[12rem] md:min-h-[18rem]"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="h-12 md:h-20 flex items-center justify-center">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 shrink-0"
            whileHover={{ y: -5, rotate: 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
            />
          </motion.svg>
        </div>
        <h2 className="font-mono text-lg sm:text-xl md:text-2xl h-14 flex items-center justify-center">Level Up</h2>
        <p className="text-md text-gray-200 text-pretty flex-grow flex items-center justify-center">
          Grow as a developer and become a better portfolio builder.
        </p>
      </motion.section>
    </article>
    </div>
  );
}