import React from 'react';
import { useLoaderData } from 'react-router-dom';
import NavigateLink from '@checkList/components/navigateLink';
import PageLayout from '@main/layouts/page';
import { ERoutes } from '@lib/routes';
import InspectionList from '@inspections/components/InspectionList';
import { type IInspection } from '@inspections/entity';



const AllInspectionsPage = () => {
  const inspectionList = useLoaderData() as IInspection[];

  return (
    <PageLayout>
      <NavigateLink { ...style } href={ERoutes.ROOT} name="Назад" />
      <h1>Последние проверки</h1>
      <InspectionList inspections={inspectionList} />
    </PageLayout>
  );
};

const style = {
  style: {
    marginTop: '20px',
    marginLeft: '20px',
  },
};

export default AllInspectionsPage;
