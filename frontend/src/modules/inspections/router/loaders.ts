import { ApiClient } from '@api/index';
import { IInspection } from '@inspections/entity';
import { EAPIRoutes } from '@lib/routes';
import LocalStorage from '@lib/utils/localStorage';

export const newInspectionLoader = async () => {
  const checkLists = ApiClient.get(EAPIRoutes.CHECK_LISTS, {
    headers: {
      Authorization: `Bearer ${LocalStorage.get('token')}`,
    },
  });

  const departmentGroups = ApiClient.get(EAPIRoutes.DEPARTMENT_GROUPS);

  const data = Promise.all([checkLists, departmentGroups])
    .then(([checkLists, departmentGroups]) => ({
      checkLists: checkLists.data,
      departmentGroups: departmentGroups.data,
    }));

  return data;
};


export const getAllInspectionsLoader = async () => {
  const { data } = await ApiClient.get(EAPIRoutes.INSPECTIONS);

  return data as IInspection[];
};
