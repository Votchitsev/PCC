import React from 'react';
import CheckListPage from '../pages/checkListPage';
import CheckListsPage from '../pages/checkListsPage';
import { ERoutes } from '@lib/routes';
import { checkListByIdLoader, checkListsLoader } from './loaders';

const checkListRouter = [
  {
    path: ERoutes.ADD_CHECK_LIST,
    element: <CheckListPage />,
  },
  {
    path: ERoutes.CHECK_LISTS,
    element: <CheckListsPage />,
    loader: checkListsLoader,
  },
  {
    path: ERoutes.CHECK_LIST_BY_ID,
    element: <CheckListPage />,
    loader: checkListByIdLoader,
  },
];

export default checkListRouter;
