"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import { chapters } from '../chapters/chapters'; // Import chapters to map badge IDs
import React from 'react';

type User = {
  email: string;
  name: string;
  image?: string;
  password?: string;
  completedQuests?: string[];
  badges?: string[];
};

// Define Badge type based on assumed chapters structure
type Badge = {
  id: string;
  name: string;
  icon: string; // Emoji like "⭐" or "🚀"
};

export default function Profile() {
  const router = useRouter();
  const { user, setUser } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex items-center justify-center">
        <p className="text-xl font-mono text-gray-400">
          Please <a href="/login" className="text-indigo-400">log in</a> to access your Galactic Profile
        </p>
      </div>
    );
  }

  const handleResetProgress = () => {
    if (window.confirm('WARNING, Traveler! This will erase your cosmic quest log and badges from the Data Galaxy. Proceed?')) {
      const updatedUser = { ...user, completedQuests: [], badges: [] };
      setUser(updatedUser);
      if (typeof window !== 'undefined') {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        const userIndex = storedUsers.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
          storedUsers[userIndex] = updatedUser;
          localStorage.setItem('users', JSON.stringify(storedUsers));
        }
      }
    }
  };

  // Map user's badge IDs to full badge objects from chapters
  const earnedBadges: Badge[] = chapters
    .flatMap(chapter => chapter.quests)
    .filter(quest => quest.badge && (user.badges ?? []).includes(quest.badge.id))
    .map(quest => quest.badge as Badge);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex flex-col items-center justify-start p-4 sm:p-6">
      <motion.div
        className="w-full max-w-3xl p-4 bg-black/90 rounded-lg shadow-lg font-mono"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-6xl font-bold mb-4 px-2">
            Profile
        </h1>
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          {user.image ? (
            <img
              src={user.image}
              alt={`${user.name}'s cosmic avatar`}
              className="w-16 h-16 rounded-full border-2 border-indigo-500"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-900/50 border-2 border-indigo-500 flex items-center justify-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
          )}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-normal text-blue-500">
              {user.name}
            </h1>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>

        {/* Galactic Stats */}
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-300">Galactic Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-900/50 rounded-lg">
              <p className="text-sm text-gray-400">Quests Conquered</p>
              <p className="text-lg text-gray-200">
                {user.completedQuests?.length || 0}
              </p>
            </div>
            <div className="p-3 bg-gray-900/50 rounded-lg">
              <p className="text-sm text-gray-400">Cosmic Badges</p>
              <p className="text-lg text-gray-200">
                {user.badges?.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-300">Stellar Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {earnedBadges.length > 0 ? (
              earnedBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  className="p-3 bg-gray-900/50 rounded-lg text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-2xl text-yellow-400 filter drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]">
                    {badge.icon}
                  </span>
                  <p className="text-sm text-gray-200 mt-1">{badge.name}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-sm text-gray-400 col-span-full">
                No badges yet. Venture forth to earn your stars!
              </p>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center">
            <section className="p-1 rounded-xl mb-8">
            <motion.button
            className="text-red-400 hover:text-red-300 transition-colors font-normal text-sm sm:text-base tracking-wide py-1 px-2 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={handleResetProgress}
          >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>

            <span className='text-sm'>Reset quest progress (DANGER: Irreversible!)</span>
          </motion.button>
            </section>
          <motion.button
            className="text-gray-300 hover:text-indigo-400 transition-colors font-normal text-base sm:text-lg tracking-wider py-2 px-0 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-start space-x-2"
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => router.push('/chapters')}
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
                d="M15 15l-6-6m0 0l6-6m-6 6h12"
              />
            </svg>
            <span>Continue Your Quests</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}