from fastapi.testclient import TestClient
from Sound import router

client = TestClient(router)

def test_speech_to_text():
    text = "Hello, world!"
    response = client.get(f"/speechToText?text={text}")
    assert response.status_code == 200
    assert response.headers["content-type"] == "audio/mpeg"