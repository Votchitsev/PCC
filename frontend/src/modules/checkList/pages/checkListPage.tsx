import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import PageLayout from '@main/layouts/page';
import CheckListForm from '../components/checkListForm';
import { ICheckList } from '../entity';
import NavigateLink from '@main/components/navigateLink';
import styled from 'styled-components';
import CheckListView from '@checkList/components/checkListView';
import { useDocumentTitle } from '@main/hooks';
import TopContainer from '@main/components/topContainer';

const CheckListPage = () => {
  const checkList = useLoaderData() as ICheckList;
  useDocumentTitle(`Чек-лист|${checkList?.name ? ` ${checkList.name}` : ''}`);
  
  const navigate = useNavigate();

  return (
    <PageLayout>
      <TopContainer>
        <NavigateLink
          name="Назад"
          callback={() => navigate(-1)}
        />
      </TopContainer>
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
