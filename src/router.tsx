import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from './App';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { TutorialsPage } from './pages/TutorialsPage';
import { RiskAssessmentPage } from './pages/RiskAssessmentPage';
import { StakeholdersPage } from './pages/StakeholdersPage';
import { AssetsPage } from './pages/AssetsPage';
import { ReportsPage } from './pages/ReportsPage';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { 
        path: 'tutorials', 
        element: <ProtectedRoute><TutorialsPage /></ProtectedRoute> 
      },
      { 
        path: 'risk-assessment', 
        element: <ProtectedRoute><RiskAssessmentPage /></ProtectedRoute> 
      },
      { 
        path: 'stakeholders', 
        element: <ProtectedRoute><StakeholdersPage /></ProtectedRoute> 
      },
      { 
        path: 'assets', 
        element: <ProtectedRoute><AssetsPage /></ProtectedRoute> 
      },
      { 
        path: 'reports', 
        element: <ProtectedRoute><ReportsPage /></ProtectedRoute> 
      },
      { 
        path: 'dashboard', 
        element: <ProtectedRoute><DashboardPage /></ProtectedRoute> 
      },
      { 
        path: 'settings', 
        element: <ProtectedRoute><SettingsPage /></ProtectedRoute> 
      },
      { path: 'about', element: <AboutPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);