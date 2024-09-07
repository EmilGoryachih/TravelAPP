from fastapi.testclient import TestClient
from MainModule import app
from datetime import *
from pydantic import BaseModel

class Request(BaseModel):
    lat: float
    lon: float
    type: str

client = TestClient(app)

def test_find_closest():
    request_data = {
        "lat": 37.620661,
        "lon": 55.756428,
        "type": "Музей"
    }
    response = client.post("/api/closest", json=request_data)
    assert response.status_code == 200

def test_get_tickets():
    request_data = {
        "from_": "Москва",
        "to": "Казань",
        "time": str(date.today())
    }
    response = client.post("/api/tickets", json=request_data)
    assert response.status_code == 200

def test_get_places_for_category():
    request_data = {
        "category": "Музей",
        "city": "Москва",
        "lat": 37.620661,
        "lon": 55.756428
    }
    response = client.post("/api/PlacesForCategory", json=request_data)
    assert response.status_code == 200