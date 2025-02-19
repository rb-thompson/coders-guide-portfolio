"use client";

import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { setUser } = useUser();
  const router = useRouter();

  const validateForm = () => {
    const errors: { name?: string; email?: string; password?: string } = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!email.match(/^\S+@\S+\.\S+$/)) errors.email = "Please enter a valid email";
    if (password.length < 6) errors.password = "Password must be at least 6 characters";
    return errors;
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Signing up with:', { email, name, password }); // Debug signup data
      setUser({ email, name, password, image: undefined });
      router.push('/quests');
    } else {
      setErrors(validationErrors);
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
        <form onSubmit={handleSignup} className="bg-black/80 p-8 m-1 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-normal mb-4 text-center">Let&apos;s get you in the system.</h2>
          <p className="text-blue-600 text-center pb-4">
              Portfolio projects can be cumbersome. <br />This guide <span className="text-gray-300 font-extralight">makes it fun.</span> 
              
              </p>
          <div className="mb-4">
          <label className="block mb-2 text-sm text-left font-normal" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="What do we call you?"
              required
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-left font-normal" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your Email"
              required
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm text-left font-normal" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
              required
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className=" bg-blue-500 hover:bg-blue-700 font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-xl"
            >
              Complete Signup
            </button>
          </div>
          <div className="flex justify-center mt-4">
              <Link href="/login" className="block font-normal text-sm text-blue-500 hover:text-white">
                  Already registered? Log In →
              </Link>
            </div>
        </form>
        </motion.div>
      </div>
    </div>
  );
}