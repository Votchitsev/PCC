import React from 'react';
import style from './MainLayout.module.scss';
import Header from '@main/components/header';
import { Outlet } from 'react-router-dom';
import { useStore } from 'store';
import { observer } from 'mobx-react';

const MainLayout = () => {
  const { ModalStore } = useStore();

  return (
    <>
      <Header />
      <div className={ style.wrapper }>
        <Outlet />
      </div>
      { ModalStore.modal }
    </>
  );
};

export default observer(MainLayout);
