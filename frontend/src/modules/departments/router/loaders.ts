import { ApiClient } from '@api/index';
import { EAPIRoutes } from '@lib/routes';

export const departmentGroupsLoader = async () => {
  const { data } = await ApiClient.get(EAPIRoutes.DEPARTMENT_GROUPS);
  return data;
};

export const departmentsLoader = async ({ request, params }) => {
  const { id } = params;

  const { data } = await ApiClient.get(`${EAPIRoutes.DEPARTMENT_GROUPS}${id}`);
  return data;
};
