FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4000
CMD [ "npm","run", "start" ]