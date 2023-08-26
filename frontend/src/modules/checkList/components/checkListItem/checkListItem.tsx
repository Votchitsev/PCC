import React from 'react';
import style from './checkListItem.module.scss';
import Card from '@main/components/card/card';
import { Link } from 'react-router-dom';
import { ERoutes } from '@lib/routes';

interface IProp {
  readonly id: number;
  readonly title: string;
  readonly strLen?: number;
}

const CheckListItem = ({ id, title, strLen = 200 }: IProp) => {
  return (
    <Link to={ERoutes.CHECK_LIST_ROOT + `/${id}`}>
      <Card>
        <h3>{ `${title.substring(0, strLen)} ${ title.length > strLen ? '...' : '' }` }</h3>
      </Card>
    </Link>
  );
};

export default CheckListItem;
