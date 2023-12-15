import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiClient } from '@api/index';
import { type IDepartment } from '@departments/entity';
import { EAPIRoutes, ERoutes } from '@lib/routes';
import LocalStorage from '@lib/utils/localStorage';

function isEmpty(value: string) {
  if (value === '-') {
    return true;
  }

  return false;
}

async function sendFormData (data: any) {
  const normalizedData = {
    department_id: data.department,
    date: data.date.toISOString().split('T')[0],
    check_list_id: data.checkList,
  };

  const response = await ApiClient.post(
    EAPIRoutes.INSPECTIONS_CREATE,
    normalizedData, {
      headers: {
        Authorization: `Bearer ${LocalStorage.get('token')}`,
      },
  });

  return response;
};

export function useForm() {
  const [date, setDate] = useState<Date | string>(new Date());

  const [
    checkList,
    setCheckList,
  ] = useState<{ id: number, name: string} | null>(null);

  const [
    departmentGroup,
    setDepartmentGroup,
  ] = useState<{ id: number, name: string} | null>(null);
  
  const [departmentList, setDepartmentList] = useState<IDepartment[]>([]);
  
  const [
    department,
    setDepartment,
  ] = useState<{ id: number, name: string } | null>(null);
  
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDateChange = (value: Date) => {
    setDate(value);
  };

  const handleChecklistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (isEmpty(value)) {
      setCheckList(null);
      return;
    }

    setCheckList(
      JSON.parse(e.target.value),
    );
  };

  const handleDepartmentGroupChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = e.target.value;

    if (isEmpty(value)) {   
      setDepartmentGroup(null);
      return;
    }

    setDepartmentGroup(
      JSON.parse(e.target.value),
    );
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (isEmpty(value)) {   
      setDepartment(null);
      return;
    }

    setDepartment(
      JSON.parse(value),
    );
  };

  const onSubmit =  async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isValid) {
      setIsLoading(false);
      return;
    }

    const formData = {
      date,
      checkList: checkList?.id,
      department: department?.id,
    };

    await sendFormData(formData);
    setIsLoading(false);

    navigate(ERoutes.INSPECTIONS_ROOT);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      const { data } = await ApiClient.get(
        EAPIRoutes.DEPARTMENT_GROUPS + `${departmentGroup?.id}`,
      );

      setDepartmentList(data.departments);
    };

    if (departmentGroup) {
      fetchDepartments();
    }
  }, [departmentGroup]);

  useEffect(() => {
    if (date && checkList && departmentGroup && department) {
      setIsValid(true);
      return;
    }

    setIsValid(false);
  }, [date, checkList, departmentGroup, department]);

  return {
    date: {
      value: date,
      onChange: handleDateChange,
    },
    checkList: {
      value: checkList,
      onChange: handleChecklistChange,
    },
    departmentGroup: {
      value: departmentGroup,
      onChange: handleDepartmentGroupChange,
    },
    department: {
      value: department,
      onChange: handleDepartmentChange,
    },
    departmentList,
    onSubmit,
    isValid,
    isLoading,
  };
}
