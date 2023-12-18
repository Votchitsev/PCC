import React from 'react';
import PageLayout from '@main/layouts/page';
import UserInspections from '@main/components/UserInspections';

const MainPage = () => {
  return (
    <PageLayout>
      <UserInspections />
    </PageLayout>
  );
};

export default MainPage;
