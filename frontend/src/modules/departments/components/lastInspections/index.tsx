import React from 'react';
import styled from 'styled-components';
import { IInspection } from '@inspections/entity';
import Card from '@main/components/card/card';
import { ERoutes } from '@lib/routes';

interface IProps {
  inspections: IInspection[];
}

const LastInspections = ({ inspections }: IProps) => {
  return (
    <div>
      <h3>Последние проверки</h3>
      <Container>
        { inspections.map((inspection) => (
          <a
            key={ inspection.id }
            href={ `${ERoutes.INSPECTIONS_ROOT}/${inspection.id}` }
          >
            <Card>
              <div>{ inspection.date }</div>
              <Result>{ inspection.total_result }</Result>
            </Card>
          </a>
        ))}
      </Container>
    </div>
  ); 
};

export default LastInspections;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
  margin-bottom: 2rem;

  @media screen and (max-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 425px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Result = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
`;
