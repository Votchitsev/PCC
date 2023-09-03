import Card from '@main/components/card/card';
import React from 'react';
import { IDepartmentGroup } from 'modules/departments/entity';
import { Link } from 'react-router-dom';
import { ERoutes } from '@lib/routes';

interface IProps {
  departmentGroup: IDepartmentGroup;
}

const DepartmentGroupItem = ({ departmentGroup }: IProps) => {
  return (
    <Link to={`${ERoutes.DEPARTMENTS}/${departmentGroup.id}`}>
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
