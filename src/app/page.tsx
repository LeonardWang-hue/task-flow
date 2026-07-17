'use client';

import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import TaskBoard from '@/components/TaskBoard';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--primary)]" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <Header />
      <main className="flex-1">
        <TaskBoard />
      </main>
    </>
  );
}
