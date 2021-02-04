#!/bin/bash

./build_docs.sh
zola build

sudo mkdir -p /var/www/joinlemmy
sudo rm -rf /var/www/joinlemmy/public
sudo mv public /var/www/joinlemmy/
sudo systemctl reload nginx
