import React from 'react';
import style from './index.module.scss';
import FormLayout from '@main/layouts/form';
import NewInspectionForm from '@inspections/components/newInspectionForm';
import { useDocumentTitle } from '@main/hooks';

const NewInspectionPage = () => {
  useDocumentTitle('Новая проверка');

  return (
    <FormLayout title="Новая проверка">
      <NewInspectionForm />
    </FormLayout>
  );
};

export default NewInspectionPage;
