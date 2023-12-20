import React from 'react';
import styled from 'styled-components';
import ChevronLeft from '@assets/icons/ChevronLeft';
import ChevronRight from '@assets/icons/ChevronRight';

interface IProps {
  readonly start: number;
  readonly end: number;
  readonly total: number;
  readonly handler: (direction: 'left' | 'right') => void;
}

const PaginationBar = ({ start, end, total, handler }: IProps) => {
  return (
    <Wrapper>
      <InfoContainer>
        <span>{ start } - { end } из { total }</span>
      </InfoContainer>
      <ControlsContainer>
        <Button onClick={() => handler('left')}>
          <ChevronLeft />
        </Button>
        <Button onClick={() => handler('right')}>
          <ChevronRight />
        </Button>
      </ControlsContainer>
    </Wrapper>
  );
};

export default PaginationBar;

const Wrapper = styled.div`
  display: flex;
  height: 30px;
  gap: 1em;
`;

const ControlsContainer = styled.div`
  display: flex;
  width: 100px;
  height: 100%;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 50px;
  }
`;

const InfoContainer = styled.div`
  align-self: center;
  line-height: 1em;

  @media screen and (max-width: 768px) {
    font-size: 0.8em;
  }
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  width: 20px;
  height: 20px;
  padding: 0;
  padding-block: 0;
  padding-inline: 0;
`;
