import React from 'react';
import styled from 'styled-components';
import style from './Header.module.scss';
import Login from '@auth/components/headerLogin';
import { AddInspectionButton } from '@inspections/index';
import logo from '@assets/icons/logo.png';

const Header = () => {
  return (
    <header className={ style.header }>
      <div className={ style.container }>
        <ImageContainer />
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

const ImageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 50px;

  background-image: url(${ logo });
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;
