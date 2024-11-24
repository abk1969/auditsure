import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';
import { Loader2 } from 'lucide-react';

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  organizationName: z.string().min(2).optional(),
  organizationSize: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']).optional(),
  industry: z.string().optional(),
});

type AuthFormData = z.infer<typeof authSchema>;

interface AuthFormProps {
  mode: 'login' | 'register';
}

export function AuthForm({ mode }: AuthFormProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setOrganization = useAuthStore((state) => state.setOrganization);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      if (mode === 'login') {
        const { data: { user }, error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) throw error;
        setUser(user);

        // Fetch organization details
        const { data: org } = await supabase
          .from('organizations')
          .select('*')
          .eq('user_id', user.id)
          .single();

        setOrganization(org);
        navigate('/dashboard');
      } else {
        const { data: { user }, error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });

        if (error) throw error;
        setUser(user);

        // Create organization
        if (user) {
          const { data: org } = await supabase
            .from('organizations')
            .insert({
              name: data.organizationName,
              size: data.organizationSize,
              industry: data.industry,
              user_id: user.id,
            })
            .select()
            .single();

          setOrganization(org);
        }

        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      // Handle error (show toast notification, etc.)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('auth.email')}
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('auth.password')}
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {mode === 'register' && (
        <>
          <div>
            <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('auth.organizationName')}
            </label>
            <input
              id="organizationName"
              type="text"
              {...register('organizationName')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="organizationSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('auth.organizationSize')}
            </label>
            <select
              id="organizationSize"
              {...register('organizationSize')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="1-10">1-10 employés</option>
              <option value="11-50">11-50 employés</option>
              <option value="51-200">51-200 employés</option>
              <option value="201-500">201-500 employés</option>
              <option value="500+">500+ employés</option>
            </select>
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('auth.industry')}
            </label>
            <input
              id="industry"
              type="text"
              {...register('industry')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            t(mode === 'login' ? 'auth.signIn' : 'auth.createAccount')
          )}
        </button>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={() => navigate(mode === 'login' ? '/register' : '/login')}
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          {t(mode === 'login' ? 'auth.needAccount' : 'auth.alreadyHaveAccount')}
        </button>
      </div>
    </form>
  );
}