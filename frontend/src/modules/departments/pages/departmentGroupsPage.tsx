import React from 'react';
import PageLayout from '@main/layouts/page';
import { useLoaderData } from 'react-router-dom';
import Card from '@main/components/card/card';
import { IDepartmentGroup } from '../entity';
import Container from '@main/components/container';
import DepartmentGroupList from '../components/departmentGroupList';
import NavigateLink from '@checkList/components/navigateLink';
import { ERoutes } from '@lib/routes';

const DepartmentGroupsPage = () => {
  const departmentGroups = useLoaderData() as IDepartmentGroup[];

  return (
    <PageLayout>
      <NavigateLink { ...style } href={ERoutes.ROOT} name="Назад" />
      <h1>Группы подразделений</h1>
      <DepartmentGroupList departmentGroups={ departmentGroups } />
    </PageLayout>
  );
};

const style = {
  style: {
    marginTop: '20px',
    marginLeft: '20px',
  },
};

export default DepartmentGroupsPage;
