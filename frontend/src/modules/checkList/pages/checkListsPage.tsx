import React from 'react';
import styled from 'styled-components';
import { useLoaderData, useNavigate } from 'react-router-dom';
import PageLayout from '@main/layouts/page';
import Button, { EButtonColor } from '@main/components/button';
import CheckLists from '../components/checkLists';
import EmptyList from '@checkList/components/emptyList';
import NavigateLink from '@main/components/navigateLink';
import { ERoutes } from '@lib/routes';

export interface ICheckListInformation {
  id: number;
  name: string;
}

const CheckListsPage = () => {
  const loaderData = useLoaderData() as ICheckListInformation[];
  const navigate = useNavigate();

  return (
    <PageLayout>
      <LinksContainer>
        <NavigateLink
          href={ERoutes.ROOT}
          name="Назад"
        />
        <ButtonWrapper>
          <Button
            type="button"
            text="Создать"
            clickHandler={() => {
              navigate(ERoutes.ADD_CHECK_LIST);
            }}
            color={EButtonColor.danger}
          />
        </ButtonWrapper>
      </LinksContainer>
      <h1>Чек-листы</h1>
      { loaderData.length
        ? <CheckLists checkLists={ loaderData } />
        : <EmptyList /> }
    </PageLayout>
  );
};

export default CheckListsPage;

const LinksContainer = styled.div`
  width: 90%;
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
