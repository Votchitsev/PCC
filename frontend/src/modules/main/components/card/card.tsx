import React, { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';
// import style from './card.module.scss';

interface IProps {
  readonly children: ReactNode;
  readonly extraStyle?: CSSProperties;
}

const Card = ({ children, extraStyle }: IProps) => {
  return (
    <CardWrapper style={extraStyle}>
      { children }
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled.div`
  width: 100%;
  box-shadow: black 1px 0px 16px -7px;
  border-radius: 15px;
  padding-top: 15px;
  padding-bottom: 30px;
  padding-inline: 30px;

  &:hover {
    box-shadow: black 1px 0px 20px -7px;
    transition: all 500ms;
  }
`;