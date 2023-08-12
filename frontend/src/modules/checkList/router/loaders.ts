import ApiClient from '@api/index';
import { EAPIRoutes } from '@lib/routes';
import LocalStorage from '@lib/utils/localStorage';

export const checkListsLoader = async () => {
  const { data } = await ApiClient.get(EAPIRoutes.CHECK_LISTS, {
    headers: {
      Authorization: `Bearer ${LocalStorage.get('token')}`,
    },
  });

  return data;
};

export const checkListByIdLoader = async ({ _, params }) => {
  const { id } = params;
  console.log(id);
  // сначала написать логику на сервере
};
