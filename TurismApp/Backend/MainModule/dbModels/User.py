from sqlalchemy.orm import relationship
from sqlalchemy.ext.asyncio import AsyncSession

from .Friends import user_friends
from .base import BaseModel

from sqlalchemy import Column, Integer, String, Boolean, DateTime
import datetime
from sqlalchemy import String
from models.user import User


class UserModel(BaseModel):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(length=50), index=True, nullable=False)
    surname = Column(String(length=50), index=True, nullable=True)
    phone = Column(String(length=15), index=True, nullable=True)
    birth_date = Column(DateTime, index=True, nullable=True)
    gender = Column(Boolean, index=True, nullable=True)
    disabled = Column(Boolean, index=True, default=False)

    # Relationship with itself through the junction table
    friends = relationship(
        'User',
        secondary=user_friends,
        primaryjoin=id == user_friends.c.user_id,
        secondaryjoin=id == user_friends.c.friend_id,
        backref='friends'
    )

    def __repr__(self) -> str:
        return (f"User(id={self.id!r}, name={self.name!r}, "
                f"surname={self.surname!r}, phone={self.phone!r}, "
                f"birth_date={self.birth_date!r}, gender={self.gender!r},"
                f"disabled={self.disabled!r})")




async def create_user(db: AsyncSession, user: User):
    db_user = UserModel(
        id=1,
        name=user.name,
        surname=user.surname,
        phone=user.phone,
        birth_date=user.birth_date,
        gender=user.gender,
        disabled=user.disabled,
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user