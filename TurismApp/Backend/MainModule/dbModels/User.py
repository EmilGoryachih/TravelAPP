from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class UserModel(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(length=50), index=True, nullable=False)
    surname = Column(String(length=50), index=True, nullable=True)
    phone = Column(String(length=15), index=True, nullable=True)
    birth_date = Column(DateTime, index=True, nullable=True)
    gender = Column(String(length=10), index=True, nullable=True)
    disabled = Column(Boolean, index=True, default=False)

    def __repr__(self) -> str:
        return (f"User(id={self.id!r}, name={self.name!r}, "
                f"surname={self.surname!r}, phone={self.phone!r}, "
                f"birth_date={self.birth_date!r}, gender={self.gender!r},"
                f"disabled={self.disabled!r})")



