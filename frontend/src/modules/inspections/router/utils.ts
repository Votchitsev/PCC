import { type ICheckList } from '@checkList/entity';

export const buildEmptyResult = (checkList: ICheckList) => {
  return checkList.questions.map(question => {
    return {
      id: question.id,
      text: question.text,
      grade: question.grade,
      result: null,
    };
  });
};
