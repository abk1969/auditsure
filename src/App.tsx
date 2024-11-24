import React from 'react';
import { Shield, ClipboardCheck, AlertTriangle, Users, Building2, FileCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FeatureCard } from './components/FeatureCard';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ThemeConfigurator } from './components/ThemeConfigurator';
import { useThemeStore } from './store/useThemeStore';
import './i18n';

function App() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme, accentColor } = useThemeStore();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const features = [
    {
      icon: ClipboardCheck,
      title: 'Tutoriels Interactifs',
      description: 'Découvrez les éléments clés de l\'ISO 22342 à travers des modules visuels et des études de cas.',
      buttonText: 'Commencer l\'apprentissage',
      color: 'blue',
      onClick: () => handleNavigation('/tutorials')
    },
    {
      icon: AlertTriangle,
      title: 'Évaluation des Risques',
      description: 'Évaluez et cartographiez les menaces de sécurité avec nos outils d\'évaluation complets.',
      buttonText: 'Démarrer l\'évaluation',
      color: 'red',
      onClick: () => handleNavigation('/risk-assessment')
    },
    {
      icon: Users,
      title: 'Gestion des Parties Prenantes',
      description: 'Gérez et visualisez les relations entre les différentes entités de sécurité.',
      buttonText: 'Voir la cartographie',
      color: 'purple',
      onClick: () => handleNavigation('/stakeholders')
    },
    {
      icon: Building2,
      title: 'Gestion des Actifs',
      description: 'Suivez et gérez les actifs physiques et numériques avec notre interface intuitive.',
      buttonText: 'Gérer les actifs',
      color: 'green',
      onClick: () => handleNavigation('/assets')
    },
    {
      icon: FileCheck,
      title: 'Rapports d\'Audit',
      description: 'Générez des rapports d\'audit complets avec recommandations et analyses.',
      buttonText: 'Générer un rapport',
      color: 'orange',
      onClick: () => handleNavigation('/reports')
    },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-white'}`}>
      <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2274&q=80')] bg-center bg-cover opacity-10" />
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8">
                <Shield className="h-5 w-5 text-white" />
                <span className="text-sm font-medium text-white">ISO 22342</span>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                Simplifiez votre conformité ISO 22342
              </h1>
              
              <p className="mt-6 text-xl text-indigo-100">
                Une solution complète pour gérer, suivre et améliorer votre conformité aux exigences de sûreté ISO 22342.
              </p>
              
              <div className="mt-10 flex gap-4 sm:justify-center lg:justify-start">
                <button 
                  onClick={() => navigate('/register')}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 transition-colors"
                >
                  Commencer maintenant
                </button>
                <button 
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-100 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                >
                  Se connecter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              buttonText={feature.buttonText}
              color={feature.color}
              onClick={feature.onClick}
            />
          ))}
        </div>
      </main>

      <ThemeConfigurator />
    </div>
  );
}

export default App;