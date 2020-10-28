FROM nginx:mainline-alpine

COPY ../dist /var/www/mlblog
COPY ../nginx/static.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
