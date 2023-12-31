import { useLoaderData, useNavigate } from 'react-router-dom';
import PageLayout from '@main/layouts/page';
import React from 'react';
import { type IInspectionExtended } from '@inspections/entity';
import ResultCheckList from '@inspections/components/resultCheckList';
import { useDocumentTitle } from '@main/hooks';
import TopContainer from '@main/components/topContainer';
import NavigateLink from '@main/components/navigateLink';

const InspectionResultPage = () => {
  const inspection = useLoaderData() as IInspectionExtended;

  useDocumentTitle(`Результат проверки|${inspection.department}`);

  const navigate = useNavigate();

  return (
    <PageLayout>
      <TopContainer>
        <NavigateLink
          name="Назад"
          callback={() => navigate(-1)}
        />
      </TopContainer>
      <h1>{ 'Результат проверки' }</h1>
      <ResultCheckList inspection={inspection} />
    </PageLayout>
  );
};

export default InspectionResultPage;
