import React from 'react';
import style from './button.module.scss';

interface IProp {
  text: string;
  type: 'submit' | 'button';
}

const Button = ({ text, type } : IProp) => {
  return (
    <button
      className={ style.button }
      type={ type }
    >
      { text }
    </button>
  );
};

export default Button;
