import { IDepartment } from '@departments/entity';
import Container from '@main/components/container';
import React from 'react';
import DepartmentItem from '../departmentItem';

interface IProps {
  departments: IDepartment[];
}

const DepartmentList = ({ departments }: IProps) => {
  return (
    <Container>
      { departments.map((department) => (
        <DepartmentItem key={ department.id } department={ department } />
      )) }
    </Container>
  );
};

export default DepartmentList;
