import React from 'react';
import PageLayout from '@main/layouts/page';
import UserInspections from '@main/components/UserInspections';
import { useDocumentTitle } from '@main/hooks';

const MainPage = () => {
  useDocumentTitle('Главная');

  return (
    <PageLayout>
      <UserInspections />
    </PageLayout>
  );
};

export default MainPage;
