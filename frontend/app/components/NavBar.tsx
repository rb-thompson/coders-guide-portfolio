"use client"; // Mark this as a client component for interactivity

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react"; // For hamburger and close icons
import { useUser } from '../contexts/UserContext';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false); // Track mobile menu state
  const { user, logout } = useUser(); // Use logout from context

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false); // Explicitly close the menu

  return (
    <div>
      <nav className="bg-black/80 text-gray-200 p-4 flex justify-between items-center sticky top-0 z-20 font-light font-mono">
        <Link href="/" className="text-sm/3">
          <span className="block font-light">The Coder&apos;s Guide <span className=" text-gray-500">to</span></span>
          <span className="block text-center"><span className=" text-gray-500">the</span> Portfolio Project</span>
        </Link>
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-indigo-500 transition-colors">
            Home
          </Link>
          <Link href="/chapters" className="hover:text-indigo-500 transition-colors">
            Chapters
          </Link>
          <Link href="/portfolio" className="hover:text-indigo-500 transition-colors">
            Portfolio
          </Link>
          {user ? (
            <>
            <Link href="/profile" className="hover:text-indigo-500 transition-colors">
              Profile
            </Link>
            <button
              onClick={logout}
              className="hover:text-indigo-500 transition-colors focus:outline-none"
            >
              <motion.span whileHover={{ scale: 1.1, color: "#a5b4fc" }}>
                <LogOut size={24} />
              </motion.span>
            </button>
          </>
          ) : (
            <>
            <Link href="/login" className="hover:text-indigo-500 transition-colors">
              Log In
            </Link>
            <Link href="/signup" className="text-white hover:bg-indigo-500/10 border border-indigo-600 rounded-md px-3 transition-colors duration-500">
              Sign Up
            </Link>
          </>
          )}
        </div>
        {/* Hamburger Menu Icon (visible on small screens) */}
        <button
          className="md:hidden text-gray-200 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          <Menu size={24} />
        </button>
        
      </nav>
      {/* Mobile Menu (visible on small screens when open) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-black/90 text-gray-200 flex flex-col items-center justify-center z-30"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={closeMenu} 
          >
            {/* Close Button (X) in top-right corner */}
            <button
              className="absolute top-4 right-4 text-gray-200 focus:outline-none"
              onClick={closeMenu}
              aria-label="Close Menu"
            >
              <motion.div
                whileHover={{ color: "#818cf8" }} 
                transition={{ type: "spring", stiffness: 300 }}
              >
                <X size={32} />
              </motion.div>
            </button>
            {/* Prevent clicks on links from closing the menu */}
            <div onClick={(e) => e.stopPropagation()}>
              <Link
                href="/"
                className="text-2xl font-semibold mb-6 hover:text-indigo-300 transition-colors block"
                onClick={closeMenu}
              >
                <motion.span
                whileHover={{ color: "#818cf8" }} 
                transition={{ type: "spring", stiffness: 300 }}
                >
                  Home
                </motion.span>
              </Link>
              <Link
                href="/chapters"
                className="text-2xl font-semibold mb-6 hover:text-indigo-300 transition-colors block"
                onClick={closeMenu}
              >
                <motion.span
                whileHover={{ color: "#818cf8" }} 
                transition={{ type: "spring", stiffness: 300 }}
                >
                  Chapters
                </motion.span>
              </Link>
              <Link
                href="/portfolio"
                className="text-2xl font-semibold mb-6 hover:text-indigo-300 transition-colors block"
                onClick={closeMenu}
              >
                <motion.span
                  whileHover={{ color: "#818cf8" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Portfolio
                </motion.span>
              </Link>
              {user ? (
                <>
                <Link
                  href="/profile"
                  className="text-2xl font-semibold mb-6 hover:text-indigo-300 transition-colors block"
                  onClick={closeMenu}
                >
                  <motion.span
                    whileHover={{ color: "#818cf8" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Profile
                  </motion.span>
                </Link>
                <button
                  onClick={() => { logout(); closeMenu(); }}
                  className="text-2xl font-semibold mb-6 hover:text-indigo-300 transition-colors block"
                >
                  <motion.span
                    whileHover={{ color: "#818cf8" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Logout
                  </motion.span>
                </button>
              </>
              ) : (
                <>
                <Link 
                  href="/login" 
                  className="text-2xl font-semibold mb-6 hover:text-indigo-300 transition-colors block"
                  onClick={closeMenu}
                >
                  <motion.span
                    whileHover={{ color: "#818cf8" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Log In
                  </motion.span>
                </Link>
                <Link href="/signup" 
                  className="text-2xl font-semibold mb-6 border-b-2 border-indigo-500 hover:text-indigo-500 transition-colors block"
                  onClick={closeMenu}
                >
                  <motion.span
                    whileHover={{ color: "#818cf8" }} 
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Sign Up
                  </motion.span>
                </Link>
              </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}