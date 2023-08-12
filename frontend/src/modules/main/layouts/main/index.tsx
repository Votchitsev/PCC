import React from 'react';
import style from './MainLayout.module.scss';
import Header from '@main/components/header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className={ style.wrapper }>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
