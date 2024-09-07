from fastapi import FastAPI, Depends, HTTPException, APIRouter
from sqlalchemy.ext.asyncio import AsyncSession
from models.user import User
from dbModels.User import UserModel
from dbModels.crud import create_user, get_all_users, add_friend, remove_friend
from db.session import fastapi_get_db
import uuid

from dbModels.crud import UserBasicResponse

router = APIRouter()


@router.post("/", response_model=UserBasicResponse)
async def create_user_endpoint(user: User, db: AsyncSession = Depends(fastapi_get_db)):
    db_user = await create_user(db, user)
    return db_user


@router.get("/all")
async def create_user_endpoint(db: AsyncSession = Depends(fastapi_get_db)):
    users = await get_all_users(db)
    return users


@router.post("/addfriend")
async def add_friend_endpoint(user_id: str, friend_id: str, db: AsyncSession = Depends(fastapi_get_db)):
    await add_friend(db, user_id, friend_id)
    return {"message": "Friend added successfully"}


@router.delete("/removefrind")
async def remove_friend_endpoint(user_id: str, friend_id: str, db: AsyncSession = Depends(fastapi_get_db)):
    await remove_friend(db, user_id, friend_id)
    return {"message": "Friend removed successfully"}
