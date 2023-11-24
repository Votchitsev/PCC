import { useState } from 'react';
import { EAPIRoutes } from '@lib/routes';
import { ApiClient } from '@api/index';
import { EReportTypes } from '../../entities';

export const useQuery = (reportType: EReportTypes) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const fetchData = async (from: string, to: string) => {
    setIsLoading(true);
    
    try {
      const apiMethod = AnalyticApiController.get(reportType);

      if (apiMethod) {
        const data = await apiMethod(from, to);
        setIsLoading(false);
        return data;
      }

    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLoading,
    fetchData,
  };
};

const getMainReport = async (from: string, to: string) => {
  const { data } = await ApiClient.get(
    `${
      EAPIRoutes.ANALYTICS_INSPECTIONS
    }?type=common&date_from=${from}&date_to=${to}`,
  );

  return data;
};

const getMainReportByEmployees = async (from: string, to: string) => {
  const { data } = await ApiClient.get(
    `${
      EAPIRoutes.ANALYTICS_INSPECTIONS
    }?type=employee&date_from=${from}&date_to=${to}`,
  );

  return data;
};

const getQuestionsReport = async (from: string, to: string) => {
  const { data } = await ApiClient.get(
    `${
      EAPIRoutes.ANALYTICS_QUESTIONS
    }?date_from=${from}&date_to=${to}`,
  );

  return data;
};

const AnalyticApiController = new Map([
  [EReportTypes.MAIN, getMainReport],
  [EReportTypes.MAIN_BY_EMPLOYEES, getMainReportByEmployees],
  [EReportTypes.QUESTIONS, getQuestionsReport],
]);
