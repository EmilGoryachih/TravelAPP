from fastapi import FastAPI, APIRouter
import logging
from environs import Env

import uvicorn

from init_db import init_db

from api.main import api_router



env = Env()
env.read_env()
logging.basicConfig(level=logging.INFO)

# DB_URI = env.str("DB_URI")

main_router = APIRouter()
main_router.include_router(api_router)


app = FastAPI()
app.include_router(main_router, prefix="/api")

@app.on_event("startup")
async def on_startup():
    await init_db()
# app.add_event_handler("startup", lambda: connect_to_mongo(DB_URI))

#if __name__ == "__main__":
#   uvicorn.run(app, host="127.0.0.1", port=8000)
