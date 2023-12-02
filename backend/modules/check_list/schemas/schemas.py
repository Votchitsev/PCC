from pydantic import BaseModel
from typing import Optional


class SQuestion(BaseModel):
    id: Optional[int] = None
    text: str
    grade: int
    parent_question_id: Optional[int] = None
    order: int

class SCheckListData(BaseModel):
    title: str
    questions: list[SQuestion]
