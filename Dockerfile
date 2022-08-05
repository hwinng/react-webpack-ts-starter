FROM node:14-alpine

WORKDIR /app

COPY package.json ./

RUN npm install 

COPY . ./

ENV NODE_ENV=development

EXPOSE 4000

RUN npm run build

CMD [ "npm", "start" ]