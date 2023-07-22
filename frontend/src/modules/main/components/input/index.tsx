import React, { useEffect, useState, type ChangeEventHandler } from 'react';
import { EError } from '@auth/store/index';
import { isEmpty as isEmptyValid } from '@lib/utils/validators';
import style from './input.module.scss';

interface IProp {
  id: string;
  type?: 'text' | 'password';
  label: string;
  value: string | number;
  error?: EError | null;
  isRequired?: boolean;
  onChange: ChangeEventHandler;
}

const Input = ({
  id, type = 'text',
  label,
  value,
  error,
  onChange,
  isRequired = false,
} : IProp) => {
  return (
    <label className={ style.container }>
      { error && <span className={ style.alert }>{ error }</span> }
      <span className={ style.label }>{ label }</span>
      <input
        className={ style.input }
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={isRequired}
      />
    </label>
  );
};

export default Input;
