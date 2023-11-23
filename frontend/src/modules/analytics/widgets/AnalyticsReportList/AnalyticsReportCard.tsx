import React, { ReactNode } from 'react';
import Card from '@main/components/card/card';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ERoutes } from '@lib/routes';

interface IProps {
  title: string;
  logo: ReactNode;
  description: string;
  link: ERoutes;
}

const AnalyticsReportCard = ({ title, logo, description, link }: IProps) => {
  return (
    <Link to={link}>
      <Card>
        <CardContainer>
          <h2>{ title }</h2>
            { logo }
          <p>{ description }</p>
        </CardContainer>
      </Card>
    </Link>
  );
};

export default AnalyticsReportCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
