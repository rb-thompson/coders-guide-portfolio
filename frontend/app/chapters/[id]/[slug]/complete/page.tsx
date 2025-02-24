"use client";

// Quest completion celebration page
// Shows a victory message with confetti and next steps

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { chapters } from "@/chapters/chapters";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useState, useEffect } from "react";
import { type ISourceOptions } from "@tsparticles/engine"; // Explicit type import

export default function QuestComplete() {
  const router = useRouter();
  const { getCurrentChapter, getCurrentQuest, setCurrentQuest } = useUser();
  const [init, setInit] = useState(false); // Tracks particle engine init

  // Initialize particle engine for confetti
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // Slim version for performance
    }).then(() => setInit(true));
  }, []);

  const chapter = getCurrentChapter();
  const quest = getCurrentQuest();

  // Fallback if no chapter or quest is set
  if (!chapter || !quest) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl mb-8 bg-indigo-600/30 shadow-md p-8 rounded-2xl font-mono">
          Oops!
        </h1>
        <p className="text-xl text-center font-mono">
          <span className="text-neutral-400"><em>Inspecting anamolies..</em></span> <br /> <br />
          ← <Link href={"/chapters"} className="text-white border-b-2 hover:border-b-4 border-indigo-400">
          Let’s get you back home
          </Link>.
        </p>
      </main>
    );
  }

  const chapterId = chapter.id;
  const questIndex = chapter.quests.findIndex((q) => q.id === quest.id);
  const nextQuest = questIndex !== -1 && questIndex + 1 < chapter.quests.length ? chapter.quests[questIndex + 1] : undefined;
  const nextChapter = chapters.find((ch) => ch.id === chapterId + 1);

  // Confetti options with full ISourceOptions typing
  const confettiOptions: ISourceOptions = {
    fullScreen: { enable: false }, // Keeps particles within component bounds
    particles: {
      number: {
        value: 100, // Number of confetti pieces
        density: { enable: false }, // No density adjustment
      },
      color: {
        value: ["#4f46e5", "#22d3ee", "#10b981"], // Indigo, cyan, green
      },
      shape: {
        type: "circle", // Simple round confetti
      },
      opacity: {
        value: 1, // Fully opaque
      },
      size: {
        value: { min: 2, max: 5 }, // Varied sizes for effect
      },
      move: {
        enable: true,
        speed: 6, // Fast fall
        direction: "top", // Rise then fall
        outModes: "destroy", // Remove when off-screen (correct prop name)
      },
      life: {
        duration: 2, // 2-second burst
        count: 1, // One-time spawn
      },
    },
    detectRetina: true, // Crisp on high-DPI screens
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex flex-col items-center justify-center p-6">
      {/* Confetti burst on completion */}
      {init && (
        <Particles
          id="confetti"
          options={confettiOptions} // Typed options passed here
          className="absolute inset-0 z-0 pointer-events-none"
        />
      )}
      <article className="text-center relative z-10">
      {/* Victory header */}
        <header>
          <motion.h1
            className="font-mono text-4xl md:text-6xl text-blue-500 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            aria-label="Quest Completed Celebration"
          >
            Isn’t it sweet?
          </motion.h1>
        </header>

        {/* Celebration message with badge */}
        <section>
          <motion.p
            className="font-mono text-lg text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            aria-label="Celebration Message"
          >
            You’ve activated the Cosmic Console and earned the {quest.badge.icon} {quest.badge.name} badge! <br />
            “In the galaxy of code, every command counts.”
          </motion.p>
        </section>
        <footer className="space-y-4">
          {nextQuest ? (
              <div className="action-group">
              <button
                className="font-mono text-gray-200 hover:text-indigo-400 transition-colors text-lg py-2 px-4 border border-indigo-500/20 rounded me-2 mb-2 md:mb-0"
                onClick={() => router.push("/chapters")}
                aria-label="Return to All Chapters"
              >
                Back to Chapters
              </button>
              <Link href={`/chapters/${chapterId}/${nextQuest.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <button
                  className="font-mono text-gray-200 hover:text-indigo-400 transition-colors text-lg py-2 px-4 border border-indigo-500/20 rounded"
                  aria-label={`Start next quest: ${nextQuest.title}`}
                  onClick={() => setCurrentQuest(chapterId, nextQuest.id)}
                >
                  Next Quest: {nextQuest.title}
                </button>
              </Link>
            </div>
          ) : nextChapter ? (
            <Link href={`/chapters/${nextChapter.id}`}>
              <button
                className="font-mono text-gray-200 hover:text-indigo-400 transition-colors text-lg py-2 px-4 border border-indigo-500/20 rounded"
                aria-label={`Start next chapter: ${nextChapter.title}`}
              >
                Next Chapter: {nextChapter.title}
              </button>
            </Link>
          ) : (
            <button
              className="font-mono text-gray-200 hover:text-indigo-400 transition-colors text-lg py-2 px-4 border border-indigo-500/20 rounded"
              onClick={() => router.push("/chapters")}
              aria-label="Return to All Chapters"
            >
              Back to Chapters
            </button>
          )}
        </footer>
      </article>
    </main>
  );
}