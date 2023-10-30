import { ERoutes } from '@lib/routes';
import Button from '@main/components/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'store';
import styled from 'styled-components';

const ProfilePlug = () => {
  const navigate = useNavigate();
  const { AuthStore } = useStore();
  const id = AuthStore.authUser?.id;

  const clickHandler = () => {
    navigate(ERoutes.PROFILE_ADD.replace(':id', String(id)));
  };

  return (
    <ProfilePlugContainer>
      <ProfilePlugText>
        { 'Профиль пуст' }
      </ProfilePlugText>
      <Button
        text="Заполнить"
        type="button"
        clickHandler={clickHandler}
      />
    </ProfilePlugContainer>
  );
};

export default ProfilePlug;

const ProfilePlugContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfilePlugText = styled.p`
  margin-top: 2em;
`;
