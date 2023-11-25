import React from 'react';
import { ERoutes } from '@lib/routes';
import { AnalyticsPage, ReportPage } from '../pages';
import {
  MainReportLoader,
  MainReportByEmployeesLoader,
  QuestionsReportLoader,
  DepartmentReportLoader,
} from './loaders';

const analyticsRouter = [
  {
    path: ERoutes.ANALYTICS_ROOT,
    element: <AnalyticsPage />,
  },
  {
    path: ERoutes.MAIN_REPORT,
    element: <ReportPage />,
    loader: MainReportLoader,
  },
  {
    path: ERoutes.MAIN_REPORT_BY_EMPLOYEES,
    element: <ReportPage />,
    loader: MainReportByEmployeesLoader,
  },
  {
    path: ERoutes.REPORT_QUESTIONS,
    element: <ReportPage />,
    loader: QuestionsReportLoader,
  },
  {
    path: ERoutes.REPORT_DEPARTMENT_GROUPS,
    element: <ReportPage />,
    loader: DepartmentReportLoader,
  },
];

export default analyticsRouter;
