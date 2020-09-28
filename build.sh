#!/bin/bash

zola build
sudo mkdir -p /var/www/joinlemmy
sudo mv public /var/www/joinlemmy/
sudo systemctl reload nginx
