"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { chapters } from './chapters';
import { useUser } from '../contexts/UserContext';

export default function Chapters() {
  const [visibleChapters, setVisibleChapters] = useState(3);
  const { user } = useUser();
  console.log('Chapters component - User state:', user); // Debug log

  // Debug log to verify user state changes
  useEffect(() => {
    console.log('Chapters component - User state updated:', user);
  }, [user]);

  const showMoreChapters = () => {
    setVisibleChapters(prev => Math.min(prev + 3, chapters.length));
  };

  const getChapterProgress = (chapterId: number) => {
    if (!user) return 0; // No user = 0% (gray bar will override)
    const chapter = chapters.find(ch => ch.id === chapterId);
    if (!chapter) return 0;
    const totalQuests = chapter.quests.length;
    const completed = chapter.quests.filter(quest => 
      (user.completedQuests || []).includes(`${chapterId}-${quest.id}`)
    ).length;
    return Math.round((completed / totalQuests) * 100); // Round for display
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex flex-col items-center justify-start p-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center font-mono">
        Embark on Cosmic Quests
      </h1>
      <div className="w-full max-w-3xl">
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-indigo-500/50" />
          {chapters.slice(0, visibleChapters).map((chapter, index) => (
            <Link key={chapter.id} href={`/chapters/${chapter.id}`}>
              <motion.div
                key={user ? `${chapter.id}-${user.email}` : chapter.id} // Unique key based on user state
                className={`relative mb-12 ${index % 2 === 0 ? 'left-0' : 'right-0'} w-5/6 md:w-3/5 p-4 bg-black/90 rounded-lg shadow-lg font-mono ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} flex flex-col justify-between cursor-pointer`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)" }} // Card hover feedback
              >
                <div>
                  <div className="grid grid-cols-[5fr_3fr] gap-4 justify-between mb-2">
                    <span className="text-2xl font-normal text-blue-500">{chapter.title}</span>
                    <span className="w-auto h-8 rounded-lg bg-indigo-700/30 border-2 border-indigo-500 flex items-center justify-center text-gray-200 font-normal">
                      Chapter {chapter.id}
                    </span>
                  </div>
                  <p className="text-sm tracking-wide text-gray-400 font-sans">{chapter.description}</p>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-700 rounded-full h-4 relative flex items-center justify-center">
                    <div
                      className={`h-4 rounded-full me-auto ${user ? 'bg-indigo-500' : 'bg-gray-500'}`}
                      style={{ width: user ? `${getChapterProgress(chapter.id)}%` : '100%' }}
                    ></div>
                    <span className="absolute text-xs font-mono text-white">
                      {user ? `${getChapterProgress(chapter.id)}%` : 'Locked'}
                    </span>
                  </div>
                </div>
                <div className="mt-1 flex items-center justify-start space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                  </svg>
                  <motion.span
                    className="text-gray-300 hover:text-indigo-400 transition-colors text-lg tracking-wider font-mono"
                    whileHover={{ color: "#818cf8" }} // Indigo-400
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {chapter.action}
                  </motion.span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        {visibleChapters < chapters.length && (
          <button 
            onClick={showMoreChapters}
            className="mx-auto mt-6 text-gray-300 border border-gray-300 font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline flex gap-2 font-mono"
          >
            <span>Show More</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}