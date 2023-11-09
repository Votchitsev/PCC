import React, { useEffect, useState } from 'react';
import { IInspection, IInspectionResult } from '@inspections/entity';
import { ApiClient } from '@api/index';
import { EAPIRoutes, ERoutes } from '@lib/routes';
import { useStore } from 'store';
import DialogModal from '@main/components/dialogModal';
import { useNavigate } from 'react-router-dom';

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

    setChanged(false);
  };

  // useEffect(() => {
  //   console.log(resultState);
  // }, [resultState]);

  return {
    inspectionResult: resultState,
    setResult,
    onSubmit,
    isLoading,
    changed,
  };
}

export function useInspection(inspectionId: number) {
  const { ModalStore } = useStore();
  const navigation = useNavigate();

  const onDelete = () => {
    ModalStore.setModal(
      <DialogModal
        title="Удалить чек-лист?"
        confirmAction={executeDelete}
        store={ModalStore}
        breakAction={() => ModalStore.setModal(null)}
      />,
    );
  };

  const executeDelete = async () => {
    ModalStore.setIsLoading(true);

    await ApiClient.delete(
      `${EAPIRoutes.INSPECTIONS_RESULT}/${inspectionId}`,
    );
    
    ModalStore.setIsLoading(false);
    ModalStore.setModal(null);
    navigation(ERoutes.INSPECTIONS_ROOT);
  };

  return {
    onDelete,
  };
}
