import { useState } from 'react';
import { IInspection, IInspectionResult } from '@inspections/entity';
import { ApiClient } from '@api/index';
import { EAPIRoutes } from '@lib/routes';
import { useStore } from 'store';

export function useInspectionResult (inspection: IInspection) {
  const [checkListResult, setCheckListResult] = useState(inspection);
  const [isLoading, setIsLoading] = useState(false);
  const { AuthStore } = useStore();

  const setResult = (result: {id: number, result: boolean | null}) => {
    const oldResult = inspection.result as IInspectionResult[];
    const existsResult = oldResult.find(r => r.id === result.id);

    if (existsResult) {
      existsResult.result = result.result;

      setCheckListResult({
        ...checkListResult,
        result: oldResult,
      });
    }
  };

  const onSubmit = async () => {
    const requestData = checkListResult.result.map(r => {
      return {
        'question_id': r.id,
        'inspection_id': checkListResult.id,
        'result': r.result,
      };
    });
  
    setIsLoading(true);
    const { data } = await ApiClient.put(`${EAPIRoutes.INSPECTIONS_RESULT}/${checkListResult.id}`, requestData, {
      headers: {
        Authorization: `Bearer ${AuthStore.authUser?.token}`,
      },
    });

    setCheckListResult(data);

    setIsLoading(false);
  };

  return {
    checkListResult,
    setResult,
    onSubmit,
    isLoading,
  };
}
