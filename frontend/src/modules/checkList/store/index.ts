import { makeAutoObservable, values } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import ApiClient from '@api/index';
import LocalStorage from '@lib/utils/localStorage';
import { IQuestion } from '../entity';

class CheckListStore {
  _questions: IQuestion[] = [];
  _title: string = 'Новый чек-лист';
  
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    makePersistable(this, {
      name: CheckListStore.name,
      properties: [
        '_title',
        {
          key: '_questions',
          serialize: (value) => {
            return JSON.stringify(value);
          },
          deserialize: (value) => {
            return JSON.parse(value);
          },
        },
      ],
      storage: window.localStorage,
    });
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
      '/check-list/create',
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
