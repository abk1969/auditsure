import React from 'react';
import { Check, AlertCircle, Clock } from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  status: 'completed' | 'pending' | 'attention';
  description: string;
  progress?: number;
}

const checklistItems: ChecklistItem[] = [
  {
    id: '1',
    title: 'Politique de sûreté',
    status: 'completed',
    description: 'Document conforme aux exigences',
    progress: 100,
  },
  {
    id: '2',
    title: 'Évaluation des risques',
    status: 'attention',
    description: 'Mise à jour requise',
    progress: 65,
  },
  {
    id: '3',
    title: 'Formation du personnel',
    status: 'pending',
    description: 'À planifier pour Q2 2024',
    progress: 30,
  },
];

const statusIcons = {
  completed: Check,
  pending: Clock,
  attention: AlertCircle,
};

const statusColors = {
  completed: 'text-green-500 bg-green-50',
  pending: 'text-yellow-500 bg-yellow-50',
  attention: 'text-red-500 bg-red-50',
};

export function AutomatedChecklist() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Vérification automatique</h3>
      <div className="space-y-4">
        {checklistItems.map((item) => {
          const Icon = statusIcons[item.status];
          const colorClass = statusColors[item.status];

          return (
            <div key={item.id} className="flex items-start space-x-4">
              <div className={`${colorClass} p-2 rounded-lg`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {item.progress}%
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {item.description}
                </p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}