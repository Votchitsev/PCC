import React, { lazy, Suspense } from 'react';
import { ERoutes } from '@lib/routes';
import { checkListByIdLoader, checkListsLoader } from './loaders';
import Loader from '@main/components/screenLoader';
import ScreenLoader from '@main/components/screenLoader';

const CheckListPage = lazy(() => import('../pages/checkListPage'));
const CheckListsPage = lazy(() => import('../pages/checkListsPage'));

const checkListRouter = [
  {
    path: ERoutes.ADD_CHECK_LIST,
    element: (
      <Suspense fallback={<ScreenLoader />}>
        <CheckListPage />
      </Suspense>
    ),
  },
  {
    path: ERoutes.CHECK_LISTS,
    element: (
      <Suspense fallback={<ScreenLoader />}>
        <CheckListsPage />
      </Suspense>
    ),
    loader: checkListsLoader,
  },
  {
    path: ERoutes.CHECK_LIST_BY_ID,
    element: (
      <Suspense fallback={<ScreenLoader />}>
        <CheckListPage />
      </Suspense>
    ),
    loader: checkListByIdLoader,
  },
];

export default checkListRouter;
