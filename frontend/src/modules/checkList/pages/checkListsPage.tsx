import React from 'react';
import { useLoaderData } from 'react-router-dom';
import PageLayout from '@main/layouts/page';
import CheckLists from '../components/checkLists';
import EmptyList from '@checkList/components/emptyList';
import NavigateLink from '@main/components/navigateLink';
import { ERoutes } from '@lib/routes';
import styled from 'styled-components';

export interface ICheckListInformation {
  id: number;
  name: string;
}

const CheckListsPage = () => {
  const loaderData = useLoaderData() as ICheckListInformation[];

  return (
    <PageLayout>
      <StyledNavLink>
        <NavigateLink
          href={ERoutes.ROOT}
          name="Назад"
        />
      </StyledNavLink>
      <h1>Чек-листы</h1>
      { loaderData.length
        ? <CheckLists checkLists={ loaderData } />
        : <EmptyList /> }
    </PageLayout>
  );
};

export default CheckListsPage;

const StyledNavLink = styled.div`
  width: fit-content;
  margin-top: 20px;
  margin-left: 20px;
`;
