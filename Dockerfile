FROM node:14
WORKDIR /app
COPY ./ /app
RUN pwd ; ls
RUN npm run build

FROM nginx:latest
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
COPY --from=0 /app/public .