#!/usr/bin/env sh
set -eu
rsync -arv /app/node_modules_cache /app/node_modules
exec "$@"
