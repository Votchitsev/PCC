import React from 'react';
import { useLoaderData } from 'react-router-dom';
import PageLayout from '@main/layouts/page';
import CheckListForm from '../components/checkListForm';
import { ICheckList } from '../entity';
import { ERoutes } from '@lib/routes';
import NavigateLink from '@main/components/navigateLink';
import styled from 'styled-components';

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
      <CheckListForm checkListData={checkList} />
    </PageLayout>
  );
};

export default CheckListPage;

const StyledNavLink = styled.div`
  width: fit-content;
  margin-top: 20px;
  margin-left: 20px;
`;
