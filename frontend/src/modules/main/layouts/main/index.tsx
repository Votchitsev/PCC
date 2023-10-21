import React from 'react';
import Header from '@main/components/header';
import { Outlet } from 'react-router-dom';
import { useStore } from 'store';
import { observer } from 'mobx-react';
import { Navbar } from '@navigation/components';
import styled from 'styled-components';

const MainLayout = () => {
  const { ModalStore } = useStore();

  return (
    <PageContainer>
      <Header />
        <Navbar />
        <Outlet />
      { ModalStore.modal }
    </PageContainer>
  );
};

export default observer(MainLayout);

const PageContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 3fr 1fr;
  column-gap: 1em;
`;
