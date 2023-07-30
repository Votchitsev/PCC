import React from 'react';
import Button from '../button';
import style from './mainMenuCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { ADD_CHECKLIST_ROUTE } from '@lib/routes';

interface IProps {
  title: string;
  description: string;
}

const MainMenuCard = ({ title, description }: IProps) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(ADD_CHECKLIST_ROUTE);
  };

  return (
    <div className={style.main_menu_card}>
      <h3>{ title }</h3>
      <p>{ description }</p>
      <div>
        <Button
          text={'Перейти'}
          type={'button'}
          clickHandler={onClickHandler}
         />
      </div>
    </div>
  );
};

export default MainMenuCard;
