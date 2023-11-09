from pydantic import BaseModel


class SResponsibility(BaseModel):
   position_id: int
   questions: list[int]
