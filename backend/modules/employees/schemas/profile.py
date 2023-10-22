from pydantic import BaseModel


class SProfile(BaseModel):
    first_name: str
    last_name: str
    position_id: int
