// app/chapters/[id]/page.tsx
"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { chapters } from '../chapters';
import { useUser } from '../../contexts/UserContext';
import React from 'react';

export default function ChapterDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { user } = useUser();

  // Unwrap the params Promise using React.use()
  const resolvedParams = React.use(params);
  const chapterId = parseInt(resolvedParams.id, 10);

  // Find the chapter matching the ID
  const chapter = chapters.find(ch => ch.id === chapterId);

  // Handle case where chapter isn’t found
  if (!chapter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex items-center justify-center">
        <p className="text-xl font-mono text-gray-400">Chapter not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex flex-col items-center justify-start p-6">
      <motion.div
        className="w-5/6 md:w-3/5 p-4 bg-black/90 rounded-lg shadow-lg font-mono"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Chapter Header */}
        <div className="grid grid-cols-[5fr_3fr] gap-4 justify-between mb-2">
          <h1 className="text-2xl md:text-3xl font-normal text-blue-500">{chapter.title}</h1>
          <span className="w-auto h-8 rounded-lg bg-indigo-700/30 border-2 border-indigo-500 flex items-center justify-center text-gray-200 text-lg font-normal">
            Chapter {chapter.id}
          </span>
        </div>
        <p className="text-sm tracking-wide text-gray-400 mb-6">{chapter.description}</p>
        {/* Quests List */}
        <div className="quests">
          <h2 className="text-xl font-semibold mb-4 text-gray-300">Quests</h2>
          {chapter.quests.map(quest => (
            <div key={quest.id} className="mb-4 relative">
              <div className={`p-3 bg-gray-900/50 rounded-lg ${!user ? 'opacity-50' : ''}`}>
                <h3 className="text-lg font-normal text-gray-200">{quest.title}</h3>
                <p className="text-sm text-gray-400">{quest.description}</p>
              </div>
              {!user && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg">
                  <p className="text-gray-400 font-semibold">
                     
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 inline me-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    Login to Unlock
                    </p>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Back Button */}
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