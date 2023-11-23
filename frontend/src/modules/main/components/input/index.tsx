import React, { useEffect, useState, type ChangeEventHandler, SyntheticEvent } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { EError } from '@auth/store/index';
import { isEmpty as isEmptyValid } from '@lib/utils/validators';
import 'react-datepicker/dist/react-datepicker.css';
import style from './input.module.scss';

interface ISelectData {
  id: number;
  name: string;
}

interface IProp {
  id: string;
  type?: 'text' | 'password' | 'date' | 'select';
  label: string;
  value?: any;
  error?: EError | null;
  selectData?: ISelectData[];
  isRequired?: boolean;
  onChange?: any;
}

registerLocale('ru', ru);

const Input = ({
  id, type = 'text',
  label,
  value,
  error,
  selectData = [],
  onChange,
  isRequired = false,
} : IProp) => {
  return (
    <label className={ style.container } onClick={(e) => e.preventDefault()}>
      { error && <span className={ style.alert }>{ error }</span> }
      <span className={ style.label }>{ label }</span>

      { type === 'select' && (
        <select
          className={ style.input }
          id={id}
          onChange={onChange}
          required={isRequired}
        >
          <option>-</option>
          { selectData?.map((item: any) => (
            <option
              key={item.id}
              value={JSON.stringify({ id: item.id, name: item.name })}
            >
              { item.name }
            </option>
          )) }
        </select>
      )}

      { type === 'date' && (
        <DatePicker
          id={id}
          onChange={onChange}
          onSelect={onChange}
          className={ style.input }
          selected={value}
          locale="ru"
          dateFormat="P"
          required={isRequired}
        />
      )}

      { (type === 'text' || type === 'password') && (
        <input
            className={ style.input }
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            required={isRequired}
          />
      )}
    </label>
  );
};

export default Input;
