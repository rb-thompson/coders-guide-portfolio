"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

const chapters = [
  { id: 1, title: 'Getting Started', description: 'Learn the basics while you complete your first quest.', action: 'First Things First' },
  { id: 2, title: 'Mission to Planet DataFrame', description: 'Navigate through the mysterious world of data manipulation.', action: 'Embark on Mission' },
  { id: 3, title: 'The Black Hole of Data Visualization', description: 'Dive into the abyss and emerge with stunning charts.', action: 'Explore the Unknown' },
  { id: 4, title: 'Portfolios and the Chisel', description: 'Expand your definition of a portfolio and success.', action: 'Carve it Out' },
];

export default function Quests() {
  const [visibleChapters, setVisibleChapters] = useState(3);

  const showMoreChapters = () => {
    setVisibleChapters(prev => Math.min(prev + 3, chapters.length));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-800 text-gray-200 flex flex-col items-center justify-start p-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
        Embark on Cosmic Quests
      </h1>
      <div className="w-full max-w-3xl">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-indigo-500/50" />
          {chapters.slice(0, visibleChapters).map((chapter, index) => (
            <motion.div 
              key={chapter.id}
              className={`relative mb-12 ${index % 2 === 0 ? 'left-0' : 'right-0'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
            >
              <div className={`w-5/6 md:w-3/5 p-4 bg-black/90 rounded-lg shadow-xl ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} flex flex-col justify-between`}>
                <div>
                    <div className="grid grid-cols-[5fr_3fr] gap-4 justify-between mb-2">
                        <span className="text-2xl font-normal text-blue-500">{chapter.title}</span>
                        <span className="w-auto h-6 rounded-lg bg-indigo-400/20 flex items-center justify-center text-gray-200 text-sm font-normal">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                            </svg>
                            Chapter {chapter.id}
                        </span>
                    </div>
                    <p className="text-sm tracking-wide text-gray-400">{chapter.description}</p>
                </div>
                <motion.button 
                className="mt-1 text-gray-300 hover:text-white transition-colors font-normal text-lg tracking-wider py-2 px-0 rounded focus:outline-none focus:shadow-outline w-full relative overflow-hidden flex items-center justify-start space-x-2"
                aria-label={`Start ${chapter.title}`}
                whileHover={{ x: 2 }} // Slight shift on hover
                transition={{ type: "spring", stiffness: 300 }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                    </svg>
                    <span className='font-mono'>{chapter.action}</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        {visibleChapters < chapters.length && (
          <button 
            onClick={showMoreChapters}
            className="mx-auto mt-6 text-gray-300 border border-gray-300 font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline flex gap-2"
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