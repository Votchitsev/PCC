import React from 'react';
import Modal from '../modal';
import Button from '../button';
import style from './dialogModal.module.scss';

interface IProps {
  readonly title?: string;
  readonly question?: string;
  readonly confirmAction: () => void;
  readonly breakAction: () => void; 
}

const DialogModal = ({ title,  question }: IProps) => {
  return (
    <Modal>
      { title && <h3>{ title }</h3> }
      <p>{ question }</p>
      <div className={style.button_bar}>
        <Button
          text="Да"
          type="button"
        />
        <Button
          text="Нет"
          type="button"
        />
      </div>
    </Modal>
  );
};

export default DialogModal;
