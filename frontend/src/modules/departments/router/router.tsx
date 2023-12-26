import React, { lazy, Suspense } from 'react';
import { ERoutes } from '@lib/routes';
import DepartmentGroupsPage from '../pages/departmentGroupsPage';
import {
  departmentGroupsLoader,
  departmentsLoader,
  departmentLoader,
} from './loaders';
import Loader from '@main/components/screenLoader';

const DepartmentsPage = lazy(() => import('../pages/departmentsPage'));
const DepartmentPage = lazy(() => import('@departments/pages/departmentPage'));

const departmentsRouter = [
  {
    path: ERoutes.DEPARTMENT_GROUPS,
    element: (
      <Suspense fallback={ <Loader /> }>
        <DepartmentGroupsPage />
      </Suspense>
    ),
    loader: departmentGroupsLoader,
  },
  {
    path: ERoutes.DEPARTMENTS_BY_ID,
    element: (
      <Suspense fallback={ <Loader /> }>
        <DepartmentsPage />
      </Suspense>
    ),
    loader: departmentsLoader,
  },
  {
    path: ERoutes.DEPARTMENT_BY_ID,
    element: (
      <Suspense fallback={ <Loader /> }>
        <DepartmentPage />
      </Suspense>
    ),
    loader: departmentLoader,
  },
];

export default departmentsRouter;
