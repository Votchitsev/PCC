from pydantic import BaseModel


class SQuestion(BaseModel):
    text: str
    grade: int

class SCheckListData(BaseModel):
    title: str
    questions: list[SQuestion]
