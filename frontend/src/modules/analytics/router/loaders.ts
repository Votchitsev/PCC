export enum EReportTypes {
  MAIN = 'main',
  MAIN_BY_EMPLOYEES = 'mainByEmployees',
}


export const MainReportLoader = async () => {
  return {
    title: 'Отчёт по проверкам',
    reportType: EReportTypes.MAIN,
  };
};
