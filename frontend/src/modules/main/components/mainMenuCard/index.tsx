import React from 'react';
import Button, { EButtonColor } from '../button';
import style from './mainMenuCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { ERoutes } from '@lib/routes';
import Card from '../card/card';

interface IProps {
  title: string;
  description: string;
  href: ERoutes;
}

const MainMenuCard = ({ title, description, href }: IProps) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(href);
  };

  return (
    <Card extraStyle={{ display: 'flex', flexDirection: 'column' }}>
      <h3>{ title }</h3>
      <p className={ style.description }>{ description }</p>
      <div>
        <Button
          text={'Перейти'}
          type={'button'}
          clickHandler={onClickHandler}
         />
      </div>
    </Card>
  );
};

export default MainMenuCard;
