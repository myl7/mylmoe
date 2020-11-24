FROM nginx:mainline-alpine

LABEL maintainer="myl7 <myl.ustc@gmail.com>"

WORKDIR /www

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist /www
