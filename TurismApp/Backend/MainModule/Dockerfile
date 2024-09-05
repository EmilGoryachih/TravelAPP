# Use the official Python image from the Docker Hub
FROM python:3.12

# Set the working directory
WORKDIR /code

# Copy dependencies
COPY ./MainModule/requirements.txt /code/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the main application code
COPY ./MainModule/main.py /code/main.py
COPY ./MainModule/makefile /code/makefile

# Set the working directory
WORKDIR /code

# Default command
CMD ["make", "run"]
