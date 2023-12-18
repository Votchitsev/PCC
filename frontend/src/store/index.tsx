import AuthStore from '@auth/store';
import { ModalStore } from '@main/store';
import CheckListStore from '@checkList/store';
import { createContext, useContext } from 'react';
import NavigationStore from '@navigation/store';

export const storeBuilder = {
  AuthStore: new AuthStore(),
  CheckListStore: new CheckListStore(),
  ModalStore: new ModalStore(),
  NavigationStore: new NavigationStore(),
};

export const storeContext = createContext(storeBuilder);

export const useStore = () => {
  return useContext<typeof storeBuilder>(storeContext);
};
