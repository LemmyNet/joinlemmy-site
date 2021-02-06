#!/bin/bash

# Build the mdbook docs
./build_docs.sh

# Build the API docs
yarn --ignore-engines && yarn build

zola build

sudo mkdir -p /var/www/joinlemmy
sudo rm -rf /var/www/joinlemmy/public
sudo mv public /var/www/joinlemmy/
sudo systemctl reload nginx
