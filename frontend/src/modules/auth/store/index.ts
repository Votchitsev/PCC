import { makeAutoObservable } from 'mobx';
import ApiClient from '@api/index';

interface IRegCredentials {
  username: string;
  password: string;
  confirmPassword: string;
}

interface IUser {
  username: string;
  accessToken: string;
}

class AuthStore {
  _authUser: IUser;


  constructor() {
    makeAutoObservable(this);
  }

  setAuthUser(user: IUser) {
    this._authUser = user;
  }

  /**
   *  Возвращает данные об авторизованном пользователе
   */
  get authUser () {
    return this.authUser;
  }

  /**
   * Отправляет на сервер данные для регистрации
   * @param credentials данные для регистрации
   */
  async fetchRegData(credentials: IRegCredentials): Promise<void> {
    const response = await ApiClient.post('/auth/sign-up/', credentials);
    this.setAuthUser(response.data);
    
  }
}

export default AuthStore;
