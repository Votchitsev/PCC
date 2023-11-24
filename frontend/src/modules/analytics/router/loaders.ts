export enum EReportTypes {
  MAIN = 'common',
  MAIN_BY_EMPLOYEES = 'employee',
}

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
