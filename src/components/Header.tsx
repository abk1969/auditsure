import React from 'react';
import { Shield, LogIn, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useThemeStore } from '../store/useThemeStore';
import { useAuthStore } from '../store/useAuthStore';

export function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { accentColor } = useThemeStore();
  const { user, signOut } = useAuthStore();

  const navItems = [
    { key: 'dashboard', path: '/dashboard' },
    { key: 'reports', path: '/reports' },
    { key: 'settings', path: '/settings' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <Shield className={`h-8 w-8 text-${accentColor}-600`} />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('header.title')}
            </h1>
          </div>
          
          <div className="flex items-center space-x-8">
            {user ? (
              <>
                <nav className="hidden md:flex space-x-6">
                  {navItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => navigate(item.path)}
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                    >
                      {t(`header.nav.${item.key}`)}
                    </button>
                  ))}
                </nav>
                <button
                  onClick={() => signOut()}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                >
                  {t('auth.signOut')}
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  {t('auth.signIn')}
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  {t('auth.createAccount')}
                </button>
              </div>
            )}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}