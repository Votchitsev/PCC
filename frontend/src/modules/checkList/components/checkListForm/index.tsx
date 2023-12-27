import React, {
  ChangeEvent,
  MouseEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import DynamicInput from '@main/components/dynamicInput';
import Question from '../question';
import { observer } from 'mobx-react';
import { useStore } from 'store';
import Button, { EButtonColor } from '@main/components/button';
import { useNavigate } from 'react-router-dom';
import { EAPIRoutes } from '@lib/routes';
import style from './checkListForm.module.scss';
import TrashIcon from '@assets/icons/trash';
import { ICheckList, IQuestion } from 'modules/checkList/entity';
import DialogModal from '@main/components/dialogModal';

interface IProps {
  readonly checkListData?: ICheckList;
}

const CheckListForm = ({ checkListData }: IProps) => {
  const { CheckListStore, ModalStore } = useStore();
  const navigate = useNavigate();
  const { getOrderIndex } = useOrder();

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const response = await CheckListStore.saveToDb(checkListData?.id);
    CheckListStore.updateQuestions(response?.data ?? []);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    CheckListStore.setTitle(e.target.value);    
  };

  const questionChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const index = e.target.getAttribute('id');
    const type = e.target.getAttribute('type');
    const newQuestions: IQuestion[] = [...CheckListStore.questions];

    if (index) {
      if (type === 'text') {
        newQuestions[index].text = e.target.value;
      }

      if (type === 'number') {
        newQuestions[index].grade = e.target.value;
      }
      
      CheckListStore.updateQuestions(newQuestions);
    }
  };

  const addQuestionHandler = (parentQuestionId: number|null = null) => {
    CheckListStore.updateQuestions(
      [
        ...CheckListStore.questions,
        {
          text: 'Новый вопрос',
          grade: 0,
          parent_question_id: parentQuestionId,
          order: getOrderIndex(),
        },
      ],
    );
  };

  const deleteQuestionHandler = (e: MouseEvent) => {
    const questionIndex = e.currentTarget.getAttribute('id');
    const questions = CheckListStore.questions;

    const newQuestions = questions.filter(
      question => questions.indexOf(question) !== Number(questionIndex),
    );

    CheckListStore.updateQuestions(newQuestions);
  };

  const onConfirmHandler = async () => {
    await CheckListStore.deleteFromDb(checkListData?.id as number);
    ModalStore.setModal(null);
    navigate(EAPIRoutes.CHECK_LISTS);
  };

  const deleteCheckListHandler = () => {
    ModalStore.setModal(
      <DialogModal
        title="Удалить чек-лист?"
        confirmAction={onConfirmHandler}
        store={CheckListStore}
        breakAction={() => ModalStore.setModal(null)}
      />,
    );
  };

  useEffect(() => {
    return () => {
      CheckListStore.updateQuestions([]);
      CheckListStore.setTitle('Новый чек-лист');
    };
  }, []);

  useEffect(() => {
    if (checkListData) {
      CheckListStore.setTitle(checkListData.name);
      CheckListStore.updateQuestions(checkListData.questions);
    }
  }, [checkListData]);

  const {
    dragStartHandler,
    dragEndHandler,
    dragOverHandler,
    dropHandler,
  } = useDragNDrop();

  return (
    <form
      className={style.form}
      onSubmit={onSubmitHandler}
    >
      <div className={style.title_container}>
        <DynamicInput
          id={ 'title' }
          type="text"
          onChangeHandler={onChangeHandler}
          initValue={ CheckListStore.title }
          extraStyle={style.check_list_title}
          isRequired={true}
          clue="Название чек-листа"
        />
        { checkListData 
          ? <Button
              text="Удалить"
              type="button"
              clickHandler={deleteCheckListHandler}
              color={EButtonColor.danger}
            /> : null }
        
      </div>
      {
        CheckListStore.questions.map((question, index) =>
          <Question
            key={ index }
            addQuestionHandler={addQuestionHandler}
            question={question}
            draggable={true}
            onDragStart={
              (e: React.DragEvent<HTMLDivElement>) =>
                dragStartHandler(e, question)
              }
            onDragLeave={dragEndHandler}
            onDragEnd={dragEndHandler}
            onDragOver={dragOverHandler}
            onDrop={
              (e: React.DragEvent<HTMLDivElement>) =>
                dropHandler(e, question)
              }
          >
            <DynamicInput
              id={ `${index}` }
              type="text"
              onChangeHandler={ questionChangeHandler }
              clue="Вопрос"
              initValue={ question.text }
            />
            <DynamicInput
              id={ `${index}` }
              type="number"
              onChangeHandler={ questionChangeHandler }
              initValue={ question.grade }
              min={0}
              max={5}
              extraStyle={style.grade}
              clue="Оценка"
            />
            <button
              id={`${index}`}
              className={style.close}
              onClick={deleteQuestionHandler}
            >
              <TrashIcon />
            </button>
          </Question>)
      }
      <div className={style.buttons_bar}>
        <Button
          type={'button'}
          text={'Добавить'}
          clickHandler={() => addQuestionHandler(null)}
        />
        <Button
          type={'submit'}
          text={'Сохранить'}
          isLoading={CheckListStore.isLoading.create}
          color={EButtonColor.danger}
        />
      </div>
    </form>
  );
};

export default observer(CheckListForm);

function useDragNDrop() {
  const [
    currentQuestion,
    setCurrentQuestion,
  ] = useState<null | IQuestion>(null);

  const { CheckListStore } = useStore();

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    question: IQuestion,
  ) => {
    setCurrentQuestion(question);
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).style.background = 'none';
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.currentTarget as HTMLDivElement).style.background = 'var(--grey)';
  };

  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    question: IQuestion,
  ) => {
    e.preventDefault();
    if (currentQuestion) {
      CheckListStore.changeOrder(currentQuestion, question);
      setCurrentQuestion(null);
      (e.currentTarget as HTMLDivElement).style.background = 'none';
    }
  };

  return {
    dragStartHandler,
    dragEndHandler,
    dragOverHandler,
    dropHandler,
  };
};

function useOrder() {
  const { CheckListStore } = useStore();
  const { questions } = CheckListStore;

  const getOrderIndex = () => {
    const lastIndex = questions.length - 1;
    return lastIndex === -1 ? 0 : questions[lastIndex].order + 1;
  };

  return {
    getOrderIndex,
  };
}
