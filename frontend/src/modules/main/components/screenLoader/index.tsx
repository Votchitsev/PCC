import React from 'react';
import styled from 'styled-components';
import ButtonLoader from '@assets/icons/ButtonLoader.svg';



const ScreenLoader = () => (
  <Screen>
    LOADING ...
  </Screen>
);

export default ScreenLoader;

const Screen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;
