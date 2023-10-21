import { makeAutoObservable } from 'mobx';
import Check from '@assets/icons/check';
import CheckListIcon from '@assets/icons/checkList';
import HomeIcon from '@assets/icons/home';
import { ERoutes } from '@lib/routes';
import DepartmentIcon from '@assets/icons/department';

interface INavigationRoute {
  name: string;
  icon: () => JSX.Element;
  href: string;
}

class NavigationStore {
  private _navigationRoutes: INavigationRoute[] = navigationRoutes;

  constructor() {
    makeAutoObservable(this);
  }

  get navigationRoutes(): INavigationRoute[] {
    return this._navigationRoutes;
  }
};

export default NavigationStore;

const navigationRoutes = [
  {
    name: 'Главная',
    icon: HomeIcon,
    href: ERoutes.ROOT,
  },
  {
    name: 'Проверки',
    icon: Check,
    href: ERoutes.INSPECTIONS_ROOT,
  },
  {
    name: 'Чек-листы',
    icon: CheckListIcon,
    href: ERoutes.CHECK_LISTS,
  },
  {
    name: 'Подразделения',
    icon: DepartmentIcon,
    href: ERoutes.DEPARTMENT_GROUPS,
  },
];
