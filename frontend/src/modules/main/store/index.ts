import { makeAutoObservable } from 'mobx';

class ModalStore {
  private _modal: JSX.Element | null = null;

  constructor () {
    makeAutoObservable(this);
  }

  public setModal(modal: JSX.Element | null) {
    this._modal = modal;
  }

  public get modal(): JSX.Element | null {
    return this._modal;
  }
}

export default ModalStore;
