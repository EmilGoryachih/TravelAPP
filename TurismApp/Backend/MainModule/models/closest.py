from __future__ import annotations

from typing import List, Optional, Union, Any

from pydantic import BaseModel, Field


class Geometry(BaseModel):
    type: str
    coordinates: List[float]


class ValueItem(BaseModel):
    id: str
    name: str


class Feature1(BaseModel):
    id: str
    value: Any
    name: str
    type: str


class CompanyMetaData(BaseModel):
    id: str
    name: str
    address: str
    url: Optional[str] = None
    Phones: Optional[List[Any]] = None
    Categories: List[Any]
    Hours: Optional[Any] = None
    Features: Optional[List[Feature1]] = None


class Properties1(BaseModel):
    name: str
    description: str
    boundedBy: Any
    uri: str
    CompanyMetaData: CompanyMetaData


class Feature(BaseModel):
    type: str
    geometry: Geometry
    properties: Properties1


class ClosestResponse(BaseModel):
    type: str
    properties: Any
    features: List[Feature]
