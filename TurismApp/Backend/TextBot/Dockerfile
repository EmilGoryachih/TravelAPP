FROM python:3.12

WORKDIR /code

# Copy requirements file and install dependencies
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the application code and session file
COPY ./main.py /code/main.py
COPY ./support.session /code/support.session

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
