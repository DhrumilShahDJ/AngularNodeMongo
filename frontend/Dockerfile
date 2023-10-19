FROM node:16-alpine AS build
WORKDIR /app
RUN npm install -g @angular/cli@13
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
# RUN npm run build
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]