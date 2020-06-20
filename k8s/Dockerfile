FROM node:lts-stretch
# Create app directory
WORKDIR /usr/app

COPY . .

RUN npm install && npm run build

EXPOSE 3000

CMD npm run start
