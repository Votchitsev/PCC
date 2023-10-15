import React, { useEffect, useRef, useState } from 'react';
import style from './index.module.scss';
import ResultCheckListItem from '../resultCheckListItem';
import { IInspectionResult, type IInspection } from '@inspections/entity';
import { useInspectionResult } from '@inspections/hooks';
import Button from '@main/components/button';

interface IProps {
  readonly inspection: IInspection;
}
const ResultCheckList = ({ inspection }: IProps) => {
  const { setResult, checkListResult, isLoading, onSubmit } = useInspectionResult(inspection);

  return (
    <>
      <div className={ style.container }>
        <div className={ style.title_container }>
          <span>{ inspection.date }</span>
          <div className={ style.title_department }>
            <span>{ inspection.department }</span>
            <span className={ style.department_group }>{ inspection.department_group }</span>
          </div>
        </div>
        { checkListResult.result.map((result_question) => (
          <ResultCheckListItem
            key={ result_question.id }
            result_question={ result_question }
            setResult={setResult}
          />
        )) }
      </div>
      <div className={ style.button_wrapper }>
        <Button
          text="Отправить"
          type="button"
          isLoading={isLoading}
          clickHandler={onSubmit}
        />
      </div>
    </>
    
  );
};

export default ResultCheckList;
