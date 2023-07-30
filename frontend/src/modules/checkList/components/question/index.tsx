import React, { type ReactNode } from 'react';
import style from './question.module.scss';

const Question = ({ children }: { children: ReactNode }) => {
  return (
    <div className={style.question}>
      { children }
    </div>
  );
};

export default Question;
