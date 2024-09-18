from telethon import TelegramClient
from fastapi import FastAPI, APIRouter
from pydantic import BaseModel
from datetime import datetime, timedelta
from environs import Env
import asyncio

env = Env()
env.read_env()

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
    if (datetime.now() - prev[1]).total_seconds() > 5:
        async with client:
            messages = await client.get_messages(phone, limit=50)
        prev = messages, datetime.now()

    # Filter out messages without text and handle other message types
    return [
        Message(text=message.text or "", is_me=message.out)
        for message in prev[0] if message.text
    ]

@router.post("/", response_model=list[Message])
async def send_message(message: Message):
    async with client:
        await client.send_message(phone, message.text)
    global prev
    prev = (None, datetime.now() - timedelta(seconds=10))
    return await get_messages()

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    # Use client.start() with the phone parameter
    await client.start(phone=phone)

@app.on_event("shutdown")
async def shutdown_event():
    await client.disconnect()

app.include_router(router)
