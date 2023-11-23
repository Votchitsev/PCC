import React from 'react';
import { useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import PageLayout from '@main/layouts/page';
import { ERoutes } from '@lib/routes';
import NavigateLink from '@main/components/navigateLink';
import { ReportForm, ReportView } from '@analytics/widgets';
import { ReportLayout } from '@analytics/layouts';

const ReportPage = () => {
  const { title } = useLoaderData() as { title: string };
  
  return (
      <ReportLayout title={title}>
        <ReportView/>
      </ReportLayout>
  );
};

export default ReportPage;
