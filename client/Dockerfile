FROM node:18

WORKDIR /react-vite-app

EXPOSE 3000

COPY package.json  ./

RUN npm install 

COPY . .

CMD ["npm", "run", "start"]