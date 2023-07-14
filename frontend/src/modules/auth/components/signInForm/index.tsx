import React, { ChangeEvent, FormEvent, useState } from 'react';
import style from './form.module.scss';
import Input from '@main/components/input';
import Button from '@main/components/button';

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
      <div className={ style.button_container }>
        <Button
          text="ОК"
          type="submit"
        />
      </div>
    </form>
  );
};

export default SignInForm;
