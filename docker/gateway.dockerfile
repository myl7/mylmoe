FROM nginx:mainline-alpine

COPY ../nginx/gateway.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
