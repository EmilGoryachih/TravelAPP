from pydantic import BaseModel
import datetime


class User(BaseModel):
    name: str
    surname: str
    phone: str
    birth_date: datetime.date
    gender: bool
    disabled: bool



