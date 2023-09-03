import React from 'react';
import { ERoutes } from '@lib/routes';
import DepartmentGroupsPage from '../pages/departmentGroupsPage';
import { departmentGroupsLoader } from './loaders';

const departmentsRouter = [
  {
    path: ERoutes.DEPARTMENT_GROUPS,
    element: <DepartmentGroupsPage />,
    loader: departmentGroupsLoader,
  },
  {
    path: ERoutes.DEPARTMENTS,
  },
];

export default departmentsRouter;
