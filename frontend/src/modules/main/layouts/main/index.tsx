import React, { ReactNode } from 'react';
import style from './MainLayout.module.scss';

const MainLayout = ({ children } : { children: ReactNode }) => {
  return (
    <div className={ style.wrapper }>
      { children }
    </div>
  );
};

export default MainLayout;
