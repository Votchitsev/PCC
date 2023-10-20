import React from 'react';
import styled from 'styled-components';

const Container = ({ children }: React.PropsWithChildren) => {
  return (
    <StyledContainer>
      { children }
    </StyledContainer>
  );
};

export default Container;

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 20px;
`;
