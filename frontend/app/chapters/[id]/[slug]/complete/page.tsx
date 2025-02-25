"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUser } from "@/contexts/UserContext";
import { chapters } from "@/chapters/chapters";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useState, useEffect } from "react";
import { type ISourceOptions } from "@tsparticles/engine";

export default function QuestComplete() {
  const router = useRouter();
  const { getCurrentChapter, getCurrentQuest, setCurrentQuest } = useUser();
  const [init, setInit] = useState(false);
  const [countdown, setCountdown] = useState(9);
  const [showConfetti, setShowConfetti] = useState(true); // New state to control confetti

  // Initialize particle engine for confetti
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  // Confetti burst control: hide after 2 seconds
  useEffect(() => {
    if (init && showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 2000); // Matches life.duration in confettiOptions
      return () => clearTimeout(timer);
    }
  }, [init, showConfetti]);

  // Countdown timer logic
  useEffect(() => {
    const chapter = getCurrentChapter();
    const quest = getCurrentQuest();
    const chapterId = chapter?.id;
    const questIndex = chapter && quest ? chapter.quests.findIndex((q) => q.id === quest.id) : -1;
    const nextQuest = chapter && questIndex !== -1 && questIndex + 1 < chapter.quests.length ? chapter.quests[questIndex + 1] : undefined;

    if (nextQuest && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0 && nextQuest && chapterId) {
      setCurrentQuest(chapterId, nextQuest.id);
      router.push(`/chapters/${chapterId}/${nextQuest.title.toLowerCase().replace(/\s+/g, "-")}`);
    }
  }, [countdown, getCurrentChapter, getCurrentQuest, setCurrentQuest, router]);

  const chapter = getCurrentChapter();
  const quest = getCurrentQuest();

  if (!chapter || !quest) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl mb-8 bg-indigo-600/30 shadow-md p-8 rounded-2xl font-mono">Oops!</h1>
        <p className="text-xl text-center font-mono">
          <span className="text-neutral-400">
            <em>Inspecting anomalies..</em>
          </span>{" "}
          <br /> <br />←{" "}
          <button
            onClick={() => router.push("/chapters")}
            className="text-white border-b-2 hover:border-b-4 border-indigo-400"
          >
            Let’s get you back home
          </button>
          .
        </p>
      </main>
    );
  }

  const chapterId = chapter.id;
  const questIndex = chapter.quests.findIndex((q) => q.id === quest.id);
  const nextQuest = questIndex !== -1 && questIndex + 1 < chapter.quests.length ? chapter.quests[questIndex + 1] : undefined;
  const nextChapter = chapters.find((ch) => ch.id === chapterId + 1);

  const confettiOptions: ISourceOptions = {
    fullScreen: { enable: false },
    particles: {
      number: { value: 100 },
      color: { value: ["#4f46e5", "#22d3ee", "#10b981"] },
      shape: { type: "circle" },
      opacity: { value: .8 },
      size: { value: { min: 2, max: 5 } },
      move: { enable: true, speed: 6, direction: "top", outModes: "destroy" },
      life: { duration: 2, count: 1 },
    },
    detectRetina: true,
  };

  const shimmerVariants = {
    shimmer: {
      backgroundPosition: ["-200%", "200%"],
      transition: { duration: 2, repeat: Infinity, ease: "linear" },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex flex-col items-center justify-center p-6">
      {init && showConfetti && ( // Only show Particles when showConfetti is true
        <Particles
          id="confetti"
          options={confettiOptions}
          className="absolute inset-0 z-0 pointer-events-none"
        />
      )}
      <article className="text-center relative z-10">
        <header>
          <motion.h1
            className="font-mono text-4xl md:text-6xl text-blue-500 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            aria-label="Quest Completed Celebration"
          >
            Victory!
          </motion.h1>
        </header>

        <section>
          <motion.p
            className="font-mono text-lg text-gray-300 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            aria-label="Success Message"
          >
            You’ve conquered <span className="text-blue-400">{quest.title}</span> and earned the{" "}
            <span className="text-indigo-400">{quest.badge?.name}</span> badge!
          </motion.p>
          {quest.badge && (
            <motion.div
              className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500 bg-[length:200%_100%] text-white font-mono rounded-md mx-auto"
              variants={shimmerVariants}
              animate="shimmer"
              aria-label={`Badge: ${quest.badge.name}`}
            >
              {quest.badge.icon} {quest.badge.name}
            </motion.div>
          )}
        </section>

        <footer className="space-y-4 mt-8">
          {nextQuest ? (
            <div className="action-group">
              <button
                className="font-mono text-gray-200 hover:text-indigo-400 transition-colors text-lg py-2 px-4 border border-indigo-500/20 rounded me-2 mb-2 md:mb-0"
                onClick={() => router.push("/chapters")}
                aria-label="Return to All Chapters"
              >
                Back to Chapters
              </button>
              <button
                className="font-mono text-gray-200 hover:text-indigo-400 transition-colors text-lg py-2 px-4 border border-indigo-500/20 rounded"
                onClick={() => {
                  setCurrentQuest(chapterId, nextQuest.id);
                  router.push(`/chapters/${chapterId}/${nextQuest.title.toLowerCase().replace(/\s+/g, "-")}`);
                }}
                aria-label={`Start next quest: ${nextQuest.title}`}
              >
                Next Quest: {nextQuest.title} ({countdown}s)
              </button>
            </div>
          ) : nextChapter ? (
            <button
              className="font-mono text-gray-200 hover:text-indigo-400 transition-colors text-lg py-2 px-4 border border-indigo-500/20 rounded"
              onClick={() => router.push(`/chapters/${nextChapter.id}`)}
              aria-label={`Start next chapter: ${nextChapter.title}`}
            >
              Next Chapter: {nextChapter.title}
            </button>
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