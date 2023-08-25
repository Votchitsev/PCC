import React from 'react';
import CheckListPage from '../pages/checkListPage';
import CheckListsPage from '../pages/checkListsPage';
import { ERoutes } from '@lib/routes';
import { checkListByIdLoader, checkListsLoader } from './loaders';
import withAuth from '@auth/components/authProtectedRoute';
import AuthProtectedRoute from '@auth/components/authProtectedRoute';

const checkListRouter = [
  {
    path: ERoutes.ADD_CHECK_LIST,
    element: (
      <AuthProtectedRoute>
        <CheckListPage />
      </AuthProtectedRoute>
    ),
  },
  {
    path: ERoutes.CHECK_LISTS,
    element: (
      <AuthProtectedRoute>
        <CheckListsPage />
      </AuthProtectedRoute>
    ),
    loader: checkListsLoader,
  },
  {
    path: ERoutes.CHECK_LIST_BY_ID,
    element: (
      <AuthProtectedRoute>
        <CheckListPage />
      </AuthProtectedRoute>
    ),
    loader: checkListByIdLoader,
  },
];

export default checkListRouter;
