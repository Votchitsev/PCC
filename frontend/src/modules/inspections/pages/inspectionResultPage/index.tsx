import { useLoaderData } from 'react-router-dom';
import NavigateLink from '@checkList/components/navigateLink';
import { ERoutes } from '@lib/routes';
import PageLayout from '@main/layouts/page';
import React from 'react';
import { type IInspectionExtended } from '@inspections/entity';
import ResultCheckList from '@inspections/components/resultCheckList';
import Button from '@main/components/button';

const InspectionResultPage = () => {
  const inspection = useLoaderData() as IInspectionExtended;

  return (
    <PageLayout>
      <NavigateLink { ...style } href={ERoutes.ROOT} name="Назад" />
      <h1>{ 'Результат проверки' }</h1>
      <ResultCheckList inspection={inspection} />
    </PageLayout>
  );
};

const style = {
  style: {
    marginTop: '20px',
    marginLeft: '20px',
  },
};


export default InspectionResultPage;