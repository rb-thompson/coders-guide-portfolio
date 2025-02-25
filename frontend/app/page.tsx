"use client";

// Homepage for The Coder's Guide to the Portfolio Project
// Welcomes users with a cosmic theme, starfield, and call-to-action

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all"; // Loads all particle features
import type { ISourceOptions } from "@tsparticles/engine"; // Type for particle config
import { useUser } from "@/contexts/UserContext"; // User state for login status
import GalacticEntity from "@/components/GalacticEntity"; // Custom cosmic graphic

export default function Home() {
  const [init, setInit] = useState(false); // Tracks particle engine initialization
  const { user } = useUser(); // Get current user from context (null if logged out)

  // Initialize tsParticles engine once on mount
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadAll(engine); // Load full particle features (shapes, motion, etc.)
    }).then(() => {
      setInit(true); // Enable particle rendering when ready
    });
  }, []); // Empty deps: runs only once on load

  // Particle config for a static cosmic starfield (memoized for performance)
  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 60, // Smooth animation cap
      particles: {
        color: { value: "#f0f3f7" }, // Soft gray stars
        move: {
          enable: true,
          speed: 0.3, // Slow drift for a calm effect
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "out" }, // Particles exit screen edges
        },
        number: {
          density: { enable: true, value_area: 1000 },
          value: 600, // Dense starfield for depth
        },
        opacity: {
          value: 0.5,
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.1,
            sync: false, // Random twinkling
          },
        },
        size: {
          value: { min: 0.5, max: 1.5 }, // Varied star sizes
          random: true,
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.1,
            sync: false, // Organic resizing
          },
        },
      },
      detectRetina: true, // Crisp rendering on high-DPI screens
    }),
    [] // Static config, no re-renders needed
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-700 text-gray-200">
      {/* Cosmic graphic overlay */}
      <GalacticEntity />

      {/* Main content area */}
      <div className="flex flex-col items-center justify-center pt-20 pb-6">
        {/* Starfield background (only renders when initialized) */}
        {init && (
          <Particles
            id="tsparticles"
            options={options}
            className="absolute inset-0 z-0 pointer-events-none" // Non-interactive layer
          />
        )}

        {/* Welcome header with animation */}
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }} 
        >
          <h1 className="text-3xl md:text-6xl font-bold mb-4 px-2">
            It’s portfolios all the way down, partner!
          </h1>
        </motion.div>

        {/* Intro text with a Hitchhiker's Guide nod */}
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: .5 }} // Slightly longer delay
        >
          <p className="text-sm sm:text-lg md:text-xl mb-8 px-2 py-2 bg-black/40 rounded-lg select-none">
            <span className="text-blue-500">Your portfolio project is just a wormhole away.</span> <br />
            <span className="italic">Don’t Panic</span>—grab your notepad and start your journey.
          </p>
        </motion.div>

        {/* CTA buttons based on login status */}
        <div className="flex justify-center items-center space-x-2 font-mono bg-black/20 w-64 m-auto p-2 rounded-lg">
          {user ? (
            <Link href="/chapters" className="text-indigo-300">
              <span className="text-lg tracking-wider font-normal text-white hover:bg-indigo-600/70 border-2 border-indigo-600 hover:border-transparent px-2 py-1 rounded-lg outline-offset-2 transition-colors">
                Continue Adventure
              </span>
            </Link>
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
      </div>

      {/* Feature cards showcasing app benefits */}
      <article className="grid grid-cols-1 md:grid-cols-4 justify-center gap-6 px-8 md:px-12 py-4 max-w-screen-xl mx-auto relative z-10">
        {/* Sign Up Card */}
        <section className="bg-indigo-900/40 bg-gradient-to-tr from-indigo-500/20 to-blue-500/20 border border-indigo-500/20 p-4 rounded-lg shadow-xl flex flex-col items-center text-center min-h-[10rem] relative overflow-hidden">
          <svg /* Key icon */ className="absolute w-64 h-64 opacity-10 -top-4 -left-4" />
          <div className="relative z-10">
            <h2 className="font-mono text-lg sm:text-xl md:text-2xl">Sign Up</h2>
            <p className="font-mono text-sm md:text-md text-gray-200">
              Create an account to track your coding journey, monitor progress through quests, and build a personalized profile showcasing your achievements.
            </p>
          </div>
        </section>

        {/* Complete Quests Card */}
        <section className="bg-indigo-900/40 bg-gradient-to-tr from-indigo-500/20 to-blue-600/20 border border-indigo-500/20 p-4 rounded-lg shadow-xl flex flex-col items-center text-center min-h-[10rem] relative overflow-hidden">
          <svg /* Map icon */ className="absolute w-64 h-64 opacity-10 -top-4 -right-4" />
          <div className="relative z-10">
            <h2 className="font-mono text-lg sm:text-xl md:text-2xl">Complete Quests</h2>
            <p className="font-mono text-sm md:text-md text-gray-200">
              Dive into coding chapters, tackle challenges in the quest log, and unlock new tasks and rewards as you advance through the galaxy.
            </p>
          </div>
        </section>

        {/* Earn Badges Card */}
        <section className="bg-indigo-900/40 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 p-4 rounded-lg shadow-xl flex flex-col items-center text-center min-h-[10rem] relative overflow-hidden">
          <svg /* Star icon */ className="absolute w-64 h-64 opacity-10 -top-4 -left-4" />
          <div className="relative z-10">
            <h2 className="font-mono text-lg sm:text-xl md:text-2xl">Earn Badges</h2>
            <p className="font-mono text-sm md:text-md text-gray-200">
              Collect badges as you complete quests, each one a testament to your skills and milestones reached on your cosmic coding adventure.
            </p>
          </div>
        </section>

        {/* Level Up Card */}
        <section className="bg-indigo-900/40 bg-gradient-to-tr from-indigo-500/20 to-purple-600/20 border border-indigo-500/20 p-4 rounded-lg shadow-xl flex flex-col items-center text-center min-h-[10rem] relative overflow-hidden">
          <svg /* Orbit icon */ className="absolute w-64 h-64 opacity-10 -top-4 -right-4" />
          <div className="relative z-10">
            <h2 className="font-mono text-lg sm:text-xl md:text-2xl">Level Up</h2>
            <p className="font-mono text-sm md:text-md text-gray-200">
              Enhance your developer skills with each quest, building a stronger portfolio and leveling up your coding prowess in the galaxy.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}