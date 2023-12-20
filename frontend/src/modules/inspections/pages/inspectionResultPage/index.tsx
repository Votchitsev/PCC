import { useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import NavigateLink from '@main/components/navigateLink';
import { ERoutes } from '@lib/routes';
import PageLayout from '@main/layouts/page';
import React from 'react';
import { type IInspectionExtended } from '@inspections/entity';
import ResultCheckList from '@inspections/components/resultCheckList';
import { useDocumentTitle } from '@main/hooks';

const InspectionResultPage = () => {
  const inspection = useLoaderData() as IInspectionExtended;

  useDocumentTitle(`Результат проверки|${inspection.department}`);

  return (
    <PageLayout>
      <StyledNavLink>
        <NavigateLink href={ERoutes.INSPECTIONS_ROOT} name="Назад" />
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
`;
