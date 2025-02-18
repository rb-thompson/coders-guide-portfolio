"use client";

import { useState, useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

export default function Loading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Show for at least 3 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return loading ? <LoadingSpinner /> : null;
}