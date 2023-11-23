import React from 'react';
import { ERoutes } from '@lib/routes';
import { AnalyticsPage, ReportPage } from '../pages';
import { MainReportLoader } from './loaders';

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
];

export default analyticsRouter;
