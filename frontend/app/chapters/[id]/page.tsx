"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { chapters } from "@/chapters/chapters";
import { useUser } from "@/contexts/UserContext";


export default function ChapterDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { user, completeQuest } = useUser();
  const resolvedParams = React.use(params);
  const chapterId = parseInt(resolvedParams.id, 10);
  const chapter = chapters.find((ch) => ch.id === chapterId);

  if (!chapter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex items-center justify-center">
        <p className="text-xl font-mono text-gray-400">Chapter not found</p>
      </div>
    );
  }

  const isQuestCompleted = (questId: number) => {
    return user && user.completedQuests ? user.completedQuests.includes(`${chapterId}-${questId}`) : false;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex flex-col items-center justify-start p-6">
      <motion.article
        className="w-10/12 md:w-3/5 p-4 bg-black/90 rounded-lg shadow-lg font-mono"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        role="region"
        aria-label={`Chapter ${chapter.id}: ${chapter.title}`}
      >
        <header className="grid grid-cols-[5fr_3fr] gap-4 justify-between mb-2">
          <h1 className="text-2xl md:text-3xl font-normal text-blue-500" aria-label={chapter.title}>
            {chapter.title}
          </h1>
          <span className="w-auto h-8 rounded-lg bg-indigo-700/30 border-2 border-indigo-500 flex items-center justify-center text-gray-200 font-normal">
            Chapter {chapter.id}
          </span>
        </header>
        <p className="text-sm tracking-wide text-gray-400 mb-6">{chapter.description}</p>
        <section className="quests">
          <h2 className="text-xl font-semibold mb-4 text-gray-300" aria-label="Available Quests">
            Quests
          </h2>
          {chapter.quests.map((quest) => (
            <article key={quest.id} className="mb-4 relative">
              <div className={`p-3 bg-gray-900/50 rounded-lg flex justify-between items-center ${!user ? "opacity-50" : ""}`}>
                <div>
                  <h3 className="text-lg font-normal text-gray-200" aria-label={quest.title}>
                    {quest.title}
                  </h3>
                  <p className="text-sm text-gray-400">{quest.description}</p>
                </div>
                {user && (
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded ${
                      isQuestCompleted(quest.id) ? "bg-green-500 text-white" : "bg-gray-600 text-gray-300"
                    }`}
                    aria-label={isQuestCompleted(quest.id) ? "Quest Completed" : "Quest Incomplete"}
                  >
                    {isQuestCompleted(quest.id) ? "Completed" : "Incomplete"}
                  </span>
                )}
              </div>
              {!user ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg">
                  <span className="text-gray-400 font-semibold" aria-label="Login required to access quest">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                  </span>
                </div>
              ) : (
                <Link href={`/chapters/${chapterId}/${quest.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  <motion.button
                    className="mt-2 text-gray-300 hover:text-indigo-400 transition-colors font-normal text-sm py-1 px-2 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-start space-x-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    aria-label={`Start ${quest.title} quest`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Start Quest</span>
                  </motion.button>
                </Link>
              )}
            </article>
          ))}
        </section>
        {!user ? (
          <p className="text-neutral-500 text-center">
            <a href="/login" className="text-indigo-400">Log in</a> or{" "}
            <a href="/signup" className="text-indigo-400">sign up</a> to unlock access.
          </p>
        ) : (
          <p className="text-neutral-500 text-center">
            <button
              onClick={() => router.push("/portfolio")}
              className="text-indigo-400"
              aria-label="View earned badges"
            >
              View badges
            </button>{" "}
            you’ve earned.
          </p>
        )}
        <footer className="mt-6">
          <motion.button
            className="text-gray-300 hover:text-indigo-400 transition-colors font-normal text-lg tracking-wider py-2 px-0 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-start space-x-2"
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => router.push("/chapters")}
            aria-label="Return to Chapters"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-6-6m0 0l6-6m-6 6h12" />
            </svg>
            <span>Back to Chapters</span>
          </motion.button>
        </footer>
      </motion.article>
    </main>
  );
}