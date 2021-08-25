FROM node:14
ARG CUSTOM_API_ENDPOINT
WORKDIR /app
COPY ./ /app
RUN npm run build

FROM nginx:latest
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
COPY --from=0 /app/public .