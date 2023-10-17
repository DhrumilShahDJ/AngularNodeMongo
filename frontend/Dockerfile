FROM node:18
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @angular/cli

RUN npm install --save --legacy-peer-deps

COPY . .

EXPOSE 4200

CMD ["ng", "serve"]