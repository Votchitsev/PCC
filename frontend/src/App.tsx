import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { observer } from 'mobx-react';
import MainLayout from '@main/layouts/main';
import Header from '@main/components/header';
import AuthPage from '@auth/pages/auth';
import RegPage from '@auth/pages/reg';
import { useStore } from 'store';
import { useAuth } from '@lib/hooks/auth';

const _currentUser = observer(() => {
  const { AuthStore } = useStore();

  const user = AuthStore.authUser;
  
  return (
    <pre>
      { JSON.stringify(user) }
    </pre>
  );
});

const App = () => {
  useAuth();

  return (
    <MainLayout>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<_currentUser />} />
            <Route path="/sign-in" element={ <AuthPage /> } />
            <Route path="/sign-up" element={ <RegPage /> } />
          </Routes>
      </BrowserRouter>
    </MainLayout>
  );
};

export default App;
