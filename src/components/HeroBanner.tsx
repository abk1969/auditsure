import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, ArrowRight } from 'lucide-react';

interface HeroBannerProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
}

export function HeroBanner({ onGetStarted, onLearnMore }: HeroBannerProps) {
  const { t } = useTranslation();

  return (
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
              {t('hero.title')}
            </h1>
            
            <p className="mt-6 text-xl text-indigo-100">
              {t('hero.description')}
            </p>
            
            <div className="mt-10 flex gap-4 sm:justify-center lg:justify-start">
              <button 
                onClick={onGetStarted}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 transition-colors"
              >
                {t('hero.primaryButton')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={onLearnMore}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-100 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
              >
                {t('hero.secondaryButton')}
              </button>
            </div>
          </div>
          
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2340&q=80"
                  alt=""
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}