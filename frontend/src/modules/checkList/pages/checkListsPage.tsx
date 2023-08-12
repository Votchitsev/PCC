import React from 'react';
import { useLoaderData } from 'react-router-dom';
import PageLayout from '@main/layouts/page';
import CheckLists from '../components/checkLists';

export interface ICheckListInformation {
  id: number;
  name: string;
}

const CheckListsPage = () => {
  const loaderData = useLoaderData() as ICheckListInformation[];

  return (
    <PageLayout>
      <h1>Чек-листы</h1>
      <CheckLists checkLists={ loaderData } />
    </PageLayout>
  );
};

export default CheckListsPage;
