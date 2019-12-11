FROM node:lts-alpine

ENV APP_ROOT /src
WORKDIR ${APP_ROOT}

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

ENV HOST 0.0.0.0

EXPOSE 3000

CMD ["yarn", "start"]
