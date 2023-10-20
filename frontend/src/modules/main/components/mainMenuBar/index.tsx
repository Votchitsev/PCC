import React from 'react';
import MainMenuCard from '../mainMenuCard';
import { ERoutes } from '@lib/routes';
import styled from 'styled-components';

const MainMenuBar = () => {
  return (
    <MenuBar>
      <MainMenuCard
        title={'Создайте чек-лист'}
        description={
          `Определите в нём вопросы,
          по которым будете оценивать деятельность подразделений`
        }
        href={ERoutes.ADD_CHECK_LIST}
      />
      <MainMenuCard
        title={'Посмотрите список объектов'}
        description={'по группам и подразделениям'}
        href={ERoutes.DEPARTMENT_GROUPS}
      />
    </MenuBar>
  );
};

export default MainMenuBar;

const MenuBar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
  margin-top: 60px;
`;
