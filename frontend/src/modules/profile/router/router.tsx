import React, { lazy, Suspense } from 'react';
import { ERoutes } from '@lib/routes';
import { profileLoader } from './loaders';
import Loader from '@main/components/screenLoader';

const AddProfilePage = lazy(() => import('../pages/AddProfilePage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));

const ProfileRouter = [
  {
    path: ERoutes.PROFILE_DETAILS,
    element: (
      <Suspense fallback={ <Loader /> }>
        <ProfilePage />
      </Suspense>
    ),
    loader: profileLoader,
  },
  {
    path: ERoutes.PROFILE_ADD,
    element: (
      <Suspense fallback={ <Loader /> }>
        <AddProfilePage />
      </Suspense>
    ),
  },
];

export default ProfileRouter;
