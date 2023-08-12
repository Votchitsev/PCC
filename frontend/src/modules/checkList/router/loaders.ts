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

export const checkListByIdLoader = async ({ request, params }) => {
  const { id } = params;

  const { data } = await ApiClient.get(EAPIRoutes.ROOT + `/${id}`, {
    headers: {
      Authorization: `Bearer ${LocalStorage.get('token')}`,
    },
  });

  return data;
};
