import React, { useState, type ChangeEvent, FormEvent } from 'react';
import Input from '@main/components/input';
import style from './form.module.scss';
import Button from '@main/components/button';
import { Link } from 'react-router-dom';
import { ROOT_ROUTE } from '@lib/routes';

interface IFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const initFormData: IFormData = {
  username: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formData, setFormData] = useState<IFormData>(initFormData);

  const onChangeHandler = (e: ChangeEvent<HTMLFormElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value },
    );
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);
    
    setFormData(initFormData);
  };

  return (
    <form
      className={ style.form }
      onSubmit={onSubmitHandler}
    >
      <Input
        label="Имя пользователя"
        onChange={onChangeHandler}
        id="username"
        value={formData.username}
      />
      <Input
        label="Пароль"
        onChange={onChangeHandler}
        id="password"
        type="password"
        value={formData.password}
      />
      <Input
        label="Повторите пароль"
        onChange={onChangeHandler}
        id="confirmPassword"
        type="password"
        value={formData.confirmPassword}
      />
      <div className={ style.button_container }>
        <Button
          text="ОК"
          type="submit"
        />
        <Link className={ style.back } to={ROOT_ROUTE}>Назад</Link>
      </div>
    </form>
  );
};

export default SignUpForm;
