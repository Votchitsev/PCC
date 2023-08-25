import React from 'react';
import { useLoaderData } from 'react-router-dom';
import PageLayout from '@main/layouts/page';
import CheckListForm from '../components/checkListForm';
import { ICheckList } from '../entity';
import { ERoutes } from '@lib/routes';
import NavigateLink from '@checkList/components/navigateLink';

const CheckListPage = () => {  
  const checkList = useLoaderData() as ICheckList;

  return (
    <PageLayout>
      <NavigateLink
        name="Назад"
        href={ERoutes.CHECK_LISTS}
        { ...style }
      />
      <CheckListForm checkListData={checkList} />
    </PageLayout>
  );
};

const style = {
  style: {
    marginTop: '20px',
    marginLeft: '20px',
  },
};

export default CheckListPage;
