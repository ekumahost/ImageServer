# Specifying a base image : OS we are running on
FROM node:alpine

# a place to put our app: create if not exist
WORKDIR /usr/apps

#Copy package.json needed by npm from ./ into ./
COPY ./package.json ./

# Install our node Dependencies
RUN npm install
#Copy root to container ./ into ./
COPY ./ ./

# bind to port 8080
EXPOSE 3000

# Default command to fire the app up
CMD ["npm", "start"]