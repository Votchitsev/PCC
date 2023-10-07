export const ROOT_ROUTE = '/';

export const REG_ROUTE = '/sign-up';
export const AUTH_ROUTE = '/sign-in';

export const ROOT_CHECK_LIST_ROUTE = '/check-list';
export const ADD_CHECKLIST_ROUTE = ROOT_CHECK_LIST_ROUTE + '/add';
export const CHECK_LISTS_ROUTE = ROOT_CHECK_LIST_ROUTE + '/list';

export const ROOT_API_ROUTE = '/';

export const GET_CHECK_LISTS_ROUTE = ROOT_API_ROUTE + '/check-list/list';

export enum ERoutes {
  ROOT = '/',
  AUTH_ROUTE = '/sign-in',
  CHECK_LIST_ROOT = '/check-list',
  ADD_CHECK_LIST = '/check-list/add',
  CHECK_LISTS = '/check-list/all',
  CHECK_LIST_BY_ID = '/check-list/:id',

  DEPARTMENTS_ROOT = '/departments',
  DEPARTMENT_GROUPS = DEPARTMENTS_ROOT + '/department-groups',
  DEPARTMENTS = DEPARTMENT_GROUPS + '/departments',
  DEPARTMENTS_BY_ID = DEPARTMENT_GROUPS + '/departments/:id',

  INSPECTIONS_ROOT = '/inspections',
  INSPECTIONS_NEW = INSPECTIONS_ROOT + '/new',
  INSPECTIONS_NEW_DETAILS = '/new/details',
}

export enum EAPIRoutes {
  SIGN_UP = '/auth/sign-up/',
  SIGN_IN = '/auth/sign-in/',
  LOG_OUT = '/auth/logout/',
  CHECK_LIST = '/check-list',
  CHECK_LISTS = '/check-list/all/',

  DEPARTMENT_GROUPS = '/departments/department_groups/',
  DEPARTMENTS = '/departments/department/',

  INSPECTIONS_CREATE = 'inspection/summary-info/'
}
