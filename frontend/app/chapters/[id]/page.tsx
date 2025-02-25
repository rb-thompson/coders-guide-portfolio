"use client";

// Chapter detail page
// Displays quests for a specific chapter with completion status and navigation

import { useRouter } from "next/navigation"; // For routing and URL params
import { motion } from "framer-motion"; // Smooth animations
import { useUser } from "@/contexts/UserContext"; // User state for quest progress
import { chapters } from "@/chapters/chapters"; // Static chapter data

export default function ChapterDetail() {
  const router = useRouter();
  const { user, setCurrentQuest, getCurrentChapter } = useUser();
  const chapter = getCurrentChapter();

  if (!chapter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex items-center justify-center">
        <p className="text-xl font-mono text-gray-400">Select a chapter first</p>
      </div>
    );
  }

  const chapterId = chapter.id;

  const isQuestCompleted = (questId: number) => {
    return user && user.completedQuests
      ? user.completedQuests.includes(`${chapterId}-${questId}`)
      : false;
  };

  const handleQuestSelect = (questId: number) => {
    setCurrentQuest(chapterId, questId);
    const quest = chapter.quests.find((q) => q.id === questId);
    const slug = quest?.title.toLowerCase().replace(/\s+/g, "-");
    router.push(`/chapters/${chapterId}/${slug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex flex-col items-center justify-start p-6">
      {/* Chapter container with fade-in animation */}
      <motion.div
        className="w-8/10 md:w-3/5 p-4 bg-black/90 rounded-lg shadow-lg font-mono"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="grid grid-cols-[5fr_3fr] gap-4 justify-between mb-2">
          <h1 className="text-2xl md:text-3xl font-normal text-blue-500">{chapter.title}</h1>
          <span className="w-auto h-8 rounded-lg bg-indigo-700/30 border-2 border-indigo-500 flex items-center justify-center text-gray-200 font-normal">
            Chapter {chapter.id}
          </span>
        </div>
        <p className="text-sm tracking-wide text-gray-400 mb-6">{chapter.description}</p>

        <div className="quests">
          <h2 className="text-xl font-semibold mb-4 text-gray-300">Quests</h2>
          {chapter.quests.map((quest) => (
            <div key={quest.id} className="mb-4 relative">
              <div
                className={`p-3 ${
                  user && isQuestCompleted(quest.id) ? "bg-indigo-700" : "bg-gray-900/50"
                } rounded-lg flex justify-between items-center ${!user ? "opacity-50" : ""}`}
              >
                <div>
                  <h3 className="text-lg font-normal text-gray-200">{quest.title}</h3>
                  <p className="text-sm text-gray-400">{quest.description}</p>
                </div>
                {user && (
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded ${
                      isQuestCompleted(quest.id) ? "bg-green-500 text-white" : "bg-gray-600 text-gray-300"
                    }`}
                  >
                    {isQuestCompleted(quest.id) ? "Completed" : "Incomplete"}
                  </span>
                )}
              </div>

              {user ? (
                isQuestCompleted(quest.id) ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg">
                    <motion.span
                      className="text-green-500 flex"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0.4, 0.7, 1], scale: [4, 0.7, 1] }}
                      transition={{ duration: 0.8 }}
                    >
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
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </motion.span>
                  </div>
                ) : (
                  <motion.button
                    className="mt-2 text-gray-300 hover:text-indigo-400 transition-colors font-normal text-sm py-1 px-2 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-start space-x-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    aria-label={`Start quest: ${quest.title}`}
                    onClick={() => handleQuestSelect(quest.id)} // Replaced Link with onClick
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7v14" />
                    </svg>
                    <span>Start Quest</span>
                  </motion.button>
                )
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg">
                  <span className="text-gray-400 font-semibold">
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
              )}
            </div>
          ))}
        </div>

        {!user ? (
          <p className="text-neutral-500 text-center">
            <a href="/login" className="text-indigo-400">Log in</a> or{" "}
            <a href="/signup" className="text-indigo-400">sign up</a> to unlock access.
          </p>
        ) : (
          <p className="text-neutral-500 text-center">
            <button onClick={() => router.push("/portfolio")} className="text-indigo-400">
              View badges
            </button>{" "}
            you’ve earned.
          </p>
        )}

        <motion.button
          className="mt-6 text-gray-300 hover:text-indigo-400 transition-colors font-normal text-lg tracking-wider py-2 px-0 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-start space-x-2"
          whileHover={{ x: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => router.push("/chapters")}
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
      </motion.div>
    </div>
  );
}