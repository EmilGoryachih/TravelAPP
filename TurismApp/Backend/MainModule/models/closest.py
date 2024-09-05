from __future__ import annotations

from typing import List, Any

from pydantic import BaseModel, Field


class Geometry(BaseModel):
    type: str
    coordinates: List[float]


class Properties1(BaseModel):
    name: str
    description: str
    boundedBy: List[Any]
    uri: str
    CompanyMetaData: Any


class Feature(BaseModel):
    type: str
    geometry: Geometry
    properties: Properties1


class ClosestResponse(BaseModel):
    type: str
    properties: Any
    features: List[Feature]
    
