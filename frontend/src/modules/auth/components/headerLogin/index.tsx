import React, { MouseEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './LoginHeader.module.scss';
import { AUTH_ROUTE, ERoutes, REG_ROUTE, ROOT_ROUTE } from '@lib/routes';
import { useStore } from 'store';

const Login = () => {
  const { AuthStore } = useStore();
  const navigate = useNavigate();
  const [
    authMenuClasses,
    setAuthMenuClasses,
  ] = useState(
      [style.menu, style.hide],
    );

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

      timeout = setTimeout(
        () => setAuthMenuClasses([style.menu, style.hide],
      ), 500);
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

  const logoutHandle = async () => {
    const token = AuthStore.authUser?.token;
  
    if (token) {      
      await AuthStore.fetchLogout(token);
      setAuthMenuClasses([style.menu, style.hide]);
      navigate(AUTH_ROUTE);
    }
  };

  const profileHandle = () => {
    setAuthMenuClasses([style.menu, style.hide]);
    navigate(`${ERoutes.PROFILE_ROOT}/${AuthStore.authUser?.id}`);
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
          { AuthStore.authUser &&
          <div className={style.user}>
            { AuthStore.authUser.username }
          </div> }
          { AuthStore.authUser
            ? 
            <>
              <li
                onClick={ profileHandle }>
                  Профиль
                </li>
              <li onClick={  logoutHandle }>Выйти</li>
            </>
            : 
            <>
              <li><Link to={AUTH_ROUTE}>Войти</Link></li>
              <li><Link to={REG_ROUTE}>Зарегистрироваться</Link></li>
            </>
          }
        </ul>
      </div>     
    </>
  );
};

export default Login;
