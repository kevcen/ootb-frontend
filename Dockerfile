FROM patwoz/expo-cli:latest

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package*.json /usr/src/app/
RUN npm install

RUN npm install -g expo-cli

COPY . /usr/src/app

ENV PORT 5000
EXPOSE $PORT
CMD [ "expo", "start" ]
