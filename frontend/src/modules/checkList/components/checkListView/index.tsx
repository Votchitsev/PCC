import React from 'react';
import styled from 'styled-components';
import { type ICheckList } from '@checkList/entity';

interface IProps {
  readonly checkListData?: ICheckList;
};

const CheckListView = ({ checkListData }: IProps) => {
  return (
    <Container>
      <Title>{ checkListData?.name }</Title>
      <QuestionsContainer>
        { checkListData?.questions.map(question => (
          <Question key={ question.id }>
            <span>{ question.text }</span>
            <span>{ question.grade }</span>
          </Question>
        )) }
      </QuestionsContainer>
    </Container>
  );
};

export default CheckListView;


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 1.5em;
`;

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Question = styled.div`
  display: flex;
  gap: 1em;
  justify-content: space-between;
  border-bottom: 1px solid var(--grey);
  padding-top: 2em;
  padding-bottom: 1em;
`;
