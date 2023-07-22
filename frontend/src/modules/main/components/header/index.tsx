import React from 'react';
import style from './Header.module.scss';
import Login from '@auth/components/headerLogin';

const Header = () => {
  return (
    <header className={ style.header }>
      <div className={ style.container }>
        <div />
        <div />
        <Login />
      </div>
    </header>
  );
};

export default Header;
