#!/bin/bash
git submodule update --remote
git add lemmy-docs
git commit -m"Updating docs"
git push
rsync --rsync-path="sudo rsync" -chavzP /var/www/joinlemmy --stats tyler@lemmy.ml:/var/www/
ssh tyler@lemmy.ml 'sudo systemctl reload nginx'
