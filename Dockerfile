FROM node:latest

WORKDIR /notes-app-back-ts

COPY ./package.json .

RUN yarn install

COPY . .

EXPOSE 3000

CMD yarn build && yarn start