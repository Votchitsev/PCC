import { ApiClient } from '@api/index';
import { EAPIRoutes, ERoutes } from '@lib/routes';
import LocalStorage from '@lib/utils/localStorage';
import { type IProfileResponse } from '../entities';
import { RedirectFunction, redirect } from 'react-router-dom';

export async function profileLoader({
  request,
  params,
}): Promise<IProfileResponse | null> {
  try {
    const { data } = await ApiClient.get(
      `${EAPIRoutes.PROFILE}${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${LocalStorage.get('token')}`,
        },
      },
    );
    
    return data;
  } catch (error) {
    if (error.response.status === 400) {
      redirect(ERoutes.AUTH_ROUTE);
    }

    return null;
  }
};
