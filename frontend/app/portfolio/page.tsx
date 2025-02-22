"use client";

import { useUser } from "@/contexts/UserContext";
import { chapters } from "@/chapters/chapters";
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Portfolio() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const earnedBadges = (user.badges ?? []).map((badgeId) => {
    const badge = chapters
      .flatMap((chapter) => chapter.quests)
      .find((quest) => quest.badge.id === badgeId)?.badge;
    return badge;
  }).filter((badge): badge is { id: string; name: string; icon: string } => badge !== undefined);

  const allBadges = chapters.flatMap((chapter) =>
    chapter.quests.map((quest) => ({
      badge: quest.badge,
      questTitle: quest.title,
      chapterTitle: chapter.title,
    }))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex flex-col items-center justify-start p-4 sm:p-6">
      <motion.div
        className="w-full max-w-3xl p-4 bg-black/90 rounded-lg shadow-lg font-mono"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-6xl font-bold mb-4 px-2">
            Portfolio
        </h1>
      <p className="text-base sm:text-lg md:text-xl mb-6 text-center opacity-80">
        Behold, {user.name}! Your shining achievements.
      </p>

      <section className="w-full max-w-5xl backdrop-blur-sm p-4 sm:p-6 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-mono mb-4 text-indigo-400 drop-shadow-[0_0_8px_rgba(79,70,229,0.5)]">
          Your Earned Badges
        </h2>
        {earnedBadges.length === 0 && (
          <div className="flex flex-row gap-4 items-center align-middle mb-4 px-2 text-pink-400 opacity-75">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20 md:size-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
            <p className="text-base sm:text-lg">
            No badges yet—embark on a quest to unlock galactic rewards!
            </p>
          </div>
        )}
        <div className="w-full grid grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {allBadges.map(({ badge, questTitle, chapterTitle }) => {
            const isEarned = earnedBadges.some((earned) => earned.id === badge.id);
            return (
              <div
                key={badge.id}
                className={`group relative mx-auto bg-indigo-800/20 border-2 rounded-full flex flex-col items-center justify-center w-full aspect-square max-w-[10rem] sm:max-w-[12rem] transition-all duration-300 ease-in-out ${
                  isEarned
                    ? "border-indigo-500 hover:scale-105 hover:border-pink-500 cursor-pointer"
                    : "border-gray-700 opacity-60"
                }`}
              >
                <span
                  className={`text-3xl sm:text-4xl md:text-5xl mb-2 ${
                    isEarned
                      ? "group-hover:rotate-12 transition-transform duration-300"
                      : "filter grayscale"
                  }`}
                >
                  {badge.icon}
                </span>
                <span
                  className={`sr-only sm:not-sr-only text-xs sm:text-sm md:text-base text-center px-2 text-neutral-400 line-clamp-2 ${
                    isEarned ? "group-hover:text-cyan-300 transition-colors duration-300" : ""
                  }`}
                >
                  {badge.name}
                </span>
                {isEarned ? (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 rounded-full">
                      <span className="text-2xl sm:text-3xl md:text-4xl text-gray-500">🔒</span>
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                      Unlock with: {questTitle} ({chapterTitle})
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

      </section>
      </motion.div>
    </div>
  );
}