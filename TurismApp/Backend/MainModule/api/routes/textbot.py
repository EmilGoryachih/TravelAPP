from pydantic import BaseModel
from fastapi import APIRouter, HTTPException
import requests

router = APIRouter()


class Message(BaseModel):
    text: str
    is_me: bool

    class Config:
        # This ensures SQLAlchemy doesn't try to interpret this class as a database model.
        orm_mode = False


# Get messages from the bot service
@router.get("/", response_model=list[Message])
async def get_messages():
    try:
        url = f"http://bot:80/messages"
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))


# Send a message and retrieve the updated list of messages
@router.post("/", response_model=list[Message])
async def send_message(message: Message):
    try:
        url = f"http://bot:80/messages"
        response = requests.post(url, json=message.dict())
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))
