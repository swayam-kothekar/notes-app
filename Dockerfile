FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

ENV APP_ENV=development

CMD ["node", "server.js"]
