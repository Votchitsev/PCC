import React from 'react';
import Modal from '../modal';
import Button, { EButtonColor } from '../button';
import style from './dialogModal.module.scss';
import { useStore } from 'store';
import { observer } from 'mobx-react';

interface IProps {
  readonly title?: string;
  readonly question?: string;
  readonly store?: any;
  readonly confirmAction: () => void;
  readonly breakAction: () => void;
}

const DialogModal = ({
  title,
  question,
  store,
  confirmAction,
  breakAction,
}: IProps) => {
  return (
    <Modal>
      { title && <h3 className={style.title}>{ title }</h3> }
      <p>{ question }</p>
      <div className={style.button_bar}>
        <Button
          text="Да"
          type="button"
          isLoading={store.isLoading.delete}
          color={EButtonColor.danger}
          clickHandler={confirmAction}
        />
        <Button
          text="Нет"
          type="button"
          clickHandler={breakAction}
        />
      </div>
    </Modal>
  );
};

export default observer(DialogModal);
