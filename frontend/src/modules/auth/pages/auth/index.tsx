import SignInForm from '@auth/components/signInForm';
import { useDocumentTitle } from '@main/hooks';
import FormLayout from '@main/layouts/form';
import React from 'react';
import styled from 'styled-components';

const Page = () => {
  useDocumentTitle('Авторизация');

  return (
    <Container>
      <FormLayout title={'Авторизация'}>
        <SignInForm />
      </FormLayout>
    </Container>
  );
};

export default Page;

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
  max-width: 90vw;
`;
