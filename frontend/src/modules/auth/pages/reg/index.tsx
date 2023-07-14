import React from 'react';
import FormLayout from '@main/layouts/form';
import SignUpForm from '@auth/components/singUpForm';

const Page = () => {
  return (
    <FormLayout title={ 'Регистрация' }>
      <SignUpForm />
    </FormLayout>
  );
};

export default Page;