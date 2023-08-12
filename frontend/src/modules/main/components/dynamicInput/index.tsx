import React, { CSSProperties, ChangeEvent, ChangeEventHandler, useEffect, useRef, useState, KeyboardEvent } from 'react';
import style from './dynamicInput.module.scss';

interface IProp {
  id: string;
  type: 'text' | 'number';
  extraStyle?: CSSProperties;
  initValue: string | number;
  min?: number;
  max?: number;
  clue?: string;
  onChangeHandler: ChangeEventHandler;
}

const DynamicInput = ({
  id,
  type,
  extraStyle,
  initValue,
  min,
  max,
  clue,
  onChangeHandler,
}: IProp) => {
  const [value, setValue] = useState(initValue);
  
  const [inputVisibility, setInputVisibility] = useState(false);
  const [previewVisibility, setPreviewVisibility] = useState(true);

  const inputRef: any = useRef<HTMLInputElement>();

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      inputRef.current.blur();
    }
  };

  const changeVisibility = () => {
    if (type === 'text' && !value) {      
      inputRef.current.value = initValue;
      return;
    }

    setInputVisibility(!inputVisibility);
    setPreviewVisibility(!previewVisibility);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeHandler(e);
    setValue(e.target.value);
  };

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  useEffect(() => {
    if (inputVisibility) {
      inputRef.current.focus();
      inputRef.current.select();
    }

  }, [inputVisibility]);

  return (
    <>
      <input
        id={ id }
        type={type}
        className={`${style.input} ${ !inputVisibility && style.hidden } ${extraStyle}`}
        value={value}
        onChange={onChange}
        onBlur={changeVisibility}
        ref={inputRef}
        min={min}
        max={max}
        onKeyDown={onKeyDown}
      />
      <div
        className={`${style.preview} ${!previewVisibility && style.hidden} ${extraStyle}`}
        onClick={changeVisibility}
        title={clue}
      >{ value }</div>
    </>
  );
};

export default DynamicInput;
