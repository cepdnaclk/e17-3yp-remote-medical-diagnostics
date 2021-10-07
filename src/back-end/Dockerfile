FROM node:14-alpine as build

WORKDIR /code

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm config set unsafe-perm true

# install dependancies
RUN npm ci

# Copy source files
COPY . .

# Build the ts files into js
RUN npm run build

ENV PORT=8080
ENV HOST=0.0.0.0
ENV SALT_WORKER_FACTOR=10

# Starts the express server
CMD [ "npm","run","start" ]

