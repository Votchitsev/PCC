import { useState } from 'react';
import { EAPIRoutes } from '@lib/routes';
import { ApiClient } from '@api/index';
import { EReportTypes } from '@analytics/router';

export const useQuery = (reportType: EReportTypes) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchData = async (from: string, to: string) => {
    setIsLoading(true);

    try {
      const { data } = await ApiClient.get(
        `${
          EAPIRoutes.ANALYTICS_INSPECTIONS
        }?type=${reportType}&date_from=${from}&date_to=${to}`,
      );

      setIsLoading(false);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLoading,
    fetchData,
  };
};
