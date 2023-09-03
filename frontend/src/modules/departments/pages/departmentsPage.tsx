import PageLayout from '@main/layouts/page';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { IDepartmentGroup } from '../entity';
import DepartmentList from '../components/departmentList';
import NavigateLink from '@checkList/components/navigateLink';
import { ERoutes } from '@lib/routes';

const DepartmentsPage = () => {
  const departmentsData = useLoaderData() as IDepartmentGroup;

  return (
    <PageLayout>
      <NavigateLink { ...style } href={ERoutes.DEPARTMENT_GROUPS} name="Назад" />
      <h1>{ departmentsData.name }</h1>
      <DepartmentList departments={ departmentsData.departments }/>
    </PageLayout>
  );
};

const style = {
  style: {
    marginTop: '20px',
    marginLeft: '20px',
  },
};

export default DepartmentsPage;
