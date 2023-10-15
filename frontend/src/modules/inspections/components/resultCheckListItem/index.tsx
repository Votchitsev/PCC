import React from 'react';
import style from './index.module.scss';
import { IInspectionResult } from '@inspections/entity';
import CheckBox from '@main/components/checkbox';

interface IProps {
  readonly result_question: IInspectionResult;
  setResult: (result: {id: number, result: boolean | null}) => void;
}

const ResultCheckListItem = ({ result_question, setResult }: IProps) => {
  return (
    <div className={ style.container }>
      <div className={ style.text }>{ result_question.text }</div>
      <CheckBox
        id={ result_question.id }
        result={{ id: result_question.id, result: result_question.result }}
        setResult={ setResult }
      />
    </div>
  );
};

export default ResultCheckListItem;
