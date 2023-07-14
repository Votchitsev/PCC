import React, { ReactNode } from 'react';
import style from './form.module.scss';

interface IProps {
  children: ReactNode,
  title: string,
}

const FormLayout = ({ children, title } : IProps) => {
  return (
    <section className={ style.layout }>
      <h1>{ title }</h1>
      <div>{ children }</div>
    </section>
  );
};

export default FormLayout;
