import AuthStore from '@auth/store';
import { ModalStore } from '@main/store';
import CheckListStore from '@checkList/store';
import { createContext, useContext } from 'react';

const storeBuilder = {
  AuthStore: new AuthStore(),
  CheckListStore: new CheckListStore(),
  ModalStore: new ModalStore(),
};

export const storeContext = createContext(storeBuilder);

export const useStore = () => {
  return useContext<typeof storeBuilder>(storeContext);
};
