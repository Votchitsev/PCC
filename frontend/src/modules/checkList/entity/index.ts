export interface ICheckList {
  id: number;
  name: string;
  questions: IQuestion[]
}

export interface IQuestion {
  id?: number;
  text: string;
  grade: number;
}
