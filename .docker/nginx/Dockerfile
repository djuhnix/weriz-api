FROM nginx:alpine

COPY ./.docker/nginx/nginx.conf /etc/nginx/conf.d/nginx.conf.template
COPY ./.docker/nginx/docker-entrypoint.sh /docker-entrypoint.sh
ARG PROXY_EXT_PORT
ENV PROXY_EXT_PORT $PROXY_EXT_PORT
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE $PROXY_EXT_PORT

CMD ["nginx", "-g", "daemon off;"]

