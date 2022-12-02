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

exec "$@"
