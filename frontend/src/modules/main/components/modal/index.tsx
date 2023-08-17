import React, { type ReactNode } from 'react';
import style from './modal.module.scss';
import { useStore } from 'store';

interface IProps {
  children: ReactNode,
}

const Modal = ({ children }: IProps) => {
  const { ModalStore } = useStore();

  const handleClose = () => {
    ModalStore.setModal(null);
  };

  return (
    <div className={style.modal} onClick={handleClose}>
      <div className={style.container} onClick={(e) => e.stopPropagation()}>
        { children }
      </div>
    </div>
  );
};

export default Modal;
