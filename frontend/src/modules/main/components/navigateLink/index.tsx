import React, { CSSProperties } from 'react';
import { ERoutes } from '@lib/routes';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  name: string;
  href: ERoutes;
  className?: CSSProperties;
}

const NavigateLink = ({ name, href, className, ...props }: IProps) => {
  return (
    <StyledLink>
      <Link
        to={href}
        className={`${{ className }}`} {...props}
      >
        { name }
    </Link>
    </StyledLink>
  );
};

export default NavigateLink;

const StyledLink = styled.div`
  color: var(--blue);

  &:hover {
    color: var(--blue_hover);
  }
`;
