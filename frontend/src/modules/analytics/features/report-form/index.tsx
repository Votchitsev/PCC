import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@main/components/button';
import { useQuery } from './api';
import { AnalyticContext } from '../../widgets/AnalyticsReport';
import { EReportTypes } from '../../entities';
import { DownloadButton } from './UI/DownloadButton';

type Inputs = {
  from: string;
  to: string;
}

interface IProps {
  setTable: (value: any) => void;
}

const ReportForm = ({ setTable }: IProps) => {
  const {
    handleSubmit,
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid } } = useForm<Inputs>();

    const watchedFields = watch(['from', 'to']);

    const reportType = useContext(AnalyticContext);

    const {
      isLoading,
      fetchData,
      downloadFile,
      interval,
    } = useQuery(reportType ?? EReportTypes.MAIN);

    useEffect(() => {
      const subscription = watch((value) => {
        const { from, to } = value;
      
        if (from && to && (from > to)) {
          setError('to', {
            type: 'custom',
            message: 'Неверная дата',
          });
        } else {
          clearErrors();
        }
  
        return () => subscription.unsubscribe();
      });
    }, [watchedFields]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { from, to } = data;
  
    if (from && to) {
      const tableData = await fetchData(from, to);
      setTable(tableData);
    }
  };

  const onDownload = async () => {
    const { from, to } = interval;
    await downloadFile(from, to);
  };
  
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <DateInput {
        ...register('from', { required: true }) 
        }
        type="date"
      />
      <DateInput { ...register('to', { required: true })
        } type="date"
      />
      
      <Button
        isDisable={ !isValid }
        type="submit"
        text="Показать"
        isLoading={isLoading}
      />
      { errors.to && <ErrorMessage>{ errors.to.message }</ErrorMessage> }
      <DownloadButton
        clickHandler={onDownload}
        active={ isValid && interval.from.length > 0 && interval.to.length > 0 }
      />
    </Form>
  );
};

export default ReportForm;

const DateInput = styled.input`
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  outline: none;
  border: 1px solid var(--grey);
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
`;

const ErrorMessage = styled.span`
  color: var(--red);
  font-size: 0.7em;
`;
