import React from 'react';
import { ERoutes } from '@lib/routes';
import NewInspectionPage from '../pages/newInspectionPage';
import { newInspectionLoader } from './loaders';

const inspectionsRouter = [
  {
    path: ERoutes.INSPECTIONS_NEW,
    element: <NewInspectionPage />,
    loader: newInspectionLoader,
  },
];

export default inspectionsRouter;
