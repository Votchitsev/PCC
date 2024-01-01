import React, { CSSProperties } from 'react';
import { ERoutes } from '@lib/routes';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  name: string;
  href?: ERoutes;
  className?: CSSProperties;
  callback?: () => void;
}

const NavigateLink = ({
  name,
  href,
  className,
  callback,
  ...props
}: IProps) => {
  if (callback) {
    return (
      <StyledLink
        onClick={callback}
      >
        <div
          role="button"
          className={`${{ className }}`} {...props}
        >
          { name }
        </div>
      </StyledLink>
    );
  }

  return (
    <StyledLink>
      <Link
        to={href ?? ERoutes.ROOT}
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
  cursor: pointer;

  &:hover {
    color: var(--blue_hover);
  }
`;
