import Container from '@main/components/container';
import DepartmentGroupItem from '../departmentGroupItem';
import { IDepartmentGroup } from 'modules/departments/entity';
import React from 'react';

interface IProps {
  departmentGroups: IDepartmentGroup[];
}

const DepartmentGroupList = ({ departmentGroups }: IProps) => {
  return (
    <Container>
      { departmentGroups.map((departmentGroup) => (
        <DepartmentGroupItem
          key={ departmentGroup.id }
          departmentGroup={ departmentGroup }
        />
      ))}
    </Container>
  );
};

export default DepartmentGroupList;
