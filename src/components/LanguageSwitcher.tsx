import React from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
    >
      {i18n.language === 'fr' ? 'English' : 'Français'}
    </button>
  );
}