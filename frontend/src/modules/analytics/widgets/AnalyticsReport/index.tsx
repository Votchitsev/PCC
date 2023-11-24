import React, { createContext, useState } from 'react';
import styled from 'styled-components';
import { ReportForm, ReportTable } from '../../features/';
import TablePlug from './TablePlug';
import { EReportTypes } from '../../entities';

interface IProps {
  reportType: EReportTypes;
}

export const AnalyticContext = createContext<null | EReportTypes>(null);

const ReportView = ({ reportType }: IProps) => {
  const [table, setTable] = useState(null);

  return (
    <AnalyticContext.Provider value={reportType}>
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
    </AnalyticContext.Provider>
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
