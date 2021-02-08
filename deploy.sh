#!/bin/bash
git submodule update --remote
git add lemmy-docs
git commit -m"Updating docs"
git push
ssh tyler@5.196.14.162 'cd ~/joinlemmy-site && git pull --recurse-submodules && bash -l build.sh'
