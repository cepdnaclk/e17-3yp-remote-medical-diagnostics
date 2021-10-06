FROM node:14-alpine as build

WORKDIR /code

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install dependancies
RUN npm ci

# Copy source files
COPY . .

# Build the project
RUN npm run build

# Nginx webserver
FROM nginx:1.21-alpine as prod

# Get the build artifacts from previous stage
COPY --from=build /code/build /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx","-g","daemon off;" ]