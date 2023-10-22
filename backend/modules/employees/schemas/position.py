from pydantic import BaseModel


class SPosition(BaseModel):
    name: str


class SQuestionPosition(BaseModel):
    question_id: int
    position_id: int
