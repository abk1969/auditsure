import React from 'react';
import { useTranslation } from 'react-i18next';

export function AboutPage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          À propos d'AuditSure ISO 22342
        </h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p>
            AuditSure est une solution complète conçue pour simplifier et automatiser
            le processus de conformité à la norme ISO 22342. Notre plateforme combine
            des outils d'évaluation avancés, une gestion intelligente des actifs et
            un système de reporting intuitif pour vous aider à maintenir et améliorer
            votre niveau de sûreté.
          </p>
          
          {/* Ajoutez plus de contenu ici */}
        </div>
      </div>
    </div>
  );
}