import React from 'react';
import { useLoaderData } from 'react-router-dom';
import PageLayout from '@main/layouts/page';
import CheckLists from '../components/checkLists';
import EmptyList from '@checkList/components/emptyList';
import NavigateLink from '@checkList/components/navigateLink';
import { ERoutes } from '@lib/routes';

export interface ICheckListInformation {
  id: number;
  name: string;
}

const CheckListsPage = () => {
  const loaderData = useLoaderData() as ICheckListInformation[];

  return (
    <PageLayout>
      <NavigateLink
        href={ERoutes.ROOT}
        name="Назад"
        { ...style }
      />
      <h1>Чек-листы</h1>
      { loaderData.length
        ? <CheckLists checkLists={ loaderData } />
        : <EmptyList /> }
    </PageLayout>
  );
};

const style = {
  style: {
    marginTop: '20px',
    marginLeft: '20px',
  },
};

export default CheckListsPage;
