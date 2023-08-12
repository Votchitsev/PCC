import { ADD_CHECKLIST_ROUTE, CHECK_LISTS_ROUTE, EAPIRoutes, ERoutes, GET_CHECK_LISTS_ROUTE } from '@lib/routes';
import React from 'react';
import CheckListPage from './pages/checkListPage';
import ApiClient from '@api/index';
import LocalStorage from '@lib/utils/localStorage';
import CheckListsPage from './pages/checkListsPage';

const checkListsLoader = async () => {
  const { data } = await ApiClient.get(EAPIRoutes.CHECK_LISTS, {
    headers: {
      Authorization: `Bearer ${LocalStorage.get('token')}`,
    },
  });

  return data;
};

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
];

export default checkListRouter;
