"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type User = {
  email: string;
  name: string;
  image?: string;
  password?: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
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
  // Check if we're in a browser environment before accessing localStorage
  const [user, setUserState] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser && typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify({ ...newUser, password: undefined }));
    } else if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };

  const login = (email: string, password: string) => {
    if (typeof window !== 'undefined') {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (storedUser.email === email && storedUser.password === password) {
        setUser({ email, name: storedUser.name, image: storedUser.image });
      } else {
        console.error('Login failed');
      }
    }
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'user') {
          setUserState(e.newValue ? JSON.parse(e.newValue) : null);
        }
      };

      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};