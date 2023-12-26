import React, { lazy, Suspense } from 'react';
import { ERoutes } from '@lib/routes';
import {
  newInspectionLoader,
  getAllInspectionsLoader,
  getInspectionResultLoader,
} from './loaders';
import InspectionResultPage from '@inspections/pages/inspectionResultPage';
import Loader from '@main/components/screenLoader';

const NewInspectionPage = lazy(() => import('../pages/newInspectionPage'));
const AllInspectionsPage = lazy(() =>
  import('@inspections/pages/allInspectionsPage'));

const inspectionsRouter = [
  {
    path: ERoutes.INSPECTIONS_NEW,
    element: (
      <Suspense fallback={ <Loader />}>
        <NewInspectionPage />
      </Suspense>
    ),
    loader: newInspectionLoader,
  },
  {
    path: ERoutes.INSPECTIONS_ROOT,
    element: (
      <Suspense fallback={ <Loader />}>
        <AllInspectionsPage />
      </Suspense>
    ),
    loader: getAllInspectionsLoader,
  },
  {
    path: ERoutes.INSPECTIONS_DETAIL,
    element: (
      <Suspense fallback={ <Loader />}>
        <InspectionResultPage />
      </Suspense>
    ),
    loader: getInspectionResultLoader,
  },
];

export default inspectionsRouter;
