import React from 'react';
import { InspectionList } from '@inspections/index';
import { useUserInspections } from '@inspections/index';
import styled from 'styled-components';


const UserInspections = () => {
  const { userInspections } = useUserInspections();
  
  return (
    <Container>
      <Title>Мои проверки...</Title>
      <InspectionList inspections={userInspections} />
      <AllInspectionsLink href="/inspections">
        Посмотреть все проверки
      </AllInspectionsLink>
    </Container>
  );
};

export default UserInspections;

const Container = styled.div`  
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AllInspectionsLink = styled.a`
  text-decoration: underline;
  
  &:hover {
    cursor: pointer;
    text-decoration: none;
  }
`;
