import ApiClient from '@api/index';
import LocalStorage from '@lib/utils/localStorage';
import { makeAutoObservable } from 'mobx';

export interface IQuestion {
  text: string;
  grade: number;
}

class CheckListStore {
  _questions: IQuestion[] = [];
  _title: string;
  
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Устанавливает текст заголовка
   * @param title заголовок
   */
  public setTitle(title: string) {
    this._title = title;
  }

  public get title (): string {
    return this._title;
  }

  /**
   * Обновляет список вопросов
   * @param name содержание вопроса
   */
  public updateQuestions(questions: IQuestion[]) {
    this._questions = questions;
  }

  public get questions () {
    return this._questions;
  }

  public async saveToDb () {
    const token = LocalStorage.get('token');

    if (!token) {
      return;
    }
    
    const data = {
      title: this._title,
      questions: this._questions,
    };
    
    const response = await ApiClient.post(
      '/check_list/create',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    console.log(response);
  }
}

export default CheckListStore;
