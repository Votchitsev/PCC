import React, { type ChangeEventHandler } from 'react';
import style from './input.module.scss';

interface IProp {
  id: string;
  type?: 'text' | 'password';
  label: string;
  value: string | number;
  onChange: ChangeEventHandler;
}

const Input = ({
  id, type = 'text',
  label,
  value,
  onChange,
} : IProp) => {
  return (
    <label className={ style.container }>
      {/* <span className={ style.alert }>{'Пользователь уже существует'}</span> */}
      <span className={ style.label }>{ label }</span>
      <input
        className={ style.input }
        id={id}
        type={type}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
