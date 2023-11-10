import { ApiClient } from '@api/index';
import { EAPIRoutes } from '@lib/routes';
import LocalStorage from '@lib/utils/localStorage';

export const checkListsLoader = async () => {
  const token = LocalStorage.get('token');

  if (!token) {
    return null;
  }

  const { data } = await ApiClient.get(EAPIRoutes.CHECK_LISTS, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const checkListByIdLoader = async ({ request, params }) => {
  const { id } = params;

  const token = LocalStorage.get('token');

  if (!token) {
    return null;
  }

  const { data } = await ApiClient.get(EAPIRoutes.CHECK_LIST + `/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
