import { IDepartment } from '@departments/entity';
import Card from '@main/components/card/card';
import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  department: IDepartment;
}
const DepartmentItem = ({ department }: IProps) => (
  <Link to={'#'}>
    <Card>
      <h3>{ department.name }</h3>
    </Card>
  </Link>
);

export default DepartmentItem;
