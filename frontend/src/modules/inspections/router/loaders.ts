import { ApiClient } from '@api/index';
import {
  type IInspection,
  type IInspectionExtended,
} from '@inspections/entity';
import { EAPIRoutes } from '@lib/routes';
import LocalStorage from '@lib/utils/localStorage';
import { buildEmptyResult } from './utils';

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


export const getAllInspectionsLoader = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page'));

  const { data } = await ApiClient.get(
    `${EAPIRoutes.INSPECTIONS}${page ? `?page=${page}` : ''}`,
  );

  return data as IInspection[];
};

export const getInspectionResultLoader = async ({ request, params }) => {
  const { data } = await ApiClient.get(
    EAPIRoutes.INSPECTIONS + `/${params.id}/`,
  );

  if (data.result.length > 0) {
    return data as IInspectionExtended;
  }

  const { data: checkList } = await ApiClient.get(
    EAPIRoutes.CHECK_LIST + `/${data.check_list_id}`,
    {
      headers: {
        Authorization: `Bearer ${LocalStorage.get('token')}`,
      },
    },
  );

  data.result = buildEmptyResult(checkList);

  return data as IInspectionExtended;
};
