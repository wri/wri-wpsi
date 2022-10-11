#!/bin/bash
set -e

if [[ $@ == *"rails server"* ]]; then
  echo "removing pid for $@"
  rm -f /app/tmp/pids/server.pid
fi

mkdir -p /node_modules/.yarn-cache
yarn config set cache-folder /node_modules/.yarn-cache

if [[ ! -d /app/node_modules ]]; then
  ln -sf /node_modules /app
fi
if [[ ! -d /app/tmp/cache/rails_cache ]]; then
  ln -sf /rails_cache /app/tmp/cache
fi

exec "$@"
