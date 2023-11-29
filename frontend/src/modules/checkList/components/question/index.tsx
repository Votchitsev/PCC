import React, { type ReactNode, useState } from 'react';
import styled, { keyframes } from 'styled-components';
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

  const mouseEnterHandler = () => {
    if (!question.parent_question_id) {
      setShowRelQuestions(true);
    }
  };

  return (
    <div
      className={style.question}
      onMouseEnter={mouseEnterHandler}
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

const appear = keyframes`
  0% {
		transform: scale(0.5);
		transform-origin: 0% 50%;
	}

	100% {
		transform: scale(1);
		transform-origin: 0% 50%;
	}
`;

const hoverAnimation = keyframes`
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.2);
  }
`;

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
  animation: ${appear} 0.3s ease 0s 1 normal forwards;

  &:hover {
    width: fit-content;
    border-radius: 5px;
    animation: ${hoverAnimation} 0.3s ease 0s 1 normal forwards;
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
