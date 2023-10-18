import React from 'react';
import style from './index.module.scss';
import ResultCheckListItem from '../resultCheckListItem';
import { type IInspection } from '@inspections/entity';
import { useInspection, useInspectionResult } from '@inspections/hooks';
import Button, { EButtonColor } from '@main/components/button';

interface IProps {
  readonly inspection: IInspection;
}

const ResultCheckList = ({ inspection }: IProps) => {
  const {
    setResult,
    inspectionResult,
    isLoading,
    onSubmit,
    changed,
  } = useInspectionResult(inspection);

  const { onDelete } = useInspection(inspection.id); 

  return (
    <>
      <div className={ style.container }>
        <div className={ style.title_container }>
          <span>{ inspection.date }</span>
          <div className={ style.title_department }>
            <span>{ inspection.department }</span>
            <span
              className={ style.department_group }>
                { inspection.department_group }
              </span>
          </div>
        </div>
        { inspectionResult.result.map((result_question) => (
          <ResultCheckListItem
            key={ result_question.id }
            result_question={ result_question }
            setResult={setResult}
          />
        )) }
        <div className={ style.total_result_container }>
          <span>{`Общая оценка: ${inspectionResult.total_result}`}</span>
        </div>
      </div>
      <div className={ style.button_wrapper }>
        <Button
          text="Отправить"
          type="button"
          isLoading={isLoading}
          clickHandler={onSubmit}
          isDisable={!changed}
        />
        <Button
          text="Удалить проверку"
          type="button"
          color={EButtonColor.danger}
          clickHandler={onDelete}
        />
      </div>
    </>
    
  );
};

export default ResultCheckList;
