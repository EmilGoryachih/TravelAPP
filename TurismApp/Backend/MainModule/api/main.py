from fastapi import APIRouter

from .routes import closest, gettickets, placesforcategory, User, sound, textbot

api_router = APIRouter()

api_router.include_router(User.router, prefix="/user", tags=["user"])
api_router.include_router(placesforcategory.router, prefix="/placesforcategory", tags=["placesforcategory"])
api_router.include_router(gettickets.router, prefix="/tickets", tags=["tickets"])
api_router.include_router(closest.router, prefix="/closest", tags=["closest"])
api_router.include_router(sound.router, prefix="/speechToText", tags=["speechToText"])
api_router.include_router(textbot.router, prefix="/textbot", tags=["textbot"])


