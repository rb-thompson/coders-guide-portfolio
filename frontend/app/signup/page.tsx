"use client";

import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { setUser } = useUser();
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real scenario, send this data to a backend for validation and storage
    setUser({ email, name, image: undefined }); // No image for now
    router.push('/'); // Redirect to home after signup
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 to-blue-950 text-gray-200">
      <form onSubmit={handleSignup} className="bg-black/80 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Let's get you in the program.</h2>
        <p className="text-blue-600 text-center pb-4">
            Portfolio projects can be cumbersome. <br />This exercise <span className="text-gray-300 font-extralight">makes it fun.</span> 
            
            </p>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="What do we call you?"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold" htmlFor="email">Email</label>
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
          <label className="block mb-2 text-sm font-bold" htmlFor="password">Password</label>
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
            className=" text-blue-600 hover:text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-2xl"
          >
            Let's begin! →
          </button>
        </div>
      </form>
    </div>
  );
}