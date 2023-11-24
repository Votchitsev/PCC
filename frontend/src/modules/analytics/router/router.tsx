import React from 'react';
import { ERoutes } from '@lib/routes';
import { AnalyticsPage, ReportPage } from '../pages';
import {
  MainReportLoader,
  MainReportByEmployeesLoader,
  QuestionsReportLoader,
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
];

export default analyticsRouter;
