import React from 'react';
import { useLoaderData } from 'react-router-dom';
import PageLayout from '@main/layouts/page';
import CheckListForm from '../components/checkListForm';
import { ICheckList } from '../entity';

const CheckListPage = () => {  
  const checkList = useLoaderData() as ICheckList;

  return (
    <PageLayout>
      <CheckListForm checkListData={checkList} />
    </PageLayout>
  );
};

export default CheckListPage;
