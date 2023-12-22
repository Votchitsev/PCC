import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const ReportLayout = ({ title, children }: IProps) => {
  const navigate = useNavigate();

  return (
    <Report>
      <TopContainer>
        <StyledNavLink role="button" onClick={() => navigate(-1)}>
          Назад
        </StyledNavLink>
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
