export interface IInspection {
  id: number;
  department: string;
  department_group: string;
  date: string;
  total_result: number;
  result: IInspectionResult[];
}

export interface IInspectionResult {
  id: number;
  text: string;
  grade: number;
  result: boolean | null;
}

export interface IInspectionExtended extends IInspection {
  result: IInspectionResult[];
}

export interface IInspectionList {
  count: number;
  page: number;
  inspections: IInspection[];
}
