ARG BUILD_ENV=

# Step 1
FROM repo.rabin.local/general/node:10-alpine as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY . /app
ARG BUILD_ENV=
RUN npm run build$BUILD_ENV
 
# Stage 2
FROM repo.rabin.local/general/nginx:1.20.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /app/build /var/www
RUN apk add nginx-mod-http-headers-more
#RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]