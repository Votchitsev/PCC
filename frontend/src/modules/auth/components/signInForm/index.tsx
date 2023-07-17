import React, { ChangeEvent, FormEvent, useState } from 'react';
import Input from '@main/components/input';
import Button from '@main/components/button';
import { Link } from 'react-router-dom';
import { ROOT_ROUTE } from '@lib/routes';
import style from './form.module.scss';
import { observer } from 'mobx-react';
import { useStore } from 'store';

interface IFormData {
  username: string;
  password: string;
}

const initFormData = {
  username: '',
  password: '',
};

const SignInForm = () => {
  const [formData, setFormData] = useState<IFormData>(initFormData);
  const { AuthStore } = useStore();
  
  const onChangeHandler = (e: ChangeEvent<HTMLFormElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value },
    );
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    AuthStore.fetchAuthData(formData);
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

export default observer(SignInForm);
