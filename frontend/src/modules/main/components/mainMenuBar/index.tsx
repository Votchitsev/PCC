import React from 'react';
import style from './mainMenuBar.module.scss';
import MainMenuCard from '../mainMenuCard';

const MainMenuBar = () => {
  return (
    <div className={style.menu_bar}>
      <MainMenuCard
        title={'Создайте чек-лист'}
        description={'Определите в нём вопросы, по которым будете оценивать деятельность подразделений'}
      />
    </div>
  );
};

export default MainMenuBar;
