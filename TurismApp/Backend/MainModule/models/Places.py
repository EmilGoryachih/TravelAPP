import requests
from environs import Env
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

env = Env()
env.read_env()

key = env.str("YANDEX_KEY_FIND_PLACE")

router = APIRouter(prefix="/PlacesForCategory", tags=["PlacesForCategory"])


class Coordinates(BaseModel):
    longitude: float
    latitude: float


class HoursInterval(BaseModel):
    from_time: str
    to_time: str


class Availability(BaseModel):
    Everyday: Optional[bool]
    Intervals: List[HoursInterval]


class Hours(BaseModel):
    text: str
    Availabilities: List[Availability]


class FeatureDetails(BaseModel):
    id: str
    name: str


class Places(BaseModel):
    name: str
    address: Optional[str]
    coordinates: Coordinates
    hours: Optional[Hours]
    features: Optional[List[FeatureDetails]]

def parse_response(response: dict) -> List[Places]:
    organizations = []
    for feature in response.get('features', []):
        properties = feature['properties']
        geometry = feature['geometry']['coordinates']

        organization = Places(
            name=properties.get('name'),
            address=properties.get('description'),
            coordinates=Coordinates(
                longitude=geometry[0],
                latitude=geometry[1]
            ),
            hours=properties.get('CompanyMetaData', {}).get('Hours'),
            features=[
                FeatureDetails(id=feature.get('id'), name=feature.get('name'))
                for feature in properties.get('CompanyMetaData', {}).get('Categories', [])
            ]
        )
        organizations.append(organization)
    return organizations


