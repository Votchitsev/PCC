import React, { type ReactNode, useState } from 'react';
import styled from 'styled-components';
import { type IQuestion } from '@checkList/entity';
import style from './question.module.scss';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  question: IQuestion;
  addQuestionHandler: (questionId: number) => void;
}

const Question = ({
  children,
  addQuestionHandler,
  question,
  ...props
}: IProps) => {
  const [showRelQuestions, setShowRelQuestions] = useState(false);
  const [showRelQuestionText, setShowRelQuestionText] = useState(false);

  const handleClick = () => {
    if (question.id) {
      addQuestionHandler(question.id);
    }
  };

  return (
    <div
      className={style.question}
      onMouseEnter={() => setShowRelQuestions(true)}
      onMouseLeave={() => setShowRelQuestions(false)}
      {...props}
    >
      { children }
      { showRelQuestions &&
      <RelativeQuestion
        onMouseEnter={() => setShowRelQuestionText(true)}
        onMouseLeave={() => setShowRelQuestionText(false)}
        onClick={handleClick}
      >
        { showRelQuestionText ? 'Добавить связанный вопрос' : '+' } 
      </RelativeQuestion>}
      { question.parent_question_id && 
      <MainQuestionMark>
        { 'Есть связанный вопрос' }
      </MainQuestionMark>
      }
    </div>
  );
};

export default Question;

const RelativeQuestion = styled.a`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  left: -15px;
  bottom: -10%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--puce);
  z-index: 1;
  background-color: white;
  cursor: pointer;
  font-size: 0.7rem;
  padding: 0 1em;

  &:hover {
    width: fit-content;
    border-radius: 5px;
  }
`;

const MainQuestionMark = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--grey);
  font-size: 0.7rem;
  padding: 0 1em;
  border-radius: 5px;
  top: -7px;
  left: 1em;
`;
