import React from 'react';
import { ICheckListInformation } from 'modules/checkList/pages/checkListsPage';
import CheckListItem from '../checkListItem/checkListItem';
import Container from '@main/components/container';

interface IProps {
  checkLists: ICheckListInformation[];
}

const CheckLists = ({ checkLists } : IProps) => {
  
  return (
    <Container>
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
    </Container>
  );
};

export default CheckLists;
