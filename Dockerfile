### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:9-alpine as builder

MAINTAINER Ivan Subotic "ivan.subotic@unibas.ch"

COPY package.json yarn.lock ./

RUN yarn config set no-progress && yarn cache clean

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN yarn && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

## Copy the source
COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --prod --env=prod --build-optimizer


### STAGE 2: Setup ###

FROM nginx:1.13.9-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
