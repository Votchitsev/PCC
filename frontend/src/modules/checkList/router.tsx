import { ADD_CHECKLIST_ROUTE } from '@lib/routes';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CheckListPage from './pages/checkListPage';

const CheckListRouter = () => {
  return (
    <Routes>
      <Route path={ADD_CHECKLIST_ROUTE} element={ <CheckListPage />}/>
    </Routes>
  );
};

export default CheckListRouter;
