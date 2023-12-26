import React, { Suspense, lazy } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import MainLayout from '@main/layouts/main';
import { AUTH_ROUTE, ERoutes, ROOT_ROUTE } from '@lib/routes';
import checkListRouter from 'modules/checkList/router';
import departmentsRouter from 'modules/departments/router';
import inspectionsRouter from 'modules/inspections/router';
import { ProfileRouter } from 'modules/profile/router';
import { analyticsRouter } from '@analytics/router';
import { Protected } from '@main/specialComponents';
import { Page404 } from '@main/pages';
import Loader from '@main/components/screenLoader';

const MainPage = lazy(() => import('@main/pages'));
const AuthPage = lazy(() => import('@auth/pages/auth'));

const router = createBrowserRouter([
  {
    path: AUTH_ROUTE,
    element: (
      <Suspense fallback={<Loader />}>
        <AuthPage />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: <Page404 />,
  },
  {
    element: <Protected />,
    children: [{
      element: <MainLayout />,
      children: [
        {
          path: ROOT_ROUTE,
          element: (
            <Suspense fallback={<Loader />}>
              <MainPage />
            </Suspense>
          ),
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
