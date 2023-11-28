import React from 'react';
import styled from 'styled-components';

interface IProps {
  active: boolean;
}

const ContextMenu = ({ active }: IProps) => {
  return (
    <Container $active={active}>
      <ContextMenuItem>
        { 'Контекстное меню' }
      </ContextMenuItem>
    </Container>
  );
};

export default ContextMenu;

const Container = styled.div<{ $active: boolean }>`
  visibility: ${({ $active }) => ($active ? 'visible' : 'hidden')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 200px;
  height: 100px;
  color: var(--light_text);
  background-color: var(--puce);
  z-index: 2;
`;

const ContextMenuItem = styled.div`
  width: 100%;
`;
