import { ERoutes } from '@lib/routes';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from 'store';

const Protected = () => {
  const { AuthStore } = useStore();
  const { authUser } = AuthStore;
  
  if (!authUser) {
    return <Navigate to={ERoutes.AUTH_ROUTE} />;
  }

  return <Outlet />;
};

export default Protected;
