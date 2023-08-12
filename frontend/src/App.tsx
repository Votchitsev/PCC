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
import { AUTH_ROUTE, REG_ROUTE, ROOT_ROUTE } from '@lib/routes';
import checkListRouter from 'modules/checkList/router';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: ROOT_ROUTE,
        element: <MainPage />,
      },
      {
        path: AUTH_ROUTE,
        element: <AuthPage />,
      },
      {
        path: REG_ROUTE,
        element: <RegPage />,
      },
      {
        path: '/check-list',
        children: checkListRouter,
      },
    ],
  },
]);

const App = () => {
  useAuth();

  return (
      <RouterProvider router={router} />
    );
};

export default App;
