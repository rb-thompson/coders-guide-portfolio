"use client";

import { useRouter } from "next/navigation";
import { chapters } from "@/chapters/chapters";
import { useUser } from "@/contexts/UserContext";
import ExploreCosmicConsole from "@/quests/ExploreCosmicConsole";

export default function QuestPage({ params }: { params: { id: string; slug: string } }) {
  const router = useRouter();
  const { user, completeQuest } = useUser();
  const chapterId = parseInt(params.id, 10);
  const slug = params.slug;
  const chapter = chapters.find((ch) => ch.id === chapterId);
  const quest = chapter?.quests.find((q) => q.title.toLowerCase().replace(/\s+/g, "-") === slug);

  if (!chapter || !quest) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex flex-col items-center justify-center p-6">
        <p className="text-xl font-mono text-gray-400">Quest not found</p>
      </main>
    );
  }

  const handleComplete = () => {
    if (user) {
      completeQuest(chapterId, quest.id); // Mark quest as complete in UserContext
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex flex-col items-center justify-center p-6">
      <article className="w-full max-w-md bg-black/90 p-4 rounded-lg shadow-lg">
        <header className="mb-6">
          <h1
            className="font-mono text-2xl text-blue-500 text-center"
            aria-label={`Quest: ${quest.title}`}
          >
            {quest.title}
          </h1>
          <p className="font-mono text-sm text-gray-400 mt-2 text-center">{quest.description}</p>
        </header>
        <section aria-label="Quest Challenge">
          {quest.id === 1 && chapterId === 1 ? (
            <ExploreCosmicConsole
              chapterId={chapterId}
              questId={quest.id}
              onComplete={handleComplete}
            />
          ) : (
            <p className="font-mono text-sm text-gray-400 text-center">
              This quest is under construction. Check back soon!
            </p>
          )}
        </section>
        <footer className="mt-6 text-center">
          <button
            className="font-mono text-gray-300 hover:text-indigo-400 transition-colors text-lg py-2 px-0"
            onClick={() => router.push(`/chapters/${chapterId}`)}
            aria-label="Return to Chapter Details"
          >
            Back to Chapter
          </button>
        </footer>
      </article>
    </main>
  );
}