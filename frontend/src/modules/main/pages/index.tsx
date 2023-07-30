import MainMenuBar from '@main/components/mainMenuBar';
import MainLayout from '@main/layouts/main';
import PageLayout from '@main/layouts/page';
import React from 'react';

const MainPage = () => {
  return (
    <PageLayout>
      <MainMenuBar />
    </PageLayout>
  );
};

export default MainPage;
