FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY ./ssl/server.crt /etc/nginx/ssl/cert.crt
COPY ./ssl/server.key /etc/nginx/ssl/cert.key

COPY ./html /etc/nginx/html