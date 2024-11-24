import React from 'react';
import { useTranslation } from 'react-i18next';

export function RiskAssessmentPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Évaluation des Risques
        </h1>
        {/* Add risk assessment content here */}
      </div>
    </div>
  );
}