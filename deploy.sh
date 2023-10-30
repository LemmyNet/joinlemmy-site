#!/bin/bash

# Update all the submodules and translations
./update_submodules.sh

yarn crawl
yarn update-donations
git add "src/shared/instance_stats.ts"
git add "src/shared/donation_stats.ts"
git commit -m "Crawl and donation instance statistics"

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
