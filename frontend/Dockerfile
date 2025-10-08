FROM node:slim

WORKDIR /app

ADD . .

RUN npm install

ENTRYPOINT [ "npm" ]

CMD [ "start" ]