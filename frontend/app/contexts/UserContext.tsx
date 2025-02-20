"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { chapters } from '../chapters/chapters';

type User = {
  email: string;
  name: string;
  image?: string;
  password?: string;
  completedQuests?: string[];
  badges?: string[]; // Array of badge IDs
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
  const [user, setUserState] = useState<User | null>(null); // Always null initially

  const setUser = (newUser: User | null) => {
    console.log('Setting user:', newUser);
    setUserState(newUser);
    if (newUser && typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      console.log('Stored in localStorage (currentUser):', localStorage.getItem('currentUser'));
    } else if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
      console.log('Cleared localStorage (currentUser):', localStorage.getItem('currentUser'));
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

      // Find the badge for this quest (assuming chapters data is imported)
      const chapter = chapters.find(ch => ch.id === chapterId);
      const quest = chapter?.quests.find(q => q.id === questId);
      const badgeId = quest?.badge?.id;

      // Add badge if it exists and isn't already earned
      const updatedBadges = user.badges
        ? badgeId && !user.badges.includes(badgeId) ? [...user.badges, badgeId] : user.badges
        : badgeId ? [badgeId] : [];

      const updatedUser = { ...user, completedQuests: updatedCompletedQuests, badges: updatedBadges };
      
      setUser(updatedUser);
      console.log(`Completed quest ${questKey} and earned badge ${badgeId} for user ${user.email}`);


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

  // Load user from localStorage only on client-side mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      console.log('Client-side load from localStorage (currentUser):', storedUser);
      if (storedUser) {
        setUserState(JSON.parse(storedUser));
      }
    }
  }, []); // Empty dependency array = run once on mount

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