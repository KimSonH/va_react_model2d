FROM node:20-alpine as development
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --maxsockets=1
COPY . .

FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --maxsockets=1
COPY . .
RUN npm run build

FROM nginx:1.19-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]