import uuid

from sqlalchemy.orm import relationship

# from .Friends import user_friends
from .base import BaseModel

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy import cast, Date
from sqlalchemy import String

from .Friends import user_friends


class UserModel(BaseModel):
    __tablename__ = 'users'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True, nullable=False)
    name = Column(String(length=50), index=True, nullable=False)
    surname = Column(String(length=50), index=True, nullable=True)
    phone = Column(String(length=15), index=True, nullable=True)
    birth_date = Column(Date, index=True, nullable=True)
    gender = Column(Boolean, index=True, nullable=True)
    disabled = Column(Boolean, index=True, default=False)

    # Define the many-to-many relationship
    friends = relationship(
        'UserModel',
        secondary=user_friends,
        primaryjoin=id == user_friends.c.user_id,
        secondaryjoin=id == user_friends.c.friend_id,
        backref='friend_of'
    )

    def __repr__(self) -> str:
        return (f"User(id={self.id!r}, name={self.name!r}, "
                f"surname={self.surname!r}, phone={self.phone!r}, "
                f"birth_date={self.birth_date!r}, gender={self.gender!r},"
                f"disabled={self.disabled!r})")




