#!/bin/bash

git submodule update --remote
git add lemmy-docs
git commit -m"Updating docs"
git push

new_tag="$1"

git tag $new_tag
git push origin $new_tag
