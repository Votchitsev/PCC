import React from 'react';
import { ERoutes } from '@lib/routes';
import DepartmentGroupsPage from '../pages/departmentGroupsPage';
import {
  departmentGroupsLoader,
  departmentsLoader,
  departmentLoader,
} from './loaders';
import DepartmentsPage from '../pages/departmentsPage';
import DepartmentPage from '@departments/pages/departmentPage';

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
  {
    path: ERoutes.DEPARTMENT_BY_ID,
    element: <DepartmentPage />,
    loader: departmentLoader,
  },
];

export default departmentsRouter;
