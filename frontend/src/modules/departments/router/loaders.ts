import { ApiClient } from '@api/index';
import { EAPIRoutes } from '@lib/routes';
import LocalStorage from '@lib/utils/localStorage';

export const departmentGroupsLoader = async () => {
  const { data } = await ApiClient.get(EAPIRoutes.DEPARTMENT_GROUPS);
  return data;
};
