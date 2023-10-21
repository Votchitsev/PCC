import React, { useEffect } from 'react';
import { useStore } from 'store';
import styled from 'styled-components';
import NavbarItem from '../navbarItem';

const Navbar = () => {
  const { NavigationStore } = useStore();

  useEffect(() => {
    
  }, []);

  return (
    <Container>
      { NavigationStore.navigationRoutes.map((route) => (
        <NavbarItem
          key={route.name}
          name={route.name}
          icon={route.icon} href={route.href}
        />
      )) }
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 1em;
  row-gap: 1em;
`;

export default Navbar;
