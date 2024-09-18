import uuid

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from .User import UserModel
from models.user import User
from sqlalchemy.future import select  # Make sure this import is present
from sqlalchemy.dialects.postgresql import UUID


from pydantic import BaseModel


class UserBasicResponse(BaseModel):
    id: uuid.UUID
    name: str

    class Config:
        orm_mode = True


class FriendResponse(BaseModel):
    id: uuid.UUID
    name: str

class UserWithFriendsResponse(BaseModel):
    id: uuid.UUID
    name: str
    friends: list[FriendResponse]

    class Config:
        orm_mode = True


async def create_user(db: AsyncSession, user: User):
    db_user = UserModel(
        name=user.name,
        surname=user.surname,
        phone=user.phone,
        birth_date=user.dateOfBirth,
        email=user.email,
        gender=user.gender,
        disabled=user.isDisabled,
        interests=user.selectedInterests,
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)

    return UserBasicResponse(id=db_user.id)


async def get_all_users(db: AsyncSession):
    statement = select(UserModel)
    result = await db.execute(statement)
    users = result.scalars().all()
    return users


async def get_user_by_id(db: AsyncSession, id: uuid.UUID) -> UserBasicResponse | None:
    statement = select(UserModel).where(UserModel.id == id)
    result = await db.execute(statement)
    user = result.scalar_one_or_none()

    if user:
        return UserBasicResponse(id=user.id, name=user.name)

    return None


async def add_friend(db: AsyncSession, user_id: str, friend_id: str):
    user_result = await db.execute(select(UserModel).filter_by(id=user_id))
    user = user_result.scalars().first()  # Use scalars().first() instead of scalar_one_or_none()

    friend_result = await db.execute(select(UserModel).filter_by(id=friend_id))
    friend = friend_result.scalars().first()  # Use scalars().first() instead of scalar_one_or_none()

    # Use the await keyword when adding the friend
    await db.run_sync(lambda session: user.friends.append(friend))
    await db.run_sync(lambda session: friend.friends.append(user))
    await db.commit()


async def remove_friend(db: AsyncSession, user_id: UUID, friend_id: UUID):
    user_result = await db.execute(select(UserModel).filter_by(id=user_id))
    user = user_result.scalars().first()  # Use scalars().first() instead of scalar_one_or_none()

    friend_result = await db.execute(select(UserModel).filter_by(id=friend_id))
    friend = friend_result.scalars().first()  # Use scalars().first() instead of scalar_one_or_none()

    # Use the await keyword when adding the friend
    await db.run_sync(lambda session: user.friends.remove(friend))
    await db.run_sync(lambda session: friend.friends.remove(user))
    await db.commit()


async def get_friends(db: AsyncSession, user_id: UUID):
    result = await db.execute(
        select(UserModel).options(joinedload(UserModel.friends)).where(UserModel.id == user_id)
    )
    user = result.scalars().first()

    if not user:
        return None

    # Преобразуем друзей в FriendResponse
    friends_response = [FriendResponse(id=friend.id, name=friend.name) for friend in user.friends]

    return UserWithFriendsResponse(id=user.id, name=user.name, friends=friends_response)
