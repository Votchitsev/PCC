import React, { MouseEvent } from 'react';
import style from './button.module.scss';
import Loader from '@assets/icons/ButtonLoader.svg';

export enum EButtonColor {
  regular = 'regular',
  danger = 'danger',
  disable = 'disable',
}

interface IProp {
  text: string;
  type: 'submit' | 'button';
  isLoading?: boolean;
  isDisable?: boolean;
  color?: EButtonColor;
  clickHandler?: (e: MouseEvent) => void;
}

const Button = ({
  text,
  type,
  isLoading = false,
  isDisable = false,
  color = EButtonColor.regular,
  clickHandler,
} : IProp) => {
  const onClick = (e: MouseEvent) => {
    if (!isLoading && !isDisable && clickHandler) {
      clickHandler(e);
    }
  };

  return (
    <button
      className={ `${style.button} ${ isDisable ? style.disable : style[color] }` }
      type={ type }
      onClick={ onClick }
    >
      {isLoading ?  <img className={ style.loading } src={Loader as any} /> : text }
    </button>
  );
};

export default Button;
