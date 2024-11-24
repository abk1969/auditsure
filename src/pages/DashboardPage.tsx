import React from 'react';
import { useTranslation } from 'react-i18next';
import { ComplianceScore } from '../components/ComplianceScore';
import { QuickActions } from '../components/QuickActions';
import { AutomatedChecklist } from '../components/AutomatedChecklist';
import { DraggableLayout } from '../components/DraggableLayout';

export function DashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Tableau de bord
        </h1>
        
        <DraggableLayout>
          {[
            <ComplianceScore score={85} previousScore={80} />,
            <QuickActions />,
            <AutomatedChecklist />
          ]}
        </DraggableLayout>
      </div>
    </div>
  );
}