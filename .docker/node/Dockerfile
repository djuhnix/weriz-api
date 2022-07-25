# Common build stage : install node packages
FROM node:16.14.2-alpine3.15 as common-build-stage

ARG PORT
ENV PORT $PORT

WORKDIR /app

# copy package.json in workdir to install dependencies
COPY ["package.json", "yarn.lock", "./"]

RUN apk add --no-cache tini && \
    yarn install --production=true && \
    cp -R node_modules prod_node_modules && \
    yarn install --production=false

ENTRYPOINT ["/sbin/tini", "--"]

# Test stage : run linters, setup and tests
FROM common-build-stage AS test
COPY . .
RUN  yarn lint && \
     yarn test

# Development build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

# copy dev node_modules
COPY --from=common-build-stage /app/node_modules ./node_modules
COPY . .

#EXPOSE $PORT

CMD ["yarn", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

# copy production node_modules
COPY --from=common-build-stage /app/prod_node_modules ./node_modules
COPY . .

RUN yarn build && \
    find . ! -name dist ! -name node_modules -maxdepth 1 -mindepth 1 -exec rm -rf {} \\;

CMD ["yarn", "start"]
