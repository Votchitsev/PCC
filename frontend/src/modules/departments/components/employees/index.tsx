import React from 'react';
import { IEmployee } from '../../router/loaders';
import styled from 'styled-components';

interface IProps {
  employees: IEmployee[]
}

const Employees = ({ employees }: IProps) => {
  return (
    <Container>
      <h3>Сотрудники</h3>
      { employees.map((employee, index) => (
        <div key={index}>
          <span>{ employee.position ?? '' }</span>
          {' '}
          <span>{ employee.first_name ?? '' }</span>
          {' '}
          <span>{ employee.last_name ?? '' }</span>
        </div>
      ))}
    </Container>
  );
};

export default Employees;

const Container = styled.div`
  margin-bottom: 10rem;
`;