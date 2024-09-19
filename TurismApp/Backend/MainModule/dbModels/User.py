import uuid

from sqlalchemy.orm import relationship

# from .Friends import user_friends
from .base import BaseModel

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy import cast, Date
from sqlalchemy import String
from sqlalchemy import JSON
from sqlalchemy.sql import expression



from .Friends import user_friends


class UserModel(BaseModel):
    __tablename__ = 'users'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True, nullable=False)
    name = Column(String(length=50), index=True, nullable=False)
    surname = Column(String(length=50), index=True, nullable=True)
    phone = Column(String(length=15), index=True, nullable=True)
    email = Column(String(length=50), index=True, nullable=True)
    birth_date = Column(Date, index=True, nullable=True)
    gender = Column(String(length=10), index=True, nullable=True)
    disabled = Column(Boolean, index=True, default=False)
    interests = Column(JSON, nullable=True)

    # Define the many-to-many relationship
    friends = relationship(
        'UserModel',
        secondary=user_friends,
        primaryjoin=id == user_friends.c.user_id,
        secondaryjoin=id == user_friends.c.friend_id,
        lazy="joined",  # Try setting lazy="joined" or lazy="subquery"
        backref='friends_with'
    )

    def __repr__(self) -> str:
        return f"User(id={self.id!r})"




