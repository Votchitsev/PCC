from typing import Optional
from pydantic import BaseModel


class SProfile(BaseModel):
    first_name: str
    last_name: str
    position_id: Optional[int] = None
    user_id: int
