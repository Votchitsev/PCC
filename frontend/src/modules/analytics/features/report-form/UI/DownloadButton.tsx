import React from 'react';
import styled, { css } from 'styled-components';
import { MdOutlineFileDownload } from 'react-icons/md';

interface IProps {
  clickHandler: () => void;
  active?: boolean;
}

export const DownloadButton = ({ clickHandler, active = false }: IProps) => {
  return (
    <Button onClick={clickHandler} $active={active} type="button">
      <MdOutlineFileDownload size={20} />
    </Button>
  );
};

const Button = styled.button<{$active?: boolean}>`
  border: none;
  background-color: none;
  width: 40px;
  height: 40px;

  ${({ $active }) =>
  $active ? css`cursor: pointer;` : css`pointer-events: none;`}
`;
