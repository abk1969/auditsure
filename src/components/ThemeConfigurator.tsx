import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings, Moon, Sun, ChevronUp, ChevronDown } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';

export function ThemeConfigurator() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, accentColor, fontSize, compactMode, setTheme, setAccentColor, setFontSize, setCompactMode } = useThemeStore();

  const accentColors = ['indigo', 'blue', 'purple', 'pink', 'red', 'orange', 'green'];
  const fontSizes = ['small', 'medium', 'large'];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
      >
        <Settings className={`h-6 w-6 text-gray-700 dark:text-gray-300 ${isOpen ? 'rotate-90' : ''} transition-transform`} />
      </button>

      {/* Configuration Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('theme.configurator')}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('theme.darkMode')}
                </span>
                <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {theme === 'light' ? (
                    <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  ) : (
                    <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  )}
                </button>
              </div>

              {/* Accent Color */}
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('theme.accentColor')}
                </span>
                <div className="flex flex-wrap gap-2">
                  {accentColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setAccentColor(color)}
                      className={`w-8 h-8 rounded-full bg-${color}-500 ${
                        accentColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('theme.fontSize')}
                </span>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value as 'small' | 'medium' | 'large')}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {fontSizes.map((size) => (
                    <option key={size} value={size}>
                      {t(`theme.fontSizes.${size}`)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Compact Mode */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('theme.compactMode')}
                </span>
                <button
                  onClick={() => setCompactMode(!compactMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    compactMode ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      compactMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}