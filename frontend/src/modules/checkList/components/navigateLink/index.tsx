import React, { CSSProperties } from 'react';
import { ERoutes } from '@lib/routes';
import { Link } from 'react-router-dom';
import style from './navigateLink.module.scss';

interface IProps {
  name: string;
  href: ERoutes;
  className?: CSSProperties;
}

const NavigateLink = ({ name, href, className, ...props }: IProps) => {
  return (
    <Link
      to={href}
      className={`${style.link} ${{ className }}`} {...props}
    >
      { name }
    </Link>
  );
};

export default NavigateLink;
