import React from 'react';
import { ERoutes } from '@lib/routes';
import { AddProfilePage, ProfilePage } from '../pages';
import { profileLoader } from './loaders';
import { Protected } from '@main/specialComponents';

const ProfileRouter = [
  {
    path: ERoutes.PROFILE_ROOT,
    element: <Protected />,
    children: [
      {
        path: ERoutes.PROFILE_DETAILS,
        element: <ProfilePage />,
        loader: profileLoader,
      },
      {
        path: ERoutes.PROFILE_ADD,
        element: <AddProfilePage />,
      },   
    ],
  },
];

export default ProfileRouter;
