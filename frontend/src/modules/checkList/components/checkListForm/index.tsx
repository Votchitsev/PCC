import React, { ChangeEvent, MouseEvent, FormEvent, useEffect } from 'react';
import DynamicInput from '@main/components/dynamicInput';
import Question from '../question';
import { observer } from 'mobx-react';
import { useStore } from 'store';
import Button from '@main/components/button';
import LocalStorage from '@lib/utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { ROOT_ROUTE } from '@lib/routes';
import { IQuestion } from 'modules/checkList/store';
import style from './checkListForm.module.scss';
import TrashIcon from '@assets/icons/trash';

const CheckListForm = () => {
  const { CheckListStore } = useStore();
  const navigate = useNavigate();

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    CheckListStore.saveToDb();
    navigate(ROOT_ROUTE);
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

  const addQuestionHandler = () => {
    CheckListStore.updateQuestions([...CheckListStore.questions, { text: 'Новый вопрос', grade: 0 }]);
  };

  const deleteQuestionHandler = (e: MouseEvent) => {
    const questionIndex = e.currentTarget.getAttribute('id');
    const questions = CheckListStore.questions;

    const newQuestions = questions.filter(question => questions.indexOf(question) !== Number(questionIndex));
    CheckListStore.updateQuestions(newQuestions);
  };

  useEffect(() => {
    return () => {
      CheckListStore.updateQuestions([]);
      CheckListStore.setTitle('');
    };
  }, []);

  return (
    <form
      className={style.form}
      onSubmit={onSubmitHandler}
    >
      <DynamicInput
        id={ 'title' }
        type="text"
        onChangeHandler={onChangeHandler}
        initValue={ CheckListStore.title?.length ? CheckListStore.title : 'Новый чек-лист' }
        extraStyle={style.check_list_title}
        clue="Название чек-листа"
      />
      {
        CheckListStore.questions.map((question, index) =>
          <Question key={ index }>
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
        <Button type={'button'} text={'Добавить'} clickHandler={addQuestionHandler} />
        <Button type={'submit'} text={'Сохранить'} />
      </div>
    </form>
  );
};

export default observer(CheckListForm);

