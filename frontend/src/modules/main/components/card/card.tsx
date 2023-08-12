import React, { CSSProperties, ReactNode } from 'react';
import style from './card.module.scss';

interface IProps {
  readonly children: ReactNode;
  readonly extraStyle?: CSSProperties;
}

const Card = ({ children, extraStyle }: IProps) => {
  return (
    <div className={style.card} style={extraStyle}>
      { children }
    </div>
  );
};

export default Card;
