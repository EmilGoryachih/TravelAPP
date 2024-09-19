from pydantic import BaseModel
import datetime
from typing import List


class User(BaseModel):
    name: str
    surname: str
    email: str
    phone: str
    dateOfBirth: datetime.date
    password: str
    gender: str
    isDisabled: bool
    selectedInterests: List[str]
