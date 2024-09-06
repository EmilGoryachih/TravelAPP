import requests
from environs import Env
from fastapi import APIRouter

from models.Places import Places


env = Env()
env.read_env()

key = env.str("YANDEX_KEY_FIND_PLACE")

router = APIRouter(prefix="/PlacesForCategory", tags=["PlacesForCategory"])

def transform_api_response(api_response):
    result = []

    for feature in api_response.get('features', []):
        properties = feature.get('properties', {})
        company_meta_data = properties.get('CompanyMetaData', {})
        hours = company_meta_data.get('Hours', {})
        features = properties.get('CompanyMetaData', {}).get('Features', [])

        features_list = [
            {
                "id": feature_item.get('id'),
                "name": feature_item.get('name')
            }
            for feature_item in features
        ]

        transformed_item = {
            "name": company_meta_data.get('name'),
            "address": properties.get('description'),
            "coordinates": feature.get('geometry', {}).get('coordinates'),
            "hours": hours.get('text'),
            "features": features_list
        }

        result.append(transformed_item)

    return result

@router.get("/")
def get_places_for_category(category: str, city: str, lat: float, lon: float):
    url = f"https://search-maps.yandex.ru/v1/?apikey={key}&text={city} {category}&lang=ru_RU&results=5&ll={lat}, {lon}"
    response = requests.get(url)

    return transform_api_response(response.json())
