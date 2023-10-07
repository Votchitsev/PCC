import Button from '@main/components/button';
import Input from '@main/components/input';
import React from 'react';
import { useForm } from './hooks';
import { useLoaderData } from 'react-router-dom';
import { type ICheckList } from '@checkList/entity';
import { type IDepartmentGroup } from '@departments/entity';

const NewInspectionForm = () => {
  const { checkLists, departmentGroups } = useLoaderData() as {
    checkLists: ICheckList[],
    departmentGroups: IDepartmentGroup[]
  };

  const {
    date,
    checkList,
    departmentGroup,
    departmentList,
    department,
    onSubmit,
    isValid,
  } = useForm();

  return (
    <form onSubmit={onSubmit}>
      <Input
        id="date"
        label="Дата"
        value={date.value}
        onChange={date.onChange}
        type="date"
      />
      <Input
        id="checklist"
        label="Чек-лист"
        value={checkList.value}
        type="select"
        selectData={checkLists.map(item => ({
          id: item.id,
          name: item.name,
        }))}
        onChange={checkList.onChange}
      />
      <Input
        id="department-group"
        label="Группа подразделений"
        value={departmentGroup.value}
        type="select"
        selectData={departmentGroups.map(item => ({
          id: item.id,
          name: item.name,
        }))}
        onChange={departmentGroup.onChange}
        isRequired={true}
      />
      <Input
        id="department"
        label="Подразделение"
        value={department.value}
        type="select"
        selectData={departmentList.map(item => ({
          id: item.id,
          name: item.name,
        }))}
        onChange={department.onChange}
        isRequired={true}
      />
      <Button
        text="Далее"
        type="submit"
        isDisable={!isValid}
      />
    </form>
  );
};

export default NewInspectionForm;
