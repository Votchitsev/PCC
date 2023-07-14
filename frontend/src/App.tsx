import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import MainLayout from '@main/layouts/main';
import Header from '@main/components/header';
import AuthPage from '@auth/pages/auth';
import RegPage from '@auth/pages/reg';

const App = () => {
  return (
    <MainLayout>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<div>Стартовая страница</div>} />
            <Route path="/sign-in" element={ <AuthPage /> } />
            <Route path="/sign-up" element={ <RegPage /> } />
          </Routes>
      </BrowserRouter>
    </MainLayout>
  );
};

export default App;
