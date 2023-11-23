import React, { useState } from 'react';
import styled from 'styled-components';
import ReportForm from '../ReportForm';
import { TablePlug } from '@analytics/components';
import ReportTable from './ReportTable';

const ReportView = () => {
  const [table, setTable] = useState(null);

  return (
    <Container>
      <FormContainer>
        <ReportForm setTable={setTable} />
      </FormContainer>
      { table ? (
        <ReportTable table={table} />
      ) : (
        <TablePlug />
      ) }
    </Container>
  );
};

export default ReportView;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-column-end: span 2;
  position: relative;
`;

const FormContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid var(--grey);
  padding: 1rem;
  border-radius: 5px;
`;
