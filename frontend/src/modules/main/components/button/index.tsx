import React, { MouseEvent } from 'react';
import style from './button.module.scss';
import Loader from '@assets/icons/ButtonLoader.svg';

interface IProp {
  text: string;
  type: 'submit' | 'button';
  isLoading?: boolean;
  clickHandler?: (e: MouseEvent) => void;
}

const Button = ({ text, type, isLoading = false, clickHandler } : IProp) => {
  const onClick = (e: MouseEvent) => {
    if (!isLoading && clickHandler) {
      clickHandler(e);
    }
  };

  return (
    <button
      className={ style.button }
      type={ type }
      onClick={ onClick }
    >
      {isLoading ?  <img className={ style.loading } src={Loader as any} /> : text }
    </button>
  );
};

export default Button;
