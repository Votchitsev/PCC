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
        <StyledNavLink onClick={() => navigate(-2)}>
          Назад
        </StyledNavLink>
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

const style = {
  style: {
    marginTop: '20px',
    marginLeft: '20px',
  },
};

export default AllInspectionsPage;

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 20px;
`;

const StyledNavLink = styled.div`
  width: fit-content;
  margin-top: 20px;
  margin-left: 20px;
  cursor: pointer;
  color: var(--blue);

  &:hover {
    color: var(--blue_hover);
  }
`;
