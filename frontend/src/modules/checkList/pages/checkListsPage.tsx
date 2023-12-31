import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import PageLayout from '@main/layouts/page';
import Button, { EButtonColor } from '@main/components/button';
import CheckLists from '../components/checkLists';
import EmptyList from '@checkList/components/emptyList';
import NavigateLink from '@main/components/navigateLink';
import TopContainer from '@main/components/topContainer';
import { ERoutes } from '@lib/routes';
import { useDocumentTitle } from '@main/hooks';

export interface ICheckListInformation {
  id: number;
  name: string;
}

const CheckListsPage = () => {
  const loaderData = useLoaderData() as ICheckListInformation[];
  const navigate = useNavigate();

  useDocumentTitle('Чек-листы');

  return (
    <PageLayout>
      <TopContainer>
        <NavigateLink
          name="Назад"
          callback={() => navigate(-1)}
        />
        <Button
            type="button"
            text="Создать"
            clickHandler={() => {
              navigate(ERoutes.ADD_CHECK_LIST);
            }}
            color={EButtonColor.danger}
          />
      </TopContainer>
      <h1>Чек-листы</h1>
      { loaderData.length
        ? <CheckLists checkLists={ loaderData } />
        : <EmptyList /> }
    </PageLayout>
  );
};

export default CheckListsPage;
