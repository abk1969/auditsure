import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { ThemeConfigurator } from './ThemeConfigurator';
import { useThemeStore } from '../store/useThemeStore';

export function Layout() {
  const { theme } = useThemeStore();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Header />
      <Outlet />
      <ThemeConfigurator />
    </div>
  );
}