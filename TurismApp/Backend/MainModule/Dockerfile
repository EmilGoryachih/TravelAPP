FROM python:3.12

WORKDIR /code

# Копируем зависимости
COPY ./requirements.txt /code/requirements.txt

# Установка зависимостей
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Копируем основной код приложения
COPY ./main.py /code/app/main.py
# COPY ./support.session /code/app/support.session

# Копируем Makefile
COPY ./Makefile /code/Makefile

# Команда по умолчанию
CMD ["make", "run"]