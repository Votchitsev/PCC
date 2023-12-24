import { ERoutes } from '@lib/routes';
import NavigateLink from '@main/components/navigateLink';
import PageLayout from '@main/layouts/page';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { ProfileInfo, ProfilePlug } from '../widgets';
import { IProfileResponse } from '../entities';
import { useDocumentTitle } from '@main/hooks';

const ProfilePage = () => {
  const profile = useLoaderData() as IProfileResponse;

  useDocumentTitle(
    'Профиль пользователя',
  );

  return (
    <PageLayout>
      <NavLinkWrapper>
        <NavigateLink href={ERoutes.ROOT} name="Назад" /> 
      </NavLinkWrapper>
      <h1>Профиль пользователя</h1>
      { profile ? <ProfileInfo profile={profile} /> : <ProfilePlug /> }
    </PageLayout>
  );
};

export default ProfilePage;

const NavLinkWrapper = styled.div`
  margin-top: 20px;
`;
