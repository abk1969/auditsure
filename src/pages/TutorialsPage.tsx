import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Video, FileText } from 'lucide-react';

export function TutorialsPage() {
  const { t } = useTranslation();

  const tutorials = [
    {
      title: 'Introduction à l\'ISO 22342',
      description: 'Comprendre les fondamentaux de la norme et ses objectifs',
      icon: BookOpen,
      duration: '15 min',
      type: 'Article'
    },
    {
      title: 'Évaluation des risques',
      description: 'Guide pratique pour réaliser une évaluation des risques',
      icon: Video,
      duration: '25 min',
      type: 'Vidéo'
    },
    {
      title: 'Documentation requise',
      description: 'Liste complète des documents nécessaires',
      icon: FileText,
      duration: '20 min',
      type: 'Guide'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Tutoriels Interactifs
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg">
                  <tutorial.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {tutorial.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {tutorial.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-indigo-600 dark:text-indigo-400">
                      {tutorial.type}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {tutorial.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}