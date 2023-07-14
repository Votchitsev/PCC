import React, { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './LoginHeader.module.scss';
import { AUTH_ROUTE, REG_ROUTE } from '@lib/routes';

const Login = () => {
  const [authMenuClasses, setAuthMenuClasses] = useState([style.menu, style.hide]);

  function onLeave() {
    let timeout: ReturnType<typeof setTimeout>;
    
    return function (e: MouseEvent ,isBreak = false) {
      if (timeout) {
        clearTimeout(timeout);
      }

      if (isBreak) {
        if (timeout) {
          clearTimeout(timeout);
        }

        return;
      }

      timeout = setTimeout(() => setAuthMenuClasses([style.menu, style.hide]), 500);
    };
  };

  const leaveHandle = onLeave();

  const menuEnterHandle = (e: MouseEvent) => {
    leaveHandle(e, true);
  };

  const loginEnterHandle = (e: MouseEvent) => {
    leaveHandle(e, true);
    setAuthMenuClasses([...authMenuClasses, style.show]);
  };

  return (
    <>
      <div
        className={ style.login }
        onMouseEnter={ loginEnterHandle }
        onMouseLeave={ leaveHandle }
      >
        <span>Личный кабинет</span>
        <ul
          className={ authMenuClasses.join(' ') }
          onMouseLeave={ onLeave }
          onMouseEnter={ menuEnterHandle }
        >
          <li><Link to={AUTH_ROUTE}>Войти</Link></li>
          <li><Link to={REG_ROUTE}>Зарегистрироваться</Link></li>
        </ul>
      </div>     
    </>
  );
};

export default Login;
