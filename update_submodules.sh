#!/bin/bash

# Note:
# To update lemmy-js-client, first change its branch in your .gitmodules

pushd ../joinlemmy-translations
git fetch weblate
git merge weblate/main
git push
popd

pushd ../lemmy-translations
git fetch weblate
git merge weblate/main
git push
popd

git submodule update --remote
git add joinlemmy-translations
git add lemmy-translations
git add lemmy-docs
git add lemmy-js-client

git commit -m"Updating submodules"
git push
