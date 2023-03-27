FROM node:18.9.0

WORKDIR usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4003

CMD ["npm", "start"]
