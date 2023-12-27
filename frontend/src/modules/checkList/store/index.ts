import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { ApiClient } from '@api/index';
import LocalStorage from '@lib/utils/localStorage';
import { IQuestion } from '../entity';
import { EAPIRoutes } from '@lib/routes';

interface ILoading {
  create: boolean;
  delete: boolean;
}

class CheckListStore {
  _questions: IQuestion[] = [];
  _title: string = 'Новый чек-лист';
  _isLoading: ILoading = {
    create: false,
    delete: false,
  };
  
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
    return this._questions.slice().sort((a, b) => a.order - b.order);
  }

  public async saveToDb (id?: number) {
    this._isLoading.create = true;

    const token = LocalStorage.get('token');

    if (!token) {
      this._isLoading.create = false;
      return;
    }

    this.updateOrder();
    
    const data = {
      title: this._title,
      questions: this._questions,
    };

    if (id) {
      const response = await ApiClient.put(
        EAPIRoutes.CHECK_LIST + `/${id}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this._isLoading.create = false;
        return response;
    }
    
    const response = await ApiClient.post(
      '/check-list/create',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    this._isLoading.create = false;
  }

  public async deleteFromDb (id: number) {
    this._isLoading.delete = true;

    try {
      await ApiClient.delete(
        EAPIRoutes.CHECK_LIST + `/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${LocalStorage.get('token')}`,
          },
        },
      );
    } catch (error) {
      console.error(error);
    } finally {
      this._isLoading.delete = false;
    }
  }

  public setIsLoading(loading: ILoading) {
    this._isLoading = loading;
  }

  public get isLoading () {
    return this._isLoading;
  }

  updateOrder() {
    this._questions = this._questions.map((question, index) => {
      question.order = index;
      return question;
    });
  }

  public changeOrder(sourceQuestion: IQuestion, targetQuestion: IQuestion) {
    const sourceIndex = this._questions.indexOf(sourceQuestion);
    const targetIndex = this._questions.indexOf(targetQuestion);

    [this._questions[sourceIndex], this._questions[targetIndex]] = [
      this._questions[targetIndex],
      this._questions[sourceIndex],
    ];

    this.updateOrder();
  }
}

export default CheckListStore;
