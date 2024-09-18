from fastapi import FastAPI
import requests
from fastapi.responses import StreamingResponse
from fastapi import FastAPI, Depends, HTTPException, APIRouter


router = APIRouter()


@router.get("/")
def speech_to_text(text: str):
    url = f"http://sound:80/speechToText?text={text}"  # Use 'sound' as the hostname
    response = requests.get(url, stream=True)

    # Assuming `response.raw` is being used to stream the audio data from the sound service
    return StreamingResponse(response.raw, media_type="audio/mpeg")
