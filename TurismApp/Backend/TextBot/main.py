from telethon import TelegramClient
from fastapi import FastAPI, APIRouter
from pydantic import BaseModel
from datetime import datetime, timedelta
from environs import Env
import asyncio

env = Env()
env.read_env()


# Remember to use your own values from my.telegram.org!
api_id = env.int("API_ID")
api_hash = env.str("API_HASH")
phone = env.str("PHONE")
client = TelegramClient("support", api_id, api_hash)
prev = (None, datetime.now() - timedelta(seconds=10))

router = APIRouter(prefix="/messages", tags=["messages"])

class Message(BaseModel):
    text: str
    is_me: bool
    

@router.get("/", response_model=list[Message])
async def get_messages():
    global prev
    # Getting information about yourself
    if (datetime.now() - prev[1]).total_seconds() > 5:
        async with client:
            messages = await client.get_messages(phone, limit=50)
        prev = messages, datetime.now()
    
    
    return [Message(text=message.text, is_me=message.out) for message in prev[0]]


@router.post("/", response_model=list[Message])
async def send_message(message: Message):
    async with client:
        await client.send_message(phone, message.text)
        
    global prev
    prev = (None, datetime.now() - timedelta(seconds=10))
    return await get_messages()


app = FastAPI()
# app.on_event("startup")(client.start)
# app.on_event("shutdown")(client.disconnect)
app.include_router(router)

# asyncio.run(get_messages())