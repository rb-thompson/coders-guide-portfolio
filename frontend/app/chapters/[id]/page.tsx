// app/chapters/[id]/page.tsx
"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { chapters } from '../chapters';
import { useUser } from '../../contexts/UserContext';
import React from 'react';

export default function ChapterDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { user, completeQuest } = useUser();
  const resolvedParams = React.use(params);
  const chapterId = parseInt(resolvedParams.id, 10);
  const chapter = chapters.find(ch => ch.id === chapterId);

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex flex-col items-center justify-start p-6">
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
          {chapter.quests.map(quest => (
            <div key={quest.id} className="mb-4 relative">
              <div className={`p-3 bg-gray-900/50 rounded-lg flex justify-between items-center ${!user ? 'opacity-50' : ''}`}>
                <div>
                  <h3 className="text-lg font-normal text-gray-200">{quest.title}</h3>
                  <p className="text-sm text-gray-400">{quest.description}</p>
                </div>
                {user && (
                  <span className={`text-sm font-semibold px-2 py-1 rounded ${isQuestCompleted(quest.id) ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300'}`}>
                    {isQuestCompleted(quest.id) ? 'Completed' : 'Incomplete'}
                  </span>
                )}
              </div>
              {!user ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg">
                  <span className="text-gray-400 font-semibold">Locked - Please Log In</span>
                </div>
              ) : !isQuestCompleted(quest.id) && (
                <motion.button
                  className="mt-2 text-gray-300 hover:text-indigo-400 transition-colors font-normal text-sm py-1 px-2 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-start space-x-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => completeQuest(chapterId, quest.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Mark as Complete</span>
                </motion.button>
              )}
            </div>
          ))}
        </div>
        <motion.button
          className="mt-6 text-gray-300 hover:text-indigo-400 transition-colors font-normal text-lg tracking-wider py-2 px-0 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-start space-x-2"
          whileHover={{ x: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => router.push('/chapters')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-6-6m0 0l6-6m-6 6h12" />
          </svg>
          <span>Back to Chapters</span>
        </motion.button>
      </motion.div>
    </div>
  );
}