FROM python:3.8-slim-buster

RUN mkdir -p /app/backend

WORKDIR /app/backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
COPY ./backend/requirements.txt .
RUN pip install -r requirements.txt

COPY ./backend .
RUN chmod u+x ./docker-entrypoint.sh

ENTRYPOINT ["sh", "./docker-entrypoint.sh"]
