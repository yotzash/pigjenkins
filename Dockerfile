FROM node

WORKDIR /home/node/app

COPY server.js .

RUN npm install express

CMD ["node", "server.js"]