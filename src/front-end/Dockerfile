FROM node:14-alpine as build

WORKDIR /code

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install dependancies
RUN npm ci

# Copy source files
COPY . .

# Get the passed backend api FQDN
ARG REACT_APP_USE_MOCK_API
# Set the backend url before build
ENV REACT_APP_USE_MOCK_API $REACT_APP_USE_MOCK_API

# Build the project
RUN npm run build

# Nginx webserver
FROM nginx:1.21-alpine as prod

# Get the build artifacts from previous stage
COPY --from=build /code/build /usr/share/nginx/html
# Copy nginx configurations
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD [ "nginx","-g","daemon off;" ]