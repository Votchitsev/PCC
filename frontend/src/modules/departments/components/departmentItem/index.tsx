import { IDepartment } from '@departments/entity';
import { ERoutes } from '@lib/routes';
import Card from '@main/components/card/card';
import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  department: IDepartment;
}

const DepartmentItem = ({ department }: IProps) => {
  const depGroup = useMemo(() => {
    return department.department_group_id;
  }, [department]);

  return (
    <Link
    to={
      `${ERoutes.DEPARTMENTS}/${depGroup}/department/${department.id}`
    }
  >
    <Card>
      <h3>{ department.name }</h3>
    </Card>
  </Link>
  );
};

export default DepartmentItem;
