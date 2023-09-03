import Card from '@main/components/card/card';
import React from 'react';
import { IDepartment } from 'modules/departments/entity';
import Container from '@main/components/container';
import { Link } from 'react-router-dom';
import { ERoutes } from '@lib/routes';

interface IProps {
  departmentGroup: IDepartment;
}

const DepartmentGroupItem = ({ departmentGroup }: IProps) => {
  return (
    <Link to={`${ERoutes.DEPARTMENT_GROUPS}/${departmentGroup.id}`}>
      <Card
        key={ departmentGroup.id }
      >
        <h3>
          { departmentGroup.name }
        </h3>
      </Card>
    </Link>
  );
};

export default DepartmentGroupItem;
