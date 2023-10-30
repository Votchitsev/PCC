import Button from '@main/components/button';
import Input from '@main/components/input';
import PageLayout from '@main/layouts/page';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useProfileForm } from '../hooks';
import { useLocation } from 'react-router-dom';

const AddProfilePage = () => {
  const location = useLocation();
  const profileData = location.state?.profile;
  const { profile, onChange, onSubmit, error, loading } = useProfileForm({
    firstName: profileData?.first_name || '',
    lastName: profileData?.last_name || '',
  });

  return (
    <PageLayout>
      <h1>Добавьте информацию в профиль</h1>
      <ProfileForm onSubmit={onSubmit}>
        <Input
          id="firstName"
          label="Имя"
          type="text"
          value={profile.firstName}
          onChange={onChange}
        />
        <Input
          id="lastName"
          label="Фамилия"
          type="text"
          value={profile.lastName}
          onChange={onChange}
        />
        <Button
          text="Сохранить"
          type="submit"
          isLoading={loading}
        />
      </ProfileForm>
      { error && JSON.stringify(error) }
    </PageLayout>
  );
};

export default AddProfilePage;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  justify-self: center;
`;
