import { makeAutoObservable } from 'mobx';
import { ApiClient, FormDataApiClient } from '@api/index';
import LocalStorage from '@lib/utils/localStorage';
import { EAPIRoutes } from '@lib/routes';

export enum EError {
  USER_EXISTS = 'Пользователь существует',
  NOT_COMPARE_PASSWORD = 'Пароли не совпадают',
  BAD_CREDENTIALS = 'Неверный логин или пароль',
}

interface IRegCredentials {
  username: string;
  password: string;
  confirmPassword: string;
}

interface IUser {
  username: string;
  token: string;
}

interface IAuthData {
  username: string;
  password: string;
}

class AuthStore {
  _authUser: IUser | null = null;
  _error: EError | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public setAuthUser(user: IUser) {
    this._authUser = user;
  }

  /**
   *  Возвращает данные об авторизованном пользователе
   */
  public get authUser () {
    return this._authUser;
  }

  /**
   * Устанавливает состояние ошибки
   * @param text ключ ошибки
   */

  public setError(text: EError | null) {
    this._error = text;    
  }

  public get error(): EError | null {
    return this._error;
  }

  /**
   * Получает данные авторизованного пользователя
   * @param token токен авторизации
   * @returns 
   */

  async fetchUser(token: string): Promise<IUser | null> {
    try {
      const response = await ApiClient.get('/auth/me/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        this._authUser = {
          username: response.data.username,
          token,
        };
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Отправляет на сервер данные для регистрации
   * @param credentials данные для регистрации
   */
  async fetchRegData(credentials: IRegCredentials): Promise<void> {
    try {
      const response = await ApiClient.post(EAPIRoutes.SIGN_UP, credentials);

      if (response.status === 200) {
        this.setAuthUser({
          username: response.data.username,
          token: response.data.token,
        });

        LocalStorage.set('token', response.data.token);
      }
      
    } catch (error) {
      this.setError(EError[error.response.data.detail]);
    }
  }

  /**
   * Отправляет на сервер запрос для авторизации
   * @param credentials данные для авторизации
   */
  async fetchAuthData(credentials: any): Promise<void> {
    try {
      const response = await FormDataApiClient.post(EAPIRoutes.SIGN_IN, credentials);
      
      if (response.status === 200) {
        this.setAuthUser({
          username: credentials.get('username'),
          token: response.data.token,
        });

        LocalStorage.set('token', response.data.access_token);
        this._error = null;
      }
    } catch (error) {      
      this.setError(EError[error.response.data.detail]);
    }
  }

  async fetchLogout(token: string): Promise<void> {
    const response = await ApiClient.post(EAPIRoutes.LOG_OUT, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.detail === 'USER LOGOUT') {
      this._authUser = null;
      LocalStorage.remove('token');
    }
  }
}

export default AuthStore;
