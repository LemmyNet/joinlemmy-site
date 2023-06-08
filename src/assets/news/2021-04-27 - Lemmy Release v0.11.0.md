# Lemmy Release v0.11.0

_Written by @dessalines and @nutomic, 2021-04-27_

Since our last release this month, we've had [~60](https://github.com/LemmyNet/lemmy/compare/0.10.0...main) commits to Lemmy.

### Lemmy Server

#### Major Changes

- Add option to disable strict allowlist ( [#1486](https://github.com/LemmyNet/lemmy/issues/1486)) [documentation](https://join.lemmy.ml/docs/en/federation/administration.html)
- Add option to limit community creation to admins only ([#1587](https://github.com/LemmyNet/lemmy/issues/1587))
- Many search improvements:
  - Don't search for communities or users when the id is included.
  - Add creator id to search.

#### General

- Adding a user setting to show / hide scores. Fixes [#1503](https://github.com/LemmyNet/lemmy/issues/1503)
- Add option to hide read posts. Fixes [#1561](https://github.com/LemmyNet/lemmy/issues/1561)
- Mark accounts as bot, and hide bot posts/comments
- Adding a short site description, to be used for joinlemmy instance list
- Adding matrix id validation. Fixes [#1520](https://github.com/LemmyNet/lemmy/issues/1520)
- Adding users active monthly for community sort. Fixes [#1527](https://github.com/LemmyNet/lemmy/issues/1527)
- Don't allow zero-space char in display name. Fixes [#1317](https://github.com/LemmyNet/lemmy/issues/1317)
- Adding more rust captcha features. Fixes [#1248](https://github.com/LemmyNet/lemmy/issues/1248)
- Fixing slur filter regex. Fixes [#1593](https://github.com/LemmyNet/lemmy/issues/1593)

#### API

- Added `ChangePassword` as a separate endpoint from `SaveUserSettings`
- No other breaking changes, but many fields that were previously required are now optional.
- A full list of the API changes can be seen on this diff of [lemmy-js-client: 0.10.0 -> 0.11.0](https://github.com/LemmyNet/lemmy-js-client/compare/0.10.0...0.11.0-rc.13) .

#### Federation

- Implement federated bans fixes [#1298](https://github.com/LemmyNet/lemmy/issues/1298)
- Remote mods can update/delete/undelete communities.

### Lemmy UI

- Updating translations.
- Add UI version to UI via docker. Fixes [#263](https://github.com/LemmyNet/lemmy-ui/issues/263)
- Add Korean language
- Add check for unused languages in update_translations.sh
- Validate matrix id on the front end. Fixes [#245](https://github.com/LemmyNet/lemmy-ui/issues/245)
- Communities page sorts by monthly active users. Fixes [#244](https://github.com/LemmyNet/lemmy-ui/issues/244)
- Correctly render HTML in popup notifications
- Fix html notif bug. Fixes [#254](https://github.com/LemmyNet/lemmy-ui/issues/254)
- Fixing issue with debounce. Fixes [#236](https://github.com/LemmyNet/lemmy-ui/issues/236)

## Upgrade notes

### Servers

If you'd like to make a DB backup before upgrading, follow [this guide](https://join.lemmy.ml/docs/en/administration/backup_and_restore.html).

To upgrade your instance to `v0.11.0`, simply follow the instructions in the documentation:

- [Upgrade with manual Docker installation](https://join.lemmy.ml/docs/en/administration/install_docker.html#updating)
- [Upgrade with Ansible installation](https://join.lemmy.ml/docs/en/administration/install_ansible.html)

### Clients / Apps

- A full list of the API changes can be seen on this diff of [lemmy-js-client: 0.10.0 -> 0.11.0](https://github.com/LemmyNet/lemmy-js-client/compare/0.10.0...0.11.0-rc.13) .
