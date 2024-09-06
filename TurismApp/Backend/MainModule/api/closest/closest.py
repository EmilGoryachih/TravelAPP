from fastapi import APIRouter
import requests
import json
from environs import Env
from pydantic import BaseModel
from models import ClosestResponse
from math import hypot
from typing import List, Any


env = Env()
env.read_env()
key = env.str("YANDEX_KEY_FIND_PLACE")

router = APIRouter(prefix="/closest")

class Point(BaseModel):
    lat: float
    lon: float 

class Feature(BaseModel):
    type: str
    value: int

class Closest(BaseModel):
    name: str
    point: Point
    featuresSet: List[Any]

@router.post("/")
async def post_closest(lat: float, lon: float, type: str, features: List[str] = []):
    link = f'https://search-maps.yandex.ru/v1/?apikey={key}&text={type}&lang=ru_RU&ll={lat},{lon}&spn=0.1,0.1&type=biz&rspn=1&results=50'
    
    response = requests.get(link)

    resp = ClosestResponse.model_validate_json(response.text)

    rlist = list(map(lambda x: x, resp.features))
    
    closest = None

    min_length = float('inf')

    maxFeatureFit = 0

    for place in rlist:
        curFeatureFit = 0
        ll = place.geometry.coordinates
        length = hypot((lon - ll[1])**2, (lat - ll[0])**2)
        try:
            curFeaturesList = list(map(lambda x: x, place.properties.CompanyMetaData.Features))
        except:
            curFeaturesList = []
        curFeaturesSet = []
        for feature in curFeaturesList:
            if feature.type == "bool":
                if (feature.value):
                    curFeaturesSet.append(Feature(type=feature.id, value=1))
            elif feature.type == "enum":
                if (feature.value[0]["name"] == "доступно"):
                    curFeaturesSet.append(Feature(type=feature.id, value=1))
                elif (feature.value[0]["name"] == "частично доступно"):
                    curFeaturesSet.append(Feature(type=feature.id, value=0))
            else:
                curFeaturesSet.append(Feature(type=feature.id, value=0))
        for feature in curFeaturesSet:
            if (feature.type in features):
                curFeatureFit += 1
        if (curFeatureFit >= maxFeatureFit):
            maxFeatureFit = curFeatureFit
            if (length < min_length):
                min_length = length
                closest = Closest(name=place.properties.name, point=Point(lat=ll[0], lon=ll[1]), featuresSet=curFeaturesSet)
                
    return closest