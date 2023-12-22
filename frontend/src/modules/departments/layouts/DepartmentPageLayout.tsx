import React from 'react';
import styled from 'styled-components';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const DepartmentPageLayout = ({ title, children }: IProps) => {
  return (
    <Container>
      <h1>{ title }</h1>
        { children }
    </Container>
  );
};

export default DepartmentPageLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  @media screen and (max-width: 1524px) {
    width: 768px;
  }

  @media screen and (max-width: 1200px) {
    width: 480px;
  }

  @media screen and (max-width: 620px) {
    width: 230px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr;
`;
