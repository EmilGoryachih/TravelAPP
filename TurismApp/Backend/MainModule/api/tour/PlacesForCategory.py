import requests
from environs import Env
from fastapi import APIRouter
from pydantic import BaseModel
from models.Places import Places


env = Env()
env.read_env()

key = env.str("YANDEX_KEY_FIND_PLACE")

router = APIRouter(prefix="/PlacesForCategory", tags=["PlacesForCategory"])

class PlaceRequest(BaseModel):
    category: str
    city: str
    lat: float
    lon: float

@router.post("/")
def get_places_for_category(request: PlaceRequest):
    url = f"https://search-maps.yandex.ru/v1/?apikey={key}&text={request.city} {request.category}&lang=ru_RU&results=5&ll={request.lat}, {request.lon}"
    response = requests.get(url)

    data = response.json()

    return data
