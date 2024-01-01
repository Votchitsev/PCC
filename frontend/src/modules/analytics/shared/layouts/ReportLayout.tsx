import TopContainer from '@main/components/topContainer';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NavigateLink from '@main/components/navigateLink';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const ReportLayout = ({ title, children }: IProps) => {
  const navigate = useNavigate();

  return (
    <Report>
      <TopContainer>
        <NavigateLink
          callback={() => navigate(-1)}
          name="Назад"
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

const ReportTitle = styled.h1`
  grid-column-start: 1;
  grid-column-end: span col2-start;
`;

