import { useState } from 'react';
import { IInspection, IInspectionResult } from '@inspections/entity';
import { ApiClient } from '@api/index';
import { EAPIRoutes } from '@lib/routes';
import { useStore } from 'store';

export function useInspectionResult (inspection: IInspection) {
  const [resultState, setResultState] = useState(inspection);
  const [isLoading, setIsLoading] = useState(false);
  const [changed, setChanged] = useState(false);
  const { AuthStore } = useStore();

  const setResult = (result: {id: number, result: boolean | null}) => {
    setChanged(true);
    const oldResult = inspection.result as IInspectionResult[];
    const existsResult = oldResult.find(r => r.id === result.id);

    if (existsResult) {
      existsResult.result = result.result;

      setResultState({
        ...resultState,
        result: oldResult,
      });
    }
  };

  const onSubmit = async () => {
    const requestData = resultState.result.map(r => {
      return {
        'question_id': r.id,
        'inspection_id': resultState.id,
        'result': r.result,
      };
    });
  
    setIsLoading(true);
    const { data } = await ApiClient.put(
      `${EAPIRoutes.INSPECTIONS_RESULT}/${resultState.id}`,
      requestData, {
        headers: {
          Authorization: `Bearer ${AuthStore.authUser?.token}`,
        },
    });

    setResultState(data);

    setIsLoading(false);
  };

  return {
    inspectionResult: resultState,
    setResult,
    onSubmit,
    isLoading,
    changed,
  };
}
