FROM nginx:alpine

COPY ./.docker/nginx/nginx.conf /etc/nginx/conf.d/nginx.conf.template
COPY ./.docker/nginx/docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

