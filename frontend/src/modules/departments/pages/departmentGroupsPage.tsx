import React from 'react';
import PageLayout from '@main/layouts/page';
import { useLoaderData } from 'react-router-dom';
import Card from '@main/components/card/card';
import { IDepartment } from '../entity';
import Container from '@main/components/container';
import DepartmentGroupList from '../components/departmentGroupList';

const DepartmentGroupsPage = () => {
  const departmentGroups = useLoaderData() as IDepartment[];

  return (
    <PageLayout>
      <h1>Группы подразделений</h1>
      <DepartmentGroupList departmentGroups={ departmentGroups } />
    </PageLayout>
  );
};

export default DepartmentGroupsPage;
