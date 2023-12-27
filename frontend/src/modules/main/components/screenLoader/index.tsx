import React from 'react';
import styled from 'styled-components';
import Loader from '@assets/icons/loader.gif';

const ScreenLoader = () => (
  <Screen>
    <img src={Loader} alt="loader" />
  </Screen>
);

export default ScreenLoader;

const Screen = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;
