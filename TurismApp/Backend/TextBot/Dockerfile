FROM python:3.12

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./main.py /code/app/main.py
COPY ./support.session /code/app/support.session

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
