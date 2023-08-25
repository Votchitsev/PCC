import React, { MouseEvent } from 'react';
import style from './button.module.scss';
import Loader from '@assets/icons/ButtonLoader.svg';

export enum EButtonColor {
  regular = 'regular',
  danger = 'danger',
}

interface IProp {
  text: string;
  type: 'submit' | 'button';
  isLoading?: boolean;
  color?: EButtonColor;
  clickHandler?: (e: MouseEvent) => void;
}

const Button = ({ text, type, isLoading = false, color = EButtonColor.regular, clickHandler } : IProp) => {
  const onClick = (e: MouseEvent) => {
    if (!isLoading && clickHandler) {
      clickHandler(e);
    }
  };

  return (
    <button
      className={ `${style.button} ${ style[color] }` }
      type={ type }
      onClick={ onClick }
    >
      {isLoading ?  <img className={ style.loading } src={Loader as any} /> : text }
    </button>
  );
};

export default Button;
