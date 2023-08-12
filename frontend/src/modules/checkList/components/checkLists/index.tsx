import React from 'react';
import { ICheckListInformation } from 'modules/checkList/pages/checkListsPage';
import CheckListItem from '../checkListItem/checkListItem';
import style from './checkLists.module.scss';

interface IProps {
  checkLists: ICheckListInformation[];
}

const CheckLists = ({ checkLists } : IProps) => {
  
  return (
    <ul className={style.check_lists}>
      { checkLists.map(
          checkList => (
            <CheckListItem
              key={ checkList.id }
              id={ checkList.id }
              title={ checkList.name }
              strLen={50}
            />
          ),
        )}
    </ul>
  );
};

export default CheckLists;
