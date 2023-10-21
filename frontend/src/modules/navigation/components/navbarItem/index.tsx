import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  name: string;
  icon: () => JSX.Element;
  href: string;
}

const NavbarItem: FC<IProps> = ({ name, icon, href }) => {
  return (
    <Link
      to={href}
      className={({ isActive }) => (isActive ? 'active' : '')}
    >
      <Item>
        <IconWrapper>
          { icon() }
        </IconWrapper>
        <p>{ name }</p>
      </Item>
    </Link>
  );
};

export default NavbarItem;

const Item = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5em;
  padding: 0 1em;
  cursor: pointer;
  border-radius: 50%;
`;

const IconWrapper = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
`;

const Link = styled(NavLink)`
  border-radius: 15px;
  overflow: hidden;

  &.active {
    background-color: var(--grey);
  }
`;
