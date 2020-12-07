FROM node:15-alpine

RUN apk add --no-cache yarn

WORKDIR /app
COPY ["package.json", "./"]
RUN yarn
CMD yarn start
