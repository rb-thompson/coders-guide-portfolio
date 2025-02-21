"use client";

import { useUser } from "../contexts/UserContext";
import { chapters } from "../chapters/chapters";
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
        <h1 className="text-6xl font-bold mb-4 px-2">
            Portfolio
        </h1>
      <p className="text-base sm:text-lg md:text-xl mb-8 text-center opacity-80">
        Okay {user.name}, is it time to celebrate?!
      </p>

      <section className="w-full max-w-5xl backdrop-blur-sm p-4 sm:p-6 flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-mono mb-6 text-indigo-300 drop-shadow-[0_0_8px_rgba(79,70,229,0.5)]">
          Your Earned Badges
        </h2>
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
        {earnedBadges.length === 0 && (
          <p className="text-base sm:text-lg text-pink-400 opacity-75 mt-4">
            No badges yet—embark on some quests to unlock your galactic rewards!
          </p>
        )}
      </section>
    </div>
  );
}