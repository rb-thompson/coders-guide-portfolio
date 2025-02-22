"use client";

import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      router.push('/chapters');
    } else {
      setError('Incorrect email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-700 text-gray-200 overflow-hidden">
      <div className="pt-20 pb-6 flex items-start justify-center">
          <motion.div
              className="relative z-10 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5 }}
          >
              <form onSubmit={handleLogin} className="bg-black/80 p-8 rounded-lg shadow-lg w-96 m-1">
                  <h2 className="text-2xl mb-4 text-center">Welcome back.</h2>
                  {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                  <div className="mb-4">
                  <label className="block mb-2 text-sm font-normal text-left" htmlFor="email">Email</label>
                  <input 
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Your Email"
                      required
                  />
                  </div>
                  <div className="mb-6">
                  <label className="block mb-2 text-sm font-normal text-left" htmlFor="password">Password</label>
                  <input 
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Password"
                      required
                  />
                  </div>
                  <div className="flex items-center justify-between">
                  <button 
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-normal text-xl py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  >
                      Continue
                  </button>

                  </div>
                  <div className="flex justify-center mt-4">
                  <Link href="/signup" className="block font-normal text-sm text-blue-500 hover:text-white">
                      New user? Sign Up →
                  </Link>
                  </div>
                  <div className="flex flex-col justify-center mt-8">
                    <p className="text-gray-400 text-[10px] font-mono">&quot;I know my <span className="underline decoration-2 decoration-blue-500">rights</span>, I watch People&apos;s Court.&quot; - Alf</p>

                  </div>
              </form>
          </motion.div>
      </div>
    </div>
  );
}