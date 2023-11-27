import { useState } from 'react';
import { EAPIRoutes } from '@lib/routes';
import { ApiClient } from '@api/index';
import { EReportTypes } from '../../entities';

export const useQuery = (reportType: EReportTypes) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [interval, setInterval] = useState<{ from: string; to: string;}>({
    from: '',
    to: '',
  });
  
  const fetchData = async (from: string, to: string) => {
    setIsLoading(true);
    
    try {
      const apiMethod = AnalyticApiController.get(reportType);

      if (apiMethod) {
        const data = await apiMethod(from, to);
        setIsLoading(false);
        setInterval({ from, to });
        return data;
      }

    } catch (error) {
      console.error(error);
    }
  };

  const downloadFile = async (from: string, to: string) => {
    try {
      const apiMethod = AnalyticApiController.get(reportType);

      if (apiMethod) {
        await apiMethod(from, to, true);
      }
  } catch (error) {
      console.error(error);
    }
  };

  return {
    isLoading,
    fetchData,
    downloadFile,
    interval,
  };
};

const getMainReport = async (from: string, to: string, download = false) => {
  if (download) {
    const link = document.createElement('a');
    link.href = `/api${
      EAPIRoutes.ANALYTICS_INSPECTIONS
    }?type=common&date_from=${from}&date_to=${to}&download=${download}`;

    link.click();
    return;
  }

  const { data } = await ApiClient.get(
    `${
      EAPIRoutes.ANALYTICS_INSPECTIONS
    }?type=common&date_from=${from}&date_to=${to}&download=${download}`,
  );

  return data;
};

const getMainReportByEmployees = async (
  from: string,
  to: string,
  download = false,
) => {
  if (download) {
    const link = document.createElement('a');
    link.href = `/api${
      EAPIRoutes.ANALYTICS_INSPECTIONS
    }?type=employee&date_from=${from}&date_to=${to}&download=${download}`;

    link.click();
    return;
  }

  const { data } = await ApiClient.get(
    `${
      EAPIRoutes.ANALYTICS_INSPECTIONS
    }?type=employee&date_from=${from}&date_to=${to}&download=${download}`,
  );

  return data;
};

const getQuestionsReport = async (
  from: string,
  to: string,
  download = false,
) => {
  if (download) {
    const link = document.createElement('a');
    link.href = `/api${
      EAPIRoutes.ANALYTICS_QUESTIONS
    }?date_from=${from}&date_to=${to}&download=${download}`;
    
    link.click();
    return;
  }

  const { data } = await ApiClient.get(
    `${
      EAPIRoutes.ANALYTICS_QUESTIONS
    }?date_from=${from}&date_to=${to}&download=${download}`,
  );

  return data;
};

const getDepartmentGroupReport = async (
  from: string,
  to: string,
  download = false,
) => {
  if (download) {
    const link = document.createElement('a');
    link.href = `/api${
      EAPIRoutes.ANALYTICS_DEPARTMENT_GROUPS
    }?date_from=${from}&date_to=${to}&download=${download}`;

    link.click();
    return;
  }

  const { data } = await ApiClient.get(
    `${
      EAPIRoutes.ANALYTICS_DEPARTMENT_GROUPS
    }?date_from=${from}&date_to=${to}&download=${download}`,
  );

  return data;
};

const AnalyticApiController = new Map([
  [EReportTypes.MAIN, getMainReport],
  [EReportTypes.MAIN_BY_EMPLOYEES, getMainReportByEmployees],
  [EReportTypes.QUESTIONS, getQuestionsReport],
  [EReportTypes.DEPARTMENT_GROUPS, getDepartmentGroupReport],
]);
