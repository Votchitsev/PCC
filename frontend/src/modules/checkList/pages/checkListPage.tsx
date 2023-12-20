import React from 'react';
import { useLoaderData } from 'react-router-dom';
import PageLayout from '@main/layouts/page';
import CheckListForm from '../components/checkListForm';
import { ICheckList } from '../entity';
import { ERoutes } from '@lib/routes';
import NavigateLink from '@main/components/navigateLink';
import styled from 'styled-components';
import CheckListView from '@checkList/components/checkListView';

const CheckListPage = () => {  
  const checkList = useLoaderData() as ICheckList;

  return (
    <PageLayout>
      <StyledNavLink>
        <NavigateLink
          name="Назад"
          href={ERoutes.CHECK_LISTS}
        />
      </StyledNavLink>
      <CheckListFormContainer>
        <CheckListForm checkListData={checkList} />
      </CheckListFormContainer>
      <CheckListViewContainer>
        <CheckListView checkListData={checkList} />
      </CheckListViewContainer>
    </PageLayout>
  );
};

export default CheckListPage;

const StyledNavLink = styled.div`
  width: fit-content;
  margin-top: 20px;
  margin-left: 20px;
`;

const CheckListFormContainer = styled.div`
  display: block;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const CheckListViewContainer = styled.div`
  display: none;
  
  @media screen and (max-width: 1024px) {
    display: block;
  }
`;
