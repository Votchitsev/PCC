import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import PageLayout from '@main/layouts/page';
import { ERoutes } from '@lib/routes';
import InspectionList from '@inspections/components/InspectionList';
import { type IInspectionList } from '@inspections/entity';
import PaginationBar from '@main/components/paginationBar';
import styled from 'styled-components';
import { usePagination } from '@lib/hooks/usePagination';
import { useDocumentTitle } from '@main/hooks';
import TopContainer from '@main/components/topContainer';
import NavigateLink from '@main/components/navigateLink';

const AllInspectionsPage = () => {
  const inspectionList = useLoaderData() as IInspectionList;
  const {
    handlePagination,
    start,
    end,
  } = usePagination(
    ERoutes.INSPECTIONS_ROOT,
    inspectionList.count,
    inspectionList.page,
  );

  useDocumentTitle('Проверки');

  const navigate = useNavigate();

  return (
    <PageLayout>
      <TopContainer>
        <NavigateLink
          name="Назад"
          callback={() => navigate(-2)}
        />
        <PaginationBar
          start={start}
          end={end}
          total={inspectionList.count}
          handler={handlePagination}
        />
      </TopContainer>
      <h1>Последние проверки</h1>
      <InspectionList inspections={inspectionList.inspections} />
    </PageLayout>
  );
};

export default AllInspectionsPage;
