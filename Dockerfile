FROM nginx:mainline-alpine

LABEL version=2.0.0 maintainer="myl7 <myl.ustc@gmail.com>"

WORKDIR /www

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist /www
