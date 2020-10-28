FROM nginx:mainline-alpine

COPY ../nginx/static-api.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
VOLUME /var/www/mlblog-apis
