import { makeAutoObservable } from 'mobx';

class ModalStore {
  private _modal: JSX.Element | null = null;
  private _isLoading: boolean = false;

  constructor () {
    makeAutoObservable(this);
  }

  public setModal(modal: JSX.Element | null) {
    this._modal = modal;
  }

  public get modal(): JSX.Element | null {
    return this._modal;
  }

  public setIsLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }

  public get isLoading(): boolean {
    return this._isLoading;
  }
}

export default ModalStore;
