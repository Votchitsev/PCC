import React from 'react';
import style from './App.module.scss';

const App = () => {
  return (
      <div className={ style.welcome }>
        <h1 className={ style.title }>Привет!</h1>
        <p className={ style.content }>Скоро здесь появится приложение, которое сделает лучше работу людей, занятых проверками предприятий общественного питания и торговли</p>
      </div>
  );
};

export default App;
