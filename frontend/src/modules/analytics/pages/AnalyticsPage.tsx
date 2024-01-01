import React from 'react';
import PageLayout from '@main/layouts/page';
import NavigateLink from '@main/components/navigateLink';
import { AnalyticsReportList } from '../widgets/';
import { useDocumentTitle } from '@main/hooks';
import { useNavigate } from 'react-router-dom';
import TopContainer from '@main/components/topContainer';

const AnalyticsPage = () => {
  useDocumentTitle('Аналитика');

  const navigate = useNavigate();

  return (
    <PageLayout>
      <TopContainer>
        <NavigateLink
          name="Назад"
          callback={() => navigate(-1)}
        />
      </TopContainer>
      <h1>Аналитика</h1>
      <AnalyticsReportList />
    </PageLayout>
  );
};

export default AnalyticsPage;
