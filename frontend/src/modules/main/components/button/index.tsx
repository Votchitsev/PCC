import React, { MouseEvent } from 'react';
import style from './button.module.scss';

interface IProp {
  text: string;
  type: 'submit' | 'button';
  clickHandler?: (e: MouseEvent) => void;
}

const Button = ({ text, type, clickHandler } : IProp) => {
  return (
    <button
      className={ style.button }
      type={ type }
      onClick={ clickHandler }
    >
      { text }
    </button>
  );
};

export default Button;
