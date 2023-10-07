import React from 'react';
import Container from '@main/components/container';
import { type IInspection } from '@inspections/entity';
import InspectionItem from '../inspectionItem';

interface IProps {
  readonly inspections: IInspection[]
}

const InspectionList = ({ inspections }: IProps) => {
  return (
    <Container>
      { inspections.map((inspection) => (
        <InspectionItem key={inspection.id} inspection={inspection} />
      ))}
    </Container>
  );
};

export default InspectionList;
