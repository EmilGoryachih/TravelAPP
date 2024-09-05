import requests
from environs import Env
from fastapi import APIRouter

from ...models import Places


env = Env()
env.read_env()

key = env.str("YANDEX_KEY_FIND_PLACE")

router = APIRouter(prefix="/PlacesForCategory", tags=["PlacesForCategory"])

@router.get("/")
def get_places_for_category(category: str, city: str, lat: float, lon: float):
    url = f"https://search-maps.yandex.ru/v1/?apikey={key}&text={city} {category}&lang=ru_RU&results=5&ll={lat}, {lon}"
    response = requests.get(url)
    data = response.json()

    return data
