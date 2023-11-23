import React from 'react';
import styled from 'styled-components';
import PageLayout from '@main/layouts/page';
import { ERoutes } from '@lib/routes';
import NavigateLink from '@main/components/navigateLink';
import { AnalyticsReportList } from '../widgets/';

const AnalyticsPage = () => {
  return (
    <PageLayout>
      <TopContainer>
        <NavigateLink
          name="Назад"
          href={ERoutes.ROOT}
        />
      </TopContainer>
      <h1>Аналитика</h1>
      <AnalyticsReportList />
    </PageLayout>
  );
};


export default AnalyticsPage;

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 20px;
`;
