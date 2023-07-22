import LocalStorage from '@lib/utils/localStorage';
import { useEffect } from 'react';
import { useStore } from 'store';

export const useAuth = () => {
  const { AuthStore } = useStore();

  useEffect(() => {
    const token = LocalStorage.get('token');

    if (token) {
      AuthStore.fetchUser(token);
    }
  }, []);
};
