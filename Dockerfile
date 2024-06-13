FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

CMD ["npm", "start"]

# FROM nginx:alpine

# RUN rm -rf /usr/share/nginx/html/*

# COPY --from=build /app/build /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]

# EXPOSE 80
