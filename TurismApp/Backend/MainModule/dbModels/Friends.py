from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy import Table, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column
from .base import BaseModel

user_friends = Table(
    'user_friends', BaseModel.metadata,
    Column('user_id', UUID(as_uuid=True), ForeignKey('users.id'), primary_key=True),
    Column('friend_id', UUID(as_uuid=True), ForeignKey('users.id'), primary_key=True)
)
