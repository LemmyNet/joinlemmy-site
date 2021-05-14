#!/bin/bash

git submodule update --remote
git add lemmy-docs
git commit -m"Updating docs"
git add joinlemmy-translations
git commit -m"Updating translations"
git push

# look for unused translations
for langfile in joinlemmy-translations/translations/*.json; do
    lang=$(basename $langfile .json)
    if ! grep -q "\"./translations/$lang\"" src/shared/i18next.ts; then
      echo "Unused language $lang"
    fi
done

new_tag="$1"

git tag $new_tag
git push origin $new_tag
