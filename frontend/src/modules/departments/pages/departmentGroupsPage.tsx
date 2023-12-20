import React from 'react';
import PageLayout from '@main/layouts/page';
import { useLoaderData } from 'react-router-dom';
import { IDepartmentGroup } from '../entity';
import DepartmentGroupList from '../components/departmentGroupList';
import NavigateLink from '@main/components/navigateLink';
import { ERoutes } from '@lib/routes';
import styled from 'styled-components';
import { useDocumentTitle } from '@main/hooks';

const DepartmentGroupsPage = () => {
  const departmentGroups = useLoaderData() as IDepartmentGroup[];

  useDocumentTitle('Группы подразделений');

  return (
    <PageLayout>
      <LinkContainer>
        <NavigateLink { ...style } href={ERoutes.ROOT} name="Назад" />
      </LinkContainer>
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

const LinkContainer = styled.div`
  margin-top: 20px;
`;
