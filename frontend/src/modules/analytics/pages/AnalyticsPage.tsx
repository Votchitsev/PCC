import React from 'react';
import styled from 'styled-components';
import PageLayout from '@main/layouts/page';
import { ERoutes } from '@lib/routes';
import NavigateLink from '@main/components/navigateLink';
import { AnalyticsReportList } from '../widgets/';
import { useDocumentTitle } from '@main/hooks';
import { useNavigate } from 'react-router-dom';

const AnalyticsPage = () => {
  useDocumentTitle('Аналитика');

  const navigate = useNavigate();

  return (
    <PageLayout>
      <TopContainer>
        <StyledNavLink role="button" onClick={() => navigate(-1)}>
          Назад
        </StyledNavLink>
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

const StyledNavLink = styled.div`
  width: fit-content;
  margin-top: 20px;
  margin-left: 20px;
  cursor: pointer;
  color: var(--blue);

  &:hover {
    color: var(--blue_hover);
  }
`;
