import AuthStore from '@auth/store';
import CheckListStore from 'modules/checkList/store';
import { createContext, useContext } from 'react';

const storeBuilder = {
  AuthStore: new AuthStore(),
  CheckListStore: new CheckListStore,
};

export const storeContext = createContext(storeBuilder);

export const useStore = () => {
  return useContext<typeof storeBuilder>(storeContext);
};
