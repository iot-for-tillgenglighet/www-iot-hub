FROM node:lts-alpine

ENV APP_ROOT /src

WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

COPY package.json /APP_ROOT

RUN yarn build

ENV HOST 0.0.0.0

EXPOSE 3000

CMD ["yarn", "start"]