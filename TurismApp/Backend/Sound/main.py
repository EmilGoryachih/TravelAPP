from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from gtts import gTTS


router = FastAPI()

d = {}

@router.get("/speechToText")
def speech_to_text(text: str):
    global d
    language = "ru"
    
    if not text in d:
        myobj = gTTS(text=text, lang=language, slow=False)
        d[text] = myobj
    
    return StreamingResponse(d[text].stream(), media_type="audio/mpeg")
