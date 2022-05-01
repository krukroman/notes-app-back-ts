FROM node:16.15-alpine

WORKDIR /notes-app-back-ts

COPY ./package.json .

RUN yarn install

COPY . .

EXPOSE 3000

CMD yarn build && yarn start