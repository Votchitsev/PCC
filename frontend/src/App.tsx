import React from 'react';
import MainLayout from '@main/layouts/main';
import Header from '@main/components/header';
import Page from '@auth/pages/reg';

const App = () => {
  return (
    <MainLayout>
      <Header />
      <Page />
    </MainLayout>
  );
};

export default App;
