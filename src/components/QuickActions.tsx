import React from 'react';
import { Play, FileText, Users, AlertTriangle, Settings } from 'lucide-react';

const actions = [
  {
    icon: Play,
    label: 'Lancer un audit',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: FileText,
    label: 'Nouveau rapport',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Users,
    label: 'Ajouter utilisateur',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: AlertTriangle,
    label: 'Signaler incident',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    icon: Settings,
    label: 'Configuration',
    color: 'text-gray-500',
    bgColor: 'bg-gray-50',
  },
];

export function QuickActions() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className={`${action.bgColor} ${action.color} p-3 rounded-lg mb-2`}>
              <action.icon className="h-5 w-5" />
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300 text-center">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}