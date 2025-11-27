'use client';

import { useAuth } from '@/app/contexts/AuthContexts';
import { HomeScreen } from '@/components/home-screen';
import LoginPage from '@/components/LoginPage';

export default function Home() {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  return <HomeScreen />;
}