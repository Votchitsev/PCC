import React, { useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import DepartmentPageLayout from '../layouts/DepartmentPageLayout';
import LastInspections from '@departments/components/lastInspections';
import { IDepartmentData } from '@departments/router/loaders';
import DepartmentChart from '@departments/components/departmentChart';
import Employees from '@departments/components/employees';

const DepartmentPage = () => {
  const department = useLoaderData() as IDepartmentData;
  
  const title = useMemo(() => {
    return `${department.department} ${department.department_group}`;
  }, [department]);

  return (
    <DepartmentPageLayout title={title}>
      <DepartmentChart inspectionsData={department.inspections} />
      <LastInspections inspections={department.inspections} />
      <Employees employees={department.employees} />
    </DepartmentPageLayout>
  );
};

export default DepartmentPage;
