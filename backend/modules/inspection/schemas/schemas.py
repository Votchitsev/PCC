from pydantic import BaseModel
from datetime import date

class SInspectionQuestion(BaseModel):
    question_id: int
    inspection_id: int
    result: bool


class SInspectionQuestionChange(BaseModel):
    question_id: int
    result: bool


class SInspection(BaseModel):
    department_id: int
    date: date
    check_list_id: int
