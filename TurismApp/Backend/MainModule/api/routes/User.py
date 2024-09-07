from fastapi import FastAPI, Depends, HTTPException, APIRouter
from sqlalchemy.ext.asyncio import AsyncSession
from models.user import User
from dbModels.User import UserModel
from dbModels.crud import create_user, get_all_users
from db.session import fastapi_get_db

router = APIRouter()

@router.post("/", response_model=User)
async def create_user_endpoint(user: User, db: AsyncSession = Depends(fastapi_get_db)):
    db_user = await create_user(db, user)
    return db_user

@router.get("/all")
async def create_user_endpoint(db: AsyncSession = Depends(fastapi_get_db)):
    users = await get_all_users(db)
    return users