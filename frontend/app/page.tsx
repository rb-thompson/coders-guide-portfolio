"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";
import { useUser } from './contexts/UserContext';


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
            className="absolute inset-0 z-0"
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
      <article className="grid grid-cols-1 md:grid-cols-4 justify-center gap-4 px-8 md:px-24 py-4">
            <section className="bg-black/80 p-4 rounded-lg shadow-md text-xl">
              <div className="flex justify-between align-middle">
                <h2 className="mb-2 font-mono">Sign Up</h2>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              </div>
              <p className="text-sm text-gray-400">
                Sign up to track your progress and view your profile. 
              </p>
            </section>
            <section className="bg-black/80 p-4 rounded-lg shadow-md text-xl">
            <div className="flex justify-between align-middle">
              <h2 className="mb-2 font-mono">Complete Quests</h2>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
              </svg>
            </div>
              <p className="text-sm text-gray-400">
                Complete chapters in the quest log to unlock new quests and rewards.
              </p>
            </section>
            <section className="bg-black/80 p-4 rounded-lg shadow-md text-xl">
            <div className="flex justify-between align-middle">
              <h2 className="mb-2 font-mono">Earn Badges</h2>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
              </svg>
            </div>
              <p className="text-sm text-gray-400">
                Earn badges along the way for each quest you complete.
              </p>
            </section>
            <section className="bg-black/80 p-4 rounded-lg shadow-md text-xl">
            <div className="flex justify-between align-middle">
            <h2 className="mb-2 font-mono">Level Up</h2>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
              </svg>
            </div>
              <p className="text-sm text-gray-400">
                Grow as a developer and become a better portfolio builder. 
              </p>
            </section>
          </article>
    </div>
  );
}