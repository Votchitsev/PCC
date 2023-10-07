import React from 'react';
import style from './index.module.scss';

interface IProps {
  id: number;
  result: {id: number, result: boolean | null}
  setResult: ({}: {id: number, result: boolean | null}) => void;
}

const CheckBox = ({ id, result, setResult }: IProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && e.target.name === 'yes') {
      setResult({
        id,
        result: true,
      });
      return;
    }

    if (e.target.checked && e.target.name === 'no') {
      setResult({
        id,
        result: false,
      });
    }

    if (!e.target.checked) {
      setResult({
        id,
        result: null,
      });
    }
  };

  return (
    <div className={ style.container }>
      <label className={style.label}>
        { 'Да' }
        <input
          className={style.checkbox}
          type="checkbox"
          checked={result.result === true}
          name="yes"
          onChange={handleChange}
        />
      </label>
      <label className={style.label}>
        { 'Нет' }
        <input
          className={style.checkbox}
          type="checkbox"
          checked={result.result === false}
          name="no"
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default CheckBox;
