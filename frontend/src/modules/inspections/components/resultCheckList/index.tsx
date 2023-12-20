import React, { useEffect } from 'react';
import styled from 'styled-components';
import style from './index.module.scss';
import ResultCheckListItem from '../resultCheckListItem';
import { type IInspectionExtended } from '@inspections/entity';
import { useInspection, useInspectionResult } from '@inspections/hooks';
import Button, { EButtonColor } from '@main/components/button';

interface IProps {
  readonly inspection: IInspectionExtended;
}

const ResultCheckList = ({ inspection }: IProps) => {
  const {
    setResult,
    inspectionResult,
    isLoading,
    onSubmit,
    changed,
    disabledQuestions,
  } = useInspectionResult(inspection);

  const { onDelete } = useInspection(inspection.id);

  return (
    <Container>
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
            disabled={disabledQuestions.has(result_question.id)}
          />
        )) }
        <div className={ style.total_result_container }>
          <span>{`Общая оценка: ${inspectionResult.total_result}`}</span>
          <EmployeeResultContainer>
            { inspectionResult.employees_result.map((employee, index) => (
              <span
                key={index}
              >
                { `${employee.position}
                  ${employee.first_name ?? ''}
                  ${employee.last_name ?? ''}:
                  ${employee.result}`
                } 
              </span>
            ))}
          </EmployeeResultContainer>
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
    </Container>
    
  );
};

export default ResultCheckList;

const EmployeeResultContainer = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    span {
      font-size: 0.5em;
    }
  }
`;

const Container = styled.div`
  margin-bottom: 5rem;
`;
