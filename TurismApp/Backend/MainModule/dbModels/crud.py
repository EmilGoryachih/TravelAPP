
from sqlalchemy.ext.asyncio import AsyncSession
from .User import UserModel
from models.user import User
from sqlalchemy.future import select  # Make sure this import is present


async def create_user(db: AsyncSession, user: User):
    db_user = UserModel(
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


async def get_all_users(db: AsyncSession):
    statement = select(UserModel)
    result = await db.execute(statement)
    users = result.scalars().all()
    return users


async def get_user_by_id(db: AsyncSession, email: str) -> UserModel | None:
    statement = select(UserModel).where(UserModel.id == id)
    result = await db.execute(statement)
    session_user = result.scalar_one_or_none()
    return session_user
