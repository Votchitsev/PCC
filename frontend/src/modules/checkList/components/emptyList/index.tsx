import React from 'react';
import { ERoutes } from '@lib/routes';
import Button from '@main/components/button';
import { useNavigate } from 'react-router-dom';
import style from './emptyList.module.scss';

const EmptyList = () => {
  const navigate = useNavigate();
  return (
    <div className={style.empty_list}>
      <h3>У вас нет чек-листов</h3>
      <Button
        text="Создать"
        clickHandler={() => navigate(ERoutes.ADD_CHECK_LIST)}
        type="button"
      />
    </div>
  );
};

export default EmptyList;
