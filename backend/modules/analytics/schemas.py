from datetime import date
from pydantic import BaseModel


class SDateInterval(BaseModel):
    date_from: date
    date_to: date
