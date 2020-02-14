FROM node:12

USER root

WORKDIR /

COPY package.json .
COPY package-lock.json .

RUN npm i --production

COPY . .

CMD ["npm run go"]