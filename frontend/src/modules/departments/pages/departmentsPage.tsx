import PageLayout from '@main/layouts/page';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { IDepartmentGroup } from '../entity';
import DepartmentList from '../components/departmentList';
import NavigateLink from '@main/components/navigateLink';
import { ERoutes } from '@lib/routes';
import { useDocumentTitle } from '@main/hooks';

const DepartmentsPage = () => {
  const departmentsData = useLoaderData() as IDepartmentGroup;
  useDocumentTitle(`Подразделения|${departmentsData.name}`);

  return (
    <PageLayout>
      <LinkContainer>
        <NavigateLink
          { ...style }
          href={ERoutes.DEPARTMENT_GROUPS}
          name="Назад"
        />
      </LinkContainer>
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

const LinkContainer = styled.div`
  margin-top: 20px;
`;
