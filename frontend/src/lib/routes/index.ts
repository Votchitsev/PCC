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
  DEPARTMENT = DEPARTMENTS_BY_ID + '/department',
  DEPARTMENT_BY_ID = DEPARTMENT + '/:department_id',

  INSPECTIONS_ROOT = '/inspections',
  INSPECTIONS_NEW = INSPECTIONS_ROOT + '/new',
  INSPECTIONS_NEW_DETAILS = INSPECTIONS_ROOT + '/new/details/:id',
  INSPECTIONS_DETAIL = INSPECTIONS_ROOT + '/:department_id',

  PROFILE_ROOT = '/profile',
  PROFILE_DETAILS = '/profile/:id',
  PROFILE_ADD = '/profile/:id/add',

  ANALYTICS_ROOT = '/analytics',
  MAIN_REPORT = ANALYTICS_ROOT + '/main',
  MAIN_REPORT_BY_EMPLOYEES = ANALYTICS_ROOT + '/main/employees',
  REPORT_QUESTIONS = ANALYTICS_ROOT + '/questions',
  REPORT_DEPARTMENT_GROUPS = ANALYTICS_ROOT + '/department-groups',
}

export enum EAPIRoutes {
  SIGN_UP = '/auth/sign-up/',
  SIGN_IN = '/auth/sign-in/',
  LOG_OUT = '/auth/logout/',
  CHECK_LIST = '/check-list',
  CHECK_LISTS = '/check-list/all/',

  DEPARTMENT_GROUPS = '/departments/department_groups/',
  DEPARTMENTS = '/departments/department/',

  INSPECTIONS = '/inspection',
  INSPECTIONS_CREATE = 'inspection/summary-info/',
  INSPECTIONS_RESULT = 'inspection/result',
  INSPECTIONS_BY_DEPARTMENT = 'inspection/department/',

  PROFILE = '/employees/profile/',

  ANALYTICS = '/analytics/',
  ANALYTICS_INSPECTIONS = '/analytics/inspections',
  ANALYTICS_QUESTIONS = '/analytics/questions',
  ANALYTICS_DEPARTMENT_GROUPS = '/analytics/department_group',
}
