FROM node:lts-stretch
# declare the argument here (passed on by CI)
ARG ARG_CLIENT_ID
# use the argument to declare an env variable to be used in the code
ENV CLIENT_ID=${ARG_CLIENT_ID}
# Create app directory
WORKDIR /usr/app

COPY . .

RUN npm install && npm run build

EXPOSE 3000

CMD npm run start
