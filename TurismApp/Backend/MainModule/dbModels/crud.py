import uuid

from sqlalchemy.ext.asyncio import AsyncSession
from .User import UserModel
from models.user import User
from sqlalchemy.future import select  # Make sure this import is present
from sqlalchemy.dialects.postgresql import UUID


from pydantic import BaseModel


class UserBasicResponse(BaseModel):
    id: uuid.UUID

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


async def get_user_by_id(db: AsyncSession, id: uuid.UUID) -> UserModel | None:
    statement = select(UserModel).where(UserModel.id == id)
    result = await db.execute(statement)
    session_user = result.scalar_one_or_none()
    return session_user


async def add_friend(db: AsyncSession, user_id: str, friend_id: str):
    user_result = await db.execute(select(UserModel).filter_by(id=user_id))
    user = user_result.scalars().first()  # Use scalars().first() instead of scalar_one_or_none()

    friend_result = await db.execute(select(UserModel).filter_by(id=friend_id))
    friend = friend_result.scalars().first()  # Use scalars().first() instead of scalar_one_or_none()

    # Use the await keyword when adding the friend
    await db.run_sync(lambda session: user.friends.append(friend))
    await db.commit()


async def remove_friend(db: AsyncSession, user_id: UUID, friend_id: UUID):
    user_result = await db.execute(select(UserModel).filter_by(id=user_id))
    user = user_result.scalars().first()  # Use scalars().first() instead of scalar_one_or_none()

    friend_result = await db.execute(select(UserModel).filter_by(id=friend_id))
    friend = friend_result.scalars().first()  # Use scalars().first() instead of scalar_one_or_none()

    # Use the await keyword when adding the friend
    await db.run_sync(lambda session: user.friends.remove(friend))
    await db.commit()