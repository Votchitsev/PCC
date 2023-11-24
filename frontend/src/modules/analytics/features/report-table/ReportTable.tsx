import React from 'react';
import styled from 'styled-components';

const ReportTable = ({ table }: { table: any }) => {
  const { head, body } = table;

  return (
    <Table>
      <THead>
        <TRow $cols={head.length}>
          {head.map((head: string, index: number) => (
            <th key={index}>{head}</th>
          ))}
        </TRow>
      </THead>
      <TBody>
        { body.map((row: any[], index: number) => (
          <TRow key={index} $cols={body[0].length}>
            {row.map((cell: string, index: number) => (
              <Td key={index}>{cell}</Td>
            ))}
          </TRow>
        ))}
      </TBody>
    </Table>
  );
};

export default ReportTable;

const Table = styled.table`
  width: 100%;
  margin-bottom: 5rem;
`;

const THead = styled.thead`
  width: 100%;
  
`;

const TRow = styled.tr<{$cols: number}>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, 1fr);
  border-bottom: 1px solid var(--grey);
  align-items: center;
  padding: 0.5rem 0;
  min-height: 2.5rem;
`;

const Td = styled.td`
  justify-self: center;
  font-size: 0.8rem;
`;

const TBody = styled.tbody`
  width: 100%;
`;
