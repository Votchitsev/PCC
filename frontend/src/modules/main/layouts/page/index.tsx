import React, { ReactNode } from 'react';
import style from './page.module.scss';

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className={style.page}>
      { children }
    </main>
  );
};

export default PageLayout;
