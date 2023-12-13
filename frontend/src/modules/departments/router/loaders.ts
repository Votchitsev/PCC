import { ApiClient } from '@api/index';
import { IInspection } from '@inspections/entity';
import { EAPIRoutes } from '@lib/routes';

export interface IEmployee {
  first_name: string;
  last_name: string;
  position: string;
}

export interface IDepartmentData {
  department: string;
  department_group: string;
  inspections: IInspection[];
  employees: IEmployee[];
}

export const departmentGroupsLoader = async () => {
  const { data } = await ApiClient.get(EAPIRoutes.DEPARTMENT_GROUPS);
  return data;
};

export const departmentsLoader = async ({ request, params }) => {
  const { id } = params;

  const { data } = await ApiClient.get(`${EAPIRoutes.DEPARTMENT_GROUPS}${id}`);
  console.log(data);
  
  return data;
};

export const departmentLoader = async ({
  request,
  params,
}): Promise<IDepartmentData|undefined> => {
  const { id, department_id } = params;

  try {
    const queryString = `department_id=${department_id}&limit=10`;

    const { data } = await ApiClient
      .get(`${EAPIRoutes.INSPECTIONS_BY_DEPARTMENT}?${queryString}`);

    return data;
  } catch (error) {
    console.error(error);
  };
};
