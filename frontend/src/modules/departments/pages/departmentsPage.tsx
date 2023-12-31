import PageLayout from '@main/layouts/page';
import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { IDepartmentGroup } from '../entity';
import DepartmentList from '../components/departmentList';
import NavigateLink from '@main/components/navigateLink';
import { useDocumentTitle } from '@main/hooks';
import TopContainer from '@main/components/topContainer';

const DepartmentsPage = () => {
  const departmentsData = useLoaderData() as IDepartmentGroup;
  useDocumentTitle(`Подразделения|${departmentsData.name}`);

  const navigate = useNavigate();

  return (
    <PageLayout>
      <TopContainer>
        <NavigateLink
          name="Назад"
          callback={() => navigate(-1)}
        />
      </TopContainer>
      <h1>{ departmentsData.name }</h1>
      <DepartmentList departments={ departmentsData.departments }/>
    </PageLayout>
  );
};

export default DepartmentsPage;
