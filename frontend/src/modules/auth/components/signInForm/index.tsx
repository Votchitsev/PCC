import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import Input from '@main/components/input';
import Button from '@main/components/button';
import { Link, useNavigate } from 'react-router-dom';
import { ROOT_ROUTE } from '@lib/routes';
import style from './form.module.scss';
import { observer } from 'mobx-react';
import { useStore } from 'store';
import { EError } from '@auth/store';
import LocalStorage from '@lib/utils/localStorage';

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
  const navigate = useNavigate();
  
  const onChangeHandler = (e: ChangeEvent<HTMLFormElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value },
    );
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', formData.username);
    data.append('password', formData.password);
    
    await AuthStore.fetchAuthData(data);
  };

  useEffect(() => {   
    if (AuthStore.error) {
      return;
    }

    if (AuthStore.authUser) {
      setFormData(initFormData);
      console.log(LocalStorage.get('token'));
      navigate(ROOT_ROUTE);
    }
  }, [AuthStore.error, AuthStore.authUser]);

  useEffect(() => {
    return AuthStore.setError(null);
  }, []);

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
        isRequired={true}
        error={AuthStore.error === EError.BAD_CREDENTIALS
          ? AuthStore.error
          : null}
      />
      <Input
        label="Пароль"
        onChange={onChangeHandler}
        id="password"
        type="password"
        value={formData.password}
        isRequired={true}
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

export default observer(SignInForm);
