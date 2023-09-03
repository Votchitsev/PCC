export interface IDepartmentGroup {
  id: number;
  name: string;
  departments: IDepartment[];
}

export interface IDepartment {
  id: number;
  name: string;
  departmentGroup: IDepartmentGroup;
}
