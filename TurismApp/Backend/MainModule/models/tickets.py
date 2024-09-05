from __future__ import annotations

from typing import Any, List, Optional

from pydantic import BaseModel, Field


class From(BaseModel):
    type: str
    title: str
    short_title: str
    popular_title: str
    code: str


class To(BaseModel):
    type: str
    title: str
    short_title: str
    popular_title: str
    code: str


class Search(BaseModel):
    from_: From = Field(..., alias='from')
    to: To
    date: str


class Codes(BaseModel):
    sirena: Optional[str]
    iata: Optional[str]
    icao: Optional[str]


class Carrier(BaseModel):
    code: int
    title: str
    codes: Any
    address: Optional[str]
    url: Any
    email: Optional[str]
    contacts: str
    phone: str
    logo: Optional[str]
    logo_svg: Optional[str]


class TransportSubtype(BaseModel):
    title: Any
    code: Any
    color: Any


class Thread(BaseModel):
    number: str
    title: str
    short_title: str
    carrier: Carrier
    vehicle: Optional[str]
    express_type: Any
    transport_type: str
    transport_subtype: Any
    uid: str
    thread_method_link: str


class From1(BaseModel):
    type: str
    title: str
    short_title: Optional[str]
    popular_title: Optional[str]
    code: str
    station_type: str
    station_type_name: str
    transport_type: str


class To1(BaseModel):
    type: str
    title: str
    short_title: Optional[str]
    popular_title: Optional[str]
    code: str
    station_type: str
    station_type_name: str
    transport_type: str


class Price(BaseModel):
    whole: int
    cents: int


class Place(BaseModel):
    name: Any
    price: Price
    currency: str


class TicketsInfo(BaseModel):
    et_marker: bool
    places: List[Place]


class Segment(BaseModel):
    thread: Thread
    from_: From1 = Field(..., alias='from')
    to: To1
    departure_platform: str
    arrival_platform: str
    departure_terminal: Optional[str]
    arrival_terminal: Optional[str]
    stops: str
    duration: float
    start_date: str
    departure: str
    arrival: str
    has_transfers: bool
    tickets_info: TicketsInfo


class ScheduleResponse(BaseModel):
    search: Any
    segments: List[Segment]
    interval_segments: List
    pagination: Any