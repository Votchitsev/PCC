import { useLoaderData, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageLayout from '@main/layouts/page';
import React from 'react';
import { type IInspectionExtended } from '@inspections/entity';
import ResultCheckList from '@inspections/components/resultCheckList';
import { useDocumentTitle } from '@main/hooks';

const InspectionResultPage = () => {
  const inspection = useLoaderData() as IInspectionExtended;

  useDocumentTitle(`Результат проверки|${inspection.department}`);

  const navigate = useNavigate();

  return (
    <PageLayout>
      <StyledNavLink onClick={() => navigate(-1)}>
        Назад
      </StyledNavLink>
      <h1>{ 'Результат проверки' }</h1>
      <ResultCheckList inspection={inspection} />
    </PageLayout>
  );
};

export default InspectionResultPage;


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
