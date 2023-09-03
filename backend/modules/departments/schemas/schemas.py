from pydantic import BaseModel

class SDepartment(BaseModel):
    name: str
    department_group_id: int
