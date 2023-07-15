import AuthStore from '@auth/store';
import { createContext, useContext } from 'react';

const storeBuilder = {
  AuthStore: new AuthStore(),
};

export const storeContext = createContext(storeBuilder);

export const useStore = () => {
  return useContext<typeof storeBuilder>(storeContext);
};
