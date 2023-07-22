import React, {
    useState,
    FormEvent,
    useEffect,
    type ChangeEvent, 
  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from 'store';
import Input from '@main/components/input';
import Button from '@main/components/button';
import { ROOT_ROUTE } from '@lib/routes';
import style from './form.module.scss';
import { comparePassword } from '@lib/utils/validators';
import { EError } from '@auth/store';

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
  const { AuthStore } = useStore();
  const { authUser, error } = AuthStore;

  const navigate = useNavigate();

  const onChangeHandler = (e: ChangeEvent<HTMLFormElement>) => {
    if (error) {
      AuthStore.setError(null);
    }

    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comparePassword(formData.password, formData.confirmPassword)) {      
      AuthStore.setError(EError.NOT_COMPARE_PASSWORD);
      return;
    }

    AuthStore.fetchRegData(formData);
  };

  useEffect(() => {
    if (error) {
      return;
    }

    if (authUser) {
      setFormData(initFormData);
      navigate(ROOT_ROUTE);
    }
  }, [error, authUser]);

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
        error={error === EError.USER_EXISTS ? error : null}
        isRequired={true}
      />
      <Input
        label="Пароль"
        onChange={onChangeHandler}
        id="password"
        type="password"
        value={formData.password}
        isRequired={true}
      />
      <Input
        label="Повторите пароль"
        onChange={onChangeHandler}
        id="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        error={error === EError.NOT_COMPARE_PASSWORD ? error : null}
        isRequired={true}
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

export default observer(SignUpForm);
