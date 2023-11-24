import { EReportTypes } from '../entities';

export const MainReportLoader = async () => {
  return {
    title: 'Отчёт по проверкам',
    reportType: EReportTypes.MAIN,
  };
};

export const MainReportByEmployeesLoader = () => {
  return {
    title: 'Отчёт по сотрудникам',
    reportType: EReportTypes.MAIN_BY_EMPLOYEES,
  };
};

export const QuestionsReportLoader = () => {
  return {
    title: 'Отчёт по вопросам',
    reportType: EReportTypes.QUESTIONS,
  };
};
