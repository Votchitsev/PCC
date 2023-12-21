import React from 'react';
import styled from 'styled-components';

const Page404 = () => {
  return (
    <Container>
      <ContentWrapper>
        <ErrorNumber>404</ErrorNumber>
        <Content>Страница не найдена</Content>
      </ContentWrapper>
    </Container>
  );  
};

const Container = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 2em;
  align-items: flex-end;
`;

const ErrorNumber = styled.h1`
  margin: 0;
  line-height: 0.8em;
`;

const Content = styled.p`
  margin: 0;
`;

export default Page404;
