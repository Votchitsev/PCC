import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import MainLayout from '@main/layouts/main';
import AuthPage from '@auth/pages/auth';
import RegPage from '@auth/pages/reg';
import { useAuth } from '@lib/hooks/auth';
import MainPage from '@main/pages';
import { AUTH_ROUTE, ERoutes, REG_ROUTE, ROOT_ROUTE } from '@lib/routes';
import checkListRouter from 'modules/checkList/router';
import departmentsRouter from 'modules/departments/router';
import inspectionsRouter from 'modules/inspections/router';
import { ProfileRouter } from 'modules/profile/router';
import { analyticsRouter } from '@analytics/router';
import { Protected } from '@main/specialComponents';

const router = createBrowserRouter([
  {
    path: AUTH_ROUTE,
    element: <AuthPage />,
  },
  {
    element: <Protected />,
    children: [{
      element: <MainLayout />,
      children: [
        {
          path: ROOT_ROUTE,
          element: <MainPage />,
        },
        {
          path: ERoutes.PROFILE_ROOT,
          children: ProfileRouter,
        },
        {
          path: '/check-list',
          children: checkListRouter,
        },
        {
          path: ERoutes.DEPARTMENTS_ROOT,
          children: departmentsRouter,
        },
        {
          path: ERoutes.INSPECTIONS_ROOT,
          children: inspectionsRouter,
        },
        {
          path: ERoutes.ANALYTICS_ROOT,
          children: analyticsRouter,
        },
      ],
    }],
  },
]);

const App = () => {
  return (
      <RouterProvider router={router} />
    );
};

export default App;
