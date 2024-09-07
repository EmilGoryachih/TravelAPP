from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.orm import relationship
from .base import BaseModel

# Junction table to manage many-to-many relationship between users
user_friends = Table(
    'user_friends',
    BaseModel.metadata,
    Column('user_id', ForeignKey('users.id'), primary_key=True),
    Column('friend_id', ForeignKey('users.id'), primary_key=True)
)
