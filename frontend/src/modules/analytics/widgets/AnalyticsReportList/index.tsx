import React from 'react';
import { TbReportAnalytics } from 'react-icons/tb';
import { FaUserFriends } from 'react-icons/fa';
import { FaClipboardQuestion } from 'react-icons/fa6';
import { FaBuildingUser } from 'react-icons/fa6';

import Container from '@main/components/container';
import AnalyticsReportCard from './AnalyticsReportCard';
import { ERoutes } from '@lib/routes';

const AnalyticsReportList = () => {
  return (
    <Container>
      <AnalyticsReportCard
        link={ERoutes.MAIN_REPORT}
        title="Отчёт по проверкам"
        logo={<TbReportAnalytics size={100} />}
        description={
          'Отчёт с результатами по всем проведённым проверкам за период'
        }
      />
      <AnalyticsReportCard
        link={ERoutes.MAIN_REPORT_BY_EMPLOYEES}
        title="Отчёт по сотрудникам"
        logo={<FaUserFriends size={100} />}
        description={
          'Отчёт с результатами сотрудников по каждой проверке'
        }
      />
      <AnalyticsReportCard
        link={ERoutes.REPORT_QUESTIONS}
        title="Отчёт по вопросам"
        logo={<FaClipboardQuestion size={100} />}
        description={
          'Наиболее частые вопросы, которые не выполняются в проверках'
        }
      />
      <AnalyticsReportCard
        link={ERoutes.REPORT_DEPARTMENT_GROUPS}
        title="Рейтинг групп подразделений"
        logo={<FaBuildingUser size={100} />}
        description={
          'Список групп подразделений со средними баллами по проверкам'
        }
      />
    </Container>
  );
};

export default AnalyticsReportList;