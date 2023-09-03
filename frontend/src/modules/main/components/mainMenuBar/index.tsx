import React from 'react';
import style from './mainMenuBar.module.scss';
import MainMenuCard from '../mainMenuCard';
import { ERoutes } from '@lib/routes';

const MainMenuBar = () => {
  return (
    <div className={style.menu_bar}>
      <MainMenuCard
        title={'Создайте чек-лист'}
        description={'Определите в нём вопросы, по которым будете оценивать деятельность подразделений'}
        href={ERoutes.ADD_CHECK_LIST}
      />
      <MainMenuCard
        title={'Посмотрите список объектов'}
        description={'по группам и подразделениям'}
        href={ERoutes.DEPARTMENT_GROUPS}
      />
    </div>
  );
};

export default MainMenuBar;
