import React from 'react';
import PageLayout from '@main/layouts/page';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { IDepartmentGroup } from '../entity';
import DepartmentGroupList from '../components/departmentGroupList';
import NavigateLink from '@main/components/navigateLink';
import { useDocumentTitle } from '@main/hooks';
import TopContainer from '@main/components/topContainer';

const DepartmentGroupsPage = () => {
  const departmentGroups = useLoaderData() as IDepartmentGroup[];
  useDocumentTitle('Группы подразделений');

  const navigate = useNavigate();

  return (
    <PageLayout>
      <TopContainer>
        <NavigateLink
          callback={() => navigate(-1)}
          name="Назад"
        />
      </TopContainer>
      <h1>Группы подразделений</h1>
      <DepartmentGroupList departmentGroups={ departmentGroups } />
    </PageLayout>
  );
};

export default DepartmentGroupsPage;
