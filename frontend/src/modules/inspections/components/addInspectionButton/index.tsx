import { ERoutes } from '@lib/routes';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MdAddTask } from 'react-icons/md';

const AddInspectionButton = () => {
  return (
    <Link to={ ERoutes.INSPECTIONS_NEW }>
      <Button>
        <MdAddTask size="2em" color="var(--blue)" />
      </Button>
    </Link>
  );
};

export default AddInspectionButton;

const Button = styled.button`
  width: 3em;
  height: 3em;
  border: none;
  background: none;
  cursor: pointer;
`;
