from __future__ import annotations

from typing import List

from pydantic import BaseModel


class SearchRequest(BaseModel):
    request: str
    results: int
    skip: int
    boundedBy: List[List[float]]


class Point(BaseModel):
    type: str
    coordinates: List[float]


class SearchResponse(BaseModel):
    found: int
    Point: Point
    boundedBy: List[List[float]]
    display: str


class ResponseMetaData(BaseModel):
    SearchRequest: SearchRequest
    SearchResponse: SearchResponse


class Properties(BaseModel):
    ResponseMetaData: ResponseMetaData


class GeocoderMetaData(BaseModel):
    kind: str
    text: str
    precision: str


class Properties1(BaseModel):
    GeocoderMetaData: GeocoderMetaData
    description: str
    name: str
    boundedBy: List[List[float]]


class Geometry(BaseModel):
    type: str
    coordinates: List[float]


class Feature(BaseModel):
    type: str
    properties: Properties1
    geometry: Geometry


class Places(BaseModel):
    type: str
    properties: Properties
    features: List[Feature]
