import React from 'react';
import style from './index.module.scss';
import FormLayout from '@main/layouts/form';
import NewInspectionForm from '@inspections/components/newInspectionForm';

const NewInspectionPage = () => {
  return (
    <FormLayout title="Новая проверка">
      <NewInspectionForm />
    </FormLayout>
  );
};

export default NewInspectionPage;
