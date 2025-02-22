"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { chapters } from "@/chapters/chapters";

type Params = { id: string; slug: string };

export default function QuestComplete({ params }: { params: Params }) {
  const router = useRouter();
  const chapterId = parseInt(params.id, 10);
  const slug = params.slug;
  const chapter = chapters.find((ch) => ch.id === chapterId);
  const questIndex = chapter?.quests.findIndex((q) => q.title.toLowerCase().replace(/\s+/g, "-") === slug);
  const quest = questIndex !== undefined && questIndex !== -1 ? chapter?.quests[questIndex] : undefined;
  const nextQuest = questIndex !== undefined && questIndex !== -1 && questIndex + 1 < (chapter?.quests.length ?? 0)
    ? chapter?.quests[questIndex + 1]
    : undefined;
  const nextChapter = chapters.find((ch) => ch.id === chapterId + 1);

  if (!chapter || !quest) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex flex-col items-center justify-center p-6">
        <p className="text-xl font-mono text-gray-400">Quest not found</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex flex-col items-center justify-center p-6">
      <article className="text-center">
        <header>
          <motion.h1
            className="font-mono text-3xl md:text-4xl text-blue-500 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            aria-label="Quest Completed Celebration"
          >
            Cosmic Victory!
          </motion.h1>
        </header>
        <section>
          <motion.p
            className="font-mono text-lg text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            aria-label="Celebration Message"
          >
            You’ve activated the Cosmic Console and earned the {quest.badge.name} badge! <br />
            “In the galaxy of code, every command counts.”
          </motion.p>
        </section>
        <footer className="space-y-4">
          {nextQuest ? (
            <Link href={`/chapters/${chapterId}/${nextQuest.title.toLowerCase().replace(/\s+/g, "-")}`}>
              <button
                className="font-mono text-gray-200 hover:text-indigo-400 transition-colors text-lg py-2 px-4 border border-indigo-500/20 rounded"
                aria-label={`Start next quest: ${nextQuest.title}`}
              >
                Next Quest: {nextQuest.title}
              </button>
            </Link>
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