"use client";

// Quest page for individual challenges
// Renders the current quest or a fallback if none selected

import { useRouter } from "next/navigation"; // For navigation control
import { useUser } from "@/contexts/UserContext"; // User state and quest management
import ExploreCosmicConsole from "@/quests/ExploreCosmicConsole"; // Specific quest component

export default function QuestPage() {
  const router = useRouter();
  const { user, completeQuest, getCurrentChapter, getCurrentQuest } = useUser(); // User context utilities

  // Fetch current chapter and quest from context
  const chapter = getCurrentChapter();
  const quest = getCurrentQuest();

  // Handle missing chapter or quest with a friendly fallback
  if (!chapter || !quest) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex flex-col items-center justify-center p-6">
        <p className="text-xl font-mono text-gray-400">
          Quest not found - please select a quest from the chapter page.
        </p>
      </main>
    );
  }

  const chapterId = chapter.id; // Extract chapter ID for routing and completion

  // Mark quest as complete and redirect (for logged-in users only)
  const handleComplete = () => {
    if (user) {
      completeQuest(chapterId, quest.id); // Update user progress
      router.push(`/chapters/${chapterId}/${quest.title.toLowerCase().replace(/\s+/g, "-")}/complete`); // Go to completion page
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex flex-col items-center justify-center p-6">
      {/* Quest container */}
      <article className="w-full max-w-md bg-black/90 p-4 rounded-lg shadow-lg">
        {/* Quest header */}
        <header className="mb-6">
          <h1
            className="font-mono text-2xl text-blue-500 text-center"
            aria-label={`Quest: ${quest.title}`}
          >
            {quest.title}
          </h1>
          <p className="font-mono text-sm text-gray-400 mt-2 text-center">{quest.description}</p>
        </header>

        {/* Quest challenge area */}
        <section aria-label="Quest Challenge">
          {quest.id === 1 && chapterId === 1 ? (
            // Render specific quest component (expand this for more quests!)
            <ExploreCosmicConsole
              chapterId={chapterId}
              questId={quest.id}
              onComplete={handleComplete} // Trigger completion logic
            />
          ) : (
            // Placeholder for unfinished quests
            <p className="font-mono text-sm text-gray-400 text-center">
              This quest is under construction. Check back soon!
            </p>
          )}
        </section>

        {/* Navigation footer */}
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