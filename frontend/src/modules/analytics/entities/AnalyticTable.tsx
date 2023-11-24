import React from 'react';
import styled from 'styled-components';

interface IProps {
  tableData: {
    head: any[];
    body: any[];
  }
};

const AnalyticTable = ({ tableData }: IProps) => {
  return (
    <Table>
      <Head>
        <TRow>
          {tableData.head.map((head, index) => (
            <th key={index}>{head}</th>
          ))}
        </TRow>
      </Head>
      <Body>
        { tableData.body.map((row, index) => (
          <TRow key={index}>
            {row.map((cell: string|number, index: number) => (
              <td key={index}>{cell}</td>
            ))}
          </TRow>
        ))}
      </Body>
    </Table>
  );
};

export default AnalyticTable;

const Table = styled.table`
  grid: auto;
`;

const Head = styled.thead``;

const TRow = styled.tr``;

const Body = styled.tbody``;