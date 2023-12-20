import React from 'react';
import styled from 'styled-components';
import style from './Header.module.scss';
import Login from '@auth/components/headerLogin';
import Button, { EButtonColor } from '../button';
import { AddInspectionButton } from '@inspections/index';

const Header = () => {
  return (
    <header className={ style.header }>
      <div className={ style.container }>
        <div />
        <ButtonContainer>
          <AddInspectionButton />
        </ButtonContainer>
        <Login />
      </div>
    </header>
  );
};

export default Header;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  
  button {
    font-size: 0.8em;
  }

  @media screen and (max-width: 768px) {
    justify-content: flex-start;
  }
`;
