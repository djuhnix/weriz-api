# Common build stage
FROM node:16.14.2-alpine3.15 as common-build-stage

ARG PORT
ENV PORT $PORT

COPY . ./app

WORKDIR /app

RUN yarn

# Development build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

EXPOSE $PORT

CMD ["yarn", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["yarn", "start"]
