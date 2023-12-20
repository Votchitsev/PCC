import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ReportView } from '@analytics/widgets';
import { ReportLayout } from '../shared';
import { EReportTypes } from '../entities';
import { useDocumentTitle } from '@main/hooks';

const ReportPage = () => {
  const { title, reportType } = useLoaderData() as {
    title: string;
    reportType: EReportTypes;
  };

  useDocumentTitle(`Аналитика | ${title}`);
  
  return (
      <ReportLayout title={title}>
        <ReportView reportType={reportType} />
      </ReportLayout>
  );
};

export default ReportPage;
