FROM node:15.6.0-buster-slim

RUN mkdir -p /app/frontend

WORKDIR /app/frontend

RUN npm install -g serve

COPY ./frontend/build .

CMD ["serve"]
