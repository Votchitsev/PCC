import LocalStorage from '@lib/utils/localStorage';
import { useEffect, useState } from 'react';
import { useStore } from 'store';

export const useAuth = () => {
  const { AuthStore } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async (token: string) => {
        await AuthStore.fetchUser(token);
        setLoading(false);
      };

      const token = LocalStorage.get('token');

      if (token) {
        fetchUser(token);
        return;
      }

      setLoading(false);
  }, []);

  return {
    loading, 
  };
};
