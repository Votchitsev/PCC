import { ERoutes } from '@lib/routes';
import React from 'react';
import { useAuth } from '@lib/hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from 'store';
import ScreenLoader from '@main/components/screenLoader';

const Protected = () => {
  const { loading } = useAuth();
  const { AuthStore } = useStore();
  const { authUser } = AuthStore;

  if (loading) {
    return <ScreenLoader />;
  }
  
  if (!authUser) {
    return <Navigate to={ERoutes.AUTH_ROUTE} />;
  }

  return <Outlet />;
};

export default Protected;
