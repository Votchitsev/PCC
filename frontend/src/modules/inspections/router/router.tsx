import React from 'react';
import { ERoutes } from '@lib/routes';
import NewInspectionPage from '../pages/newInspectionPage';
import AllInspectionsPage from '@inspections/pages/allInspectionsPage';
import { newInspectionLoader, getAllInspectionsLoader } from './loaders';

const inspectionsRouter = [
  {
    path: ERoutes.INSPECTIONS_NEW,
    element: <NewInspectionPage />,
    loader: newInspectionLoader,
  },
  {
    path: ERoutes.INSPECTIONS_ROOT,
    element: <AllInspectionsPage />,
    loader: getAllInspectionsLoader,
  },
];

export default inspectionsRouter;
