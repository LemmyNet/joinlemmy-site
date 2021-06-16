#!/bin/bash

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
pushd ../lemmy-instance-stats
./update.sh
popd

git submodule update --remote
git add joinlemmy-translations
git add lemmy-translations
git add lemmy-instance-stats

git commit -m"Updating submodules"
git push
