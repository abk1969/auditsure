import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, Users, Briefcase, MapPin, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from 'react-hot-toast';

const registrationSchema = z.object({
  organizationName: z.string().min(2, 'Le nom de l\'organisation est requis'),
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string(),
  size: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']),
  industry: z.string().min(2, 'Le secteur d\'activité est requis'),
  address: z.string().min(5, 'L\'adresse est requise'),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter la politique de confidentialité'
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type RegistrationData = z.infer<typeof registrationSchema>;

export function RegistrationForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const setOrganization = useAuthStore((state) => state.setOrganization);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      size: '1-10',
      gdprConsent: false
    }
  });

  const nextStep = async () => {
    const fieldsToValidate = step === 1 
      ? ['organizationName', 'email', 'password', 'confirmPassword']
      : ['size', 'industry', 'address', 'gdprConsent'];
      
    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep(step + 1);
  };

  const onSubmit = async (data: RegistrationData) => {
    try {
      setIsLoading(true);

      // 1. Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            organization_name: data.organizationName,
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user data returned');

      // 2. Create organization
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .insert({
          name: data.organizationName,
          size: data.size,
          industry: data.industry,
          address: data.address,
          user_id: authData.user.id,
        })
        .select()
        .single();

      if (orgError) throw orgError;

      setUser(authData.user);
      setOrganization(orgData);

      toast.success(t('auth.registrationSuccess'));
      navigate('/auth/confirm-email', { state: { email: data.email } });

    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || t('auth.registrationError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8">
        <div className="flex justify-between">
          <div className={`flex-1 h-2 rounded-l-full ${step >= 1 ? 'bg-indigo-600' : 'bg-gray-200'}`} />
          <div className={`flex-1 h-2 rounded-r-full ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`} />
        </div>
        <div className="flex justify-between mt-2">
          <span className={`text-sm font-medium ${step === 1 ? 'text-indigo-600' : 'text-gray-500'}`}>
            {t('auth.basicInfo')}
          </span>
          <span className={`text-sm font-medium ${step === 2 ? 'text-indigo-600' : 'text-gray-500'}`}>
            {t('auth.organizationDetails')}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('auth.organizationName')}
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  {...register('organizationName')}
                  type="text"
                  className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3"
                  placeholder={t('auth.organizationNamePlaceholder')}
                />
              </div>
              {errors.organizationName && (
                <p className="mt-1 text-sm text-red-600">{errors.organizationName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('auth.email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  {...register('email')}
                  type="email"
                  className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3"
                  placeholder={t('auth.emailPlaceholder')}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('auth.password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  {...register('password')}
                  type="password"
                  className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3"
                  placeholder={t('auth.passwordPlaceholder')}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('auth.confirmPassword')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  {...register('confirmPassword')}
                  type="password"
                  className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3"
                  placeholder={t('auth.confirmPasswordPlaceholder')}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('auth.organizationSize')}
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  {...register('size')}
                  className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3"
                >
                  <option value="1-10">1-10 employés</option>
                  <option value="11-50">11-50 employés</option>
                  <option value="51-200">51-200 employés</option>
                  <option value="201-500">201-500 employés</option>
                  <option value="500+">500+ employés</option>
                </select>
              </div>
              {errors.size && (
                <p className="mt-1 text-sm text-red-600">{errors.size.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('auth.industry')}
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  {...register('industry')}
                  type="text"
                  className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3"
                  placeholder={t('auth.industryPlaceholder')}
                />
              </div>
              {errors.industry && (
                <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('auth.address')}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  {...register('address')}
                  type="text"
                  className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3"
                  placeholder={t('auth.addressPlaceholder')}
                />
              </div>
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            <div className="flex items-start space-x-3">
              <input
                {...register('gdprConsent')}
                type="checkbox"
                id="gdprConsent"
                className="mt-1 h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="gdprConsent" className="text-sm text-gray-700 dark:text-gray-300">
                {t('auth.gdprConsent')}{' '}
                <a href="/privacy" className="text-indigo-600 hover:text-indigo-500">
                  {t('auth.privacyPolicy')}
                </a>
              </label>
            </div>
            {errors.gdprConsent && (
              <p className="mt-1 text-sm text-red-600">{errors.gdprConsent.message}</p>
            )}
          </>
        )}

        <div className="flex justify-between gap-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {t('common.back')}
            </button>
          )}
          
          {step === 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex-1 px-4 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              {t('common.next')}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  {t('auth.creating')}
                </div>
              ) : (
                t('auth.createAccount')
              )}
            </button>
          )}
        </div>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          {t('auth.alreadyHaveAccount')}{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            {t('auth.signIn')}
          </button>
        </p>
      </form>
    </div>
  );
}