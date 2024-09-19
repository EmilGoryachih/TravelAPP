# Build Stage
FROM node:19.6.1-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

# Production Stage
FROM nginx AS final
WORKDIR /
COPY --from=build /app/dist /var/www/html
EXPOSE 80
