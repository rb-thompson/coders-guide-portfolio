"use client";

import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Call an API here to authenticate
    // For now, we'll simulate with local storage
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (storedUser.email === email && storedUser.password === password) {
      setUser({ email, name: storedUser.name, image: storedUser.image });
      router.push('/quests'); // Redirect to quests page after login
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 to-blue-700 text-gray-200">
        <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5 }}
        >
            <form onSubmit={handleLogin} className="bg-black/80 p-8 rounded-lg shadow-lg max-w-md m-1">
                <h2 className="text-2xl mb-4 text-center">Welcome back, pilgrim.</h2>
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
                    className="bg-blue-500 hover:bg-blue-700 text-white font-normal text-xl py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Sign In
                </button>
                <Link href="/signup" className="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-white">
                    New user? Sign Up →
                </Link>
                </div>
            </form>
        </motion.div>
    </div>
  );
}