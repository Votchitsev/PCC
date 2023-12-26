import React, { lazy, Suspense } from 'react';
import { ERoutes } from '@lib/routes';
import {
  MainReportLoader,
  MainReportByEmployeesLoader,
  QuestionsReportLoader,
  DepartmentReportLoader,
} from './loaders';
import Loader from '@main/components/screenLoader';

const AnalyticsPage = lazy(() => import('../pages/AnalyticsPage'));
const ReportPage = lazy(() => import('../pages/ReportPage'));

const analyticsRouter = [
  {
    path: ERoutes.ANALYTICS_ROOT,
    element: (
      <Suspense fallback={ <Loader />}>
        <AnalyticsPage />
      </Suspense>
    ),
  },
  {
    path: ERoutes.MAIN_REPORT,
    element: (
      <Suspense fallback={ <Loader /> }>
        <ReportPage />
      </Suspense>
    ),
    loader: MainReportLoader,
  },
  {
    path: ERoutes.MAIN_REPORT_BY_EMPLOYEES,
    element: (
      <Suspense fallback={ <Loader /> }>
        <ReportPage />
      </Suspense>
    ),
    loader: MainReportByEmployeesLoader,
  },
  {
    path: ERoutes.REPORT_QUESTIONS,
    element: (
      <Suspense fallback={ <Loader /> }>
        <ReportPage />
      </Suspense>
    ),
    loader: QuestionsReportLoader,
  },
  {
    path: ERoutes.REPORT_DEPARTMENT_GROUPS,
    element: (
      <Suspense fallback={ <Loader /> }>
        <ReportPage />
      </Suspense>
    ),
    loader: DepartmentReportLoader,
  },
];

export default analyticsRouter;
