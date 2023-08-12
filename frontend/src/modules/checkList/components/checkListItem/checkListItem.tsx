import React from 'react';
import style from './checkListItem.module.scss';
import Card from '@main/components/card/card';
import { Link } from 'react-router-dom';

interface IProp {
  readonly title: string;
  readonly strLen?: number;
}

const CheckListItem = ({ title, strLen = 200 }: IProp) => {
  return (
    <Card>
      <Link to={'#'}>
        <h3>{ `${title.substring(0, strLen)} ${ title.length > strLen ? '...' : '' }` }</h3>
      </Link>
    </Card>
  );
};

export default CheckListItem;
