import { ERoutes } from '@lib/routes';
import Button from '@main/components/button';
import { IProfileResponse } from 'modules/profile/entities';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  profile: IProfileResponse;
}

const ProfileInfo = ({ profile }: IProps) => {
  const navigate = useNavigate();

  const handleChangeProfile = () => {
    navigate(
      `${ERoutes.PROFILE_DETAILS.replace(':id', String(profile.id))}/add`,
      { state: { profile } },
    );  
  };

  return (
    <ProfileInfoContainer>
      <Item>{ profile.first_name }</Item>
      <Item>{ profile.last_name }</Item>
      <Button
        type="button"
        text="Изменить"
        clickHandler={handleChangeProfile}
      />
    </ProfileInfoContainer>
  );
};

export default ProfileInfo;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
`;

const Item = styled.div`
  width: 50%;
  border: 2px solid var(--grey);
  padding: 10px;
  border-radius: 5px;
`;
