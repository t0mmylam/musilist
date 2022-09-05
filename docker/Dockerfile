FROM node
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node server.js
EXPOSE 4000

RUN cd utils \
 && mkdir logs \
 && touch logs/out.log \
 && chmod 777 logs/out.log

COPY utils/logger.js ./utils/