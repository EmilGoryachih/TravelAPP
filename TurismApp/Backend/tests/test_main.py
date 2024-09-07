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
    response_json = response.json()

    # Check for the presence of specific keys
    assert "name" in response_json
    assert "point" in response_json
    assert "featuresSet" in response_json

    # Check the data types of the fields
    assert isinstance(response_json["name"], str)
    assert isinstance(response_json["point"], dict)
    assert isinstance(response_json["featuresSet"], list)

    # Check the data of point

    point = response_json["point"]

    assert "lat" in point
    assert "lon" in point

    assert isinstance(point["lat"], float)
    assert isinstance(point["lon"], float)

    for feature in response_json["featuresSet"]:
        assert isinstance(feature, dict)
        assert "type" in feature
        assert "value" in feature
        assert isinstance(feature["type"], str)
        assert isinstance(feature["value"], int)

def test_get_tickets():
    request_data = {
        "from_": "Москва",
        "to": "Казань",
        "time": str(date.today())
    }
    response = client.post("/api/tickets", json=request_data)
    assert response.status_code == 200

    response_json = response.json()
    assert "tickets" in response_json
    assert isinstance(response_json["tickets"], list)
    for ticket in response_json["tickets"]:
        assert "code" in ticket
        assert "transport_type" in ticket
        assert "transport_name" in ticket
        assert "link" in ticket
        assert "date" in ticket
        assert "time" in ticket
        assert "price" in ticket
        assert isinstance(ticket["code"], str)
        assert isinstance(ticket["transport_type"], str)
        assert isinstance(ticket["transport_name"], str)
        assert isinstance(ticket["link"], str)
        assert isinstance(ticket["date"], str)
        assert isinstance(ticket["time"], str)
        assert isinstance(ticket["price"], int)


def test_get_places_for_category():
    request_data = {
        "category": "Музей",
        "city": "Москва",
        "lat": 37.620661,
        "lon": 55.756428
    }
    response = client.post("/api/PlacesForCategory", json=request_data)
    assert response.status_code == 200