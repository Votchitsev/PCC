export interface IInspection {
  id: number;
  department: string;
  department_group: string;
  date: string;
  total_result: number;
  result: IInspectionResult[];
  employees_result: IEmployeeResult[];
}

export interface IInspectionResult {
  id: number;
  text: string;
  grade: number;
  result: boolean | null;
  parent_question_id: number | null;
}

interface IEmployeeResult {
  first_name: string;
  last_name: string;
  position: string;
  result: number;
}

export interface IInspectionExtended extends IInspection {
  result: IInspectionResult[];
  employees_result: IEmployeeResult[];
}

export interface IInspectionList {
  count: number;
  page: number;
  inspections: IInspection[];
}
