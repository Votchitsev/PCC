import React from 'react';
import { ERoutes } from '@lib/routes';
import DepartmentGroupsPage from '../pages/departmentGroupsPage';
import { departmentGroupsLoader, departmentsLoader } from './loaders';
import DepartmentsPage from '../pages/departmentsPage';

const departmentsRouter = [
  {
    path: ERoutes.DEPARTMENT_GROUPS,
    element: <DepartmentGroupsPage />,
    loader: departmentGroupsLoader,
  },
  {
    path: ERoutes.DEPARTMENTS_BY_ID,
    element: <DepartmentsPage />,
    loader: departmentsLoader,
  },
];

export default departmentsRouter;
