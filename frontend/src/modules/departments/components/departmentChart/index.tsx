import React, { useEffect, useMemo, useRef } from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { IInspection } from '@inspections/entity';

Chart.register(CategoryScale);

interface IProps {
  inspectionsData: IInspection[];
}

const DepartmentChart = ({ inspectionsData }: IProps) => {
  const chartData = useMemo(() => {
    const labels = inspectionsData.map((inspection) => inspection.date);
    const datasets = [{
        label: 'Результаты проверок',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: inspectionsData.map((inspection) => inspection.total_result),
      }];

    return {
      data: {
        labels,
        datasets,
      },
    };
  }, [inspectionsData]);

  return (
    <ChartWrapper>
      <Line
        data={chartData.data}
      />
    </ChartWrapper>
  );
};

export default DepartmentChart;

const ChartWrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 100%;
`;
