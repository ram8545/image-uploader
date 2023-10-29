FROM node:18

LABEL maintainer="Ram Sevak Mishra <ramsevakmishra69@gmail.com>"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]