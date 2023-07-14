import SignInForm from '@auth/components/signInForm';
import FormLayout from '@main/layouts/form';
import React from 'react';

const Page = () => {
  return (
    <FormLayout title={'Авторизация'}>
      <SignInForm />
    </FormLayout>
  );
};

export default Page;
