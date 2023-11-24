import React from 'react';
import NavigateLink from '@main/components/navigateLink';
import styled from 'styled-components';
import { ERoutes } from '@lib/routes';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const ReportLayout = ({ title, children }: IProps) => {
  return (
    <Report>
      <TopContainer>
        <NavigateLink
          name="Назад"
          href={ERoutes.ROOT}
        />
      </TopContainer>
      <ReportTitle>{ title }</ReportTitle>
      { children }
    </Report>
  );
};

export default ReportLayout;

const Report = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content 1fr;
  gap: 1em;
`;

const TopContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: span col2-start;
  padding: 1em;
`;

const ReportTitle = styled.h1`
  grid-column-start: 1;
  grid-column-end: span col2-start;
`;
