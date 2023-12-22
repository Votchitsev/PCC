import { ApiClient } from '@api/index';
import { IInspection } from '@inspections/entity';
import { EAPIRoutes } from '@lib/routes';
import LocalStorage from '@lib/utils/localStorage';
import { useEffect, useState } from 'react';
import { useStore } from 'store'; 

export function useUserInspections () {
  const { AuthStore } = useStore();
  const { authUser } = AuthStore;

  const [userInspections, setUserInspections] = useState<IInspection[]>([]);

  const fetchUserInspections = async () => {
    if (!authUser) {
      return;
    }

    const { data } = await ApiClient.get(
      EAPIRoutes.INSPECTIONS + `?user_id=${authUser.id}`,
      {
        headers: {
          Authorization: `Bearer ${LocalStorage.get('token')}`,
        },
      },
    );

    setUserInspections(data.inspections);
  };

  useEffect(() => {
    fetchUserInspections();
  }, [authUser?.id]);
  
  return { 
    userInspections,
  };
}
