#!/usr/bin/env sh
set -eu
export DOLLAR='$'
envsubst < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/nginx.conf
exec "$@"
