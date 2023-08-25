import React from 'react';
import { ERoutes } from '@lib/routes';
import { ComponentType } from 'react';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { useStore } from 'store';

const AuthProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { AuthStore } = useStore();

  if (!AuthStore.authUser) {
    return <Navigate to={ERoutes.AUTH_ROUTE} />;
  }

  return children;
};

export default AuthProtectedRoute;
