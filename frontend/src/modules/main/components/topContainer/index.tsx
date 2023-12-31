import React from 'react';
import styled from 'styled-components';

interface IProps {
  children: React.ReactNode
}

const TopContainer = ({ children }: IProps) => {
  return (
    <TopContainerWrapper>
      { children }
    </TopContainerWrapper>
  );  
};

export default TopContainer;

const TopContainerWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 2em;
`;
