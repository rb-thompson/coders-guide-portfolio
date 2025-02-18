"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type User = {
  email: string;
  name: string;
  image?: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void; // Add logout function
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(() => {
    if (typeof window !== 'undefined') { // Check if we're in a browser environment
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser && typeof window !== 'undefined') { // Again, check for browser environment
      localStorage.setItem('user', JSON.stringify(newUser));
    } else if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        setUserState(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};