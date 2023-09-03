import React from 'react';
import style from './container.module.scss';

const Container = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={style.container}>
      { children }
    </div>
  );  
};

export default Container;
