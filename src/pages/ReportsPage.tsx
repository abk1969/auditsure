import React from 'react';
import { useTranslation } from 'react-i18next';
import { SecurityReport } from '../components/SecurityReport';

export function ReportsPage() {
  const { t } = useTranslation();

  const companyLocations = ['75001', '69001', '13001', '33000'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Rapports
        </h1>
        <SecurityReport companyLocations={companyLocations} />
      </div>
    </div>
  );
}