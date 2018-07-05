# On the shoulder of giant
FROM node:8.9.0-alpine

MAINTAINER Heartsuit

RUN mkdir -p /home/app

# Create app directory
WORKDIR /home/app

# Install app dependencies
#COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

COPY /node_modules /home/app/node_modules
COPY /lib /home/app/lib
COPY /index.js /home/app/index.js
COPY /package.json /home/app/package.json

#RUN npm install --only=production
# If you are building your code for production
# RUN npm install --registry=https://registry.npm.taobao.org

# Bundle app source
# COPY . .

# Bind port and start
EXPOSE 9016
CMD [ "npm", "start" ]