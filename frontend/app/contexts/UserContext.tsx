"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  email: string;
  name: string;
  image?: string;
  password?: string;
  completedQuests?: string[];
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (email: string, name: string, password: string) => boolean;
  completeQuest: (chapterId: number, questId: number) => void; 
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
  const router = useRouter();
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
    } else if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser'); // Clear current user
    }
  };

  const signup = (email: string, name: string, password: string): boolean => {
    if (typeof window !== 'undefined') {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[];
      console.log('Current stored users:', storedUsers);
      if (storedUsers.some(u => u.email === email)) {
        console.log('Signup failed - Email already exists');
        return false;
      }
      const newUser = { email, name, password, image: undefined, completedQuests: [] }; // Initialize empty completedQuests
      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUser(newUser);
      return true;
    }
    return false;
  };

  const login = (email: string, password: string): boolean => {
    if (typeof window !== 'undefined') {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[];
      console.log('Login attempt - Entered:', { email, password });
      console.log('Stored users:', storedUsers);
      const foundUser = storedUsers.find(u => u.email === email && u.password === password);
      if (foundUser) {
        setUser({ ...foundUser, completedQuests: foundUser.completedQuests || [] });
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
    router.push('/'); // Redirect to homepage
  };

  const completeQuest = (chapterId: number, questId: number) => {
    if (user && typeof window !== 'undefined') {
      const questKey = `${chapterId}-${questId}`;
      const updatedCompletedQuests = user.completedQuests ? [...user.completedQuests, questKey] : [questKey];
      const updatedUser = { ...user, completedQuests: updatedCompletedQuests };
      
      // Update currentUser
      setUser(updatedUser);
      console.log(`Completed quest ${questKey} for user ${user.email}`);

      // Sync with users array
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[];
      const userIndex = storedUsers.findIndex(u => u.email === user.email);
      if (userIndex !== -1) {
        storedUsers[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(storedUsers));
        console.log('Updated stored users with progress:', localStorage.getItem('users'));
      }
    }
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
  }, [router]); // Add router to dependencies

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, signup, completeQuest }}>
      {children}
    </UserContext.Provider>
  );
};