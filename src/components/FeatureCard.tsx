import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  color: string;
  onClick?: () => void;
}

export function FeatureCard({ icon: Icon, title, description, buttonText, color, onClick }: FeatureCardProps) {
  const colorVariants = {
    blue: 'from-blue-500 to-blue-600',
    red: 'from-red-500 to-red-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-bl from-opacity-10 to-transparent rounded-full opacity-30 group-hover:opacity-40 transition-opacity" />
      
      <div className="relative">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${colorVariants[color]} text-white mb-4 shadow-lg`}>
          <Icon className="h-6 w-6" />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
          {description}
        </p>

        <button
          onClick={onClick}
          className={`w-full px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r ${colorVariants[color]} text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}