#!/bin/bash
pushd ../joinlemmy-translations
git fetch weblate
git merge weblate/main
git push
popd
git submodule update --remote
git add joinlemmy-translations
git commit -m"Updating joinlemmy-translations."
git push
