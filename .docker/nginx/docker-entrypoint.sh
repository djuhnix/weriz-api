#!/usr/bin/env sh
set -eu
export DOLLAR='$'
PROXY_HOST=$(cat /proc/sys/kernel/hostname)
export PROXY_HOST
envsubst < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf
exec "$@"
