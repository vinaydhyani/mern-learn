#!/usr/bin/env bash
set -euo pipefail

REPO_PATH=${1:-}
if [ -z "$REPO_PATH" ]; then
  echo "Usage: $0 /path/to/your/clone"
  exit 1
fi

echo "Deploying repo at: $REPO_PATH"
cd "$REPO_PATH"

echo "Fetching latest changes..."
git fetch origin
git checkout main
git pull origin main

echo "Installing server dependencies..."
npm --prefix server ci

echo "Building client..."
npm --prefix client/mern-learn-client ci
npm --prefix client/mern-learn-client run build

DIST_DIR="$REPO_PATH/client/mern-learn-client/dist"
if [ ! -d "$DIST_DIR" ]; then
  # fallback to build output `build` if present
  DIST_DIR="$REPO_PATH/client/mern-learn-client/build"
fi

if [ ! -d "$DIST_DIR" ]; then
  echo "Build output not found in expected locations: dist/ or build/"
  exit 1
fi

echo "Copying client build to /var/www/mern-client..."
sudo mkdir -p /var/www/mern-client
sudo rm -rf /var/www/mern-client/*
sudo cp -r "$DIST_DIR"/* /var/www/mern-client/
sudo chown -R www-data:www-data /var/www/mern-client

echo "Restarting/starting backend with PM2..."
cd "$REPO_PATH/server"
if pm2 describe mern-backend > /dev/null 2>&1; then
  pm2 restart mern-backend
else
  pm2 start index.js --name mern-backend --cwd "$REPO_PATH/server"
fi

pm2 save

echo "Deployment finished."
