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
  login: (email: string, password: string) => boolean;
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
  const [user, setUserState] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const setUser = (newUser: User | null) => {
    console.log('Setting user:', newUser);
    setUserState(newUser);
    if (newUser && typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      // Store auth data separately and only on signup
      if (newUser.password) {
        localStorage.setItem('authUser', JSON.stringify(newUser));
      }
    } else if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser'); // Only clear current user, not auth data
    }
  };

  const login = (email: string, password: string): boolean => {
    if (typeof window !== 'undefined') {
      const storedAuthUser = JSON.parse(localStorage.getItem('authUser') || '{}');
      console.log('Login attempt - Entered:', { email, password });
      console.log('Stored auth user:', storedAuthUser);
      if (storedAuthUser.email === email && storedAuthUser.password === password) {
        setUser({ email, name: storedAuthUser.name, image: storedAuthUser.image });
        console.log('Login successful');
        return true;
      }
      console.log('Login failed - Credentials mismatch');
      return false;
    }
    console.log('Login failed - Not in browser');
    return false;
  };

  const logout = () => {
    console.log('Logging out');
    setUser(null);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'currentUser') {
          console.log('Current user storage changed:', e.newValue);
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