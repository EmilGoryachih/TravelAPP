from fastapi import APIRouter
import requests
import json
from environs import Env
from pydantic import BaseModel
from models import ClosestResponse
from math import hypot


env = Env()
env.read_env()
key = env.str("YANDEX_KEY_FIND_PLACE")

router = APIRouter()

class Point(BaseModel):
    lat: float
    lon: float 

class Closest(BaseModel):
    name: str
    point: Point

@router.post("/")
async def post_closest(lat: float, lon: float, type: str):
    link = f'https://search-maps.yandex.ru/v1/?apikey={key}&text={type}&lang=ru_RU&ll={lat},{lon}&spn=0.01,0.01&type=biz&rspn=1&results=50'
    response = requests.get(link)

    resp = ClosestResponse.model_validate_json(response.text)

    rlist = list(map(lambda x: x, resp.features))
    
    closest = None

    min_length = float('inf')

    print(len(rlist))

    for place in rlist:
        ll = place.geometry.coordinates
        length = hypot((lon - ll[1])**2, (lat - ll[0])**2)
        if (length < min_length):
            min_length = length
            closest = Closest(name=place.properties.name, point=Point(lat=ll[0], lon=ll[1]))

    return closest