# Lemmy v0.18.3 Release (2023-07-28)

_Written by @dessalines and @nutomic, 2023-07-28_

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Major Changes

This version brings major optimizations to the database queries, which significantly reduces CPU usage. There is also a change to the way federation activities are stored, which reduces database size by around 80%. Special thanks to @phiresky for their work on DB optimizations.

The federation code now includes a check for dead instances which is used when sending activities. This helps to reduce the amount of outgoing POST requests, and also reduce server load.

In terms of security, Lemmy now performs HTML sanitization on all messages which are submitted through the API or received via federation. Together with the tightened content-security-policy from 0.18.2, cross-site scripting attacks are now much more difficult.

Other than that, there are numerous bug fixes and minor enhancements.

## Support development

@dessalines and @nutomic are working full-time on Lemmy to integrate community contributions, fix bugs, optimize performance and much more. This work is funded exclusively through donations.

If you like using Lemmy, and want to make sure that we will always be available to work full time building it, consider [donating to support its development](https://join-lemmy.org/donate). No one likes recurring donations, but they’ve proven to be the only way that open-source software like Lemmy can stay independent and alive.

- [Liberapay](https://liberapay.com/Lemmy) (preferred option)
- [Open Collective](https://opencollective.com/lemmy)
- [Patreon](https://www.patreon.com/dessalines)
- [Cryptocurrency](https://join-lemmy.org/donate) (scroll to bottom of page)

## Upgrade instructions

Follow the upgrade instructions for [ansible](https://github.com/LemmyNet/lemmy-ansible#upgrading) or [docker](https://join-lemmy.org/docs/en/administration/install_docker.html#updating). There are no config or API changes with this release.

This upgrade takes ~5 minutes for the database migrations to complete.

If you need help with the upgrade, you can ask in our [support forum](https://lemmy.ml/c/lemmy_support) or on the [Matrix Chat](https://matrix.to/#/#lemmy-admin-support-topics:discuss.online).

## Changes

### Lemmy

- Restore markdown quotes after sanitize ([#3708](https://github.com/LemmyNet/lemmy/issues/3708)) ([#3749](https://github.com/LemmyNet/lemmy/issues/3749))
- remove performance-problematic and buggy duplicate site aggregates ([#3732](https://github.com/LemmyNet/lemmy/issues/3732))
- remove n^2 part of person triggers, improve community aggregate trigger ([#3739](https://github.com/LemmyNet/lemmy/issues/3739))
- Revert "Add controversial ranking ([#3205](https://github.com/LemmyNet/lemmy/issues/3205))"
- Omit local instance from federated instances list ([#3712](https://github.com/LemmyNet/lemmy/issues/3712))
- add trigram index to search ([#3719](https://github.com/LemmyNet/lemmy/issues/3719))
- Federation tests replication round1 - demonstrate absent replication of comment deletes ([#3657](https://github.com/LemmyNet/lemmy/issues/3657))
- Make resolve_object not require auth [#3685](https://github.com/LemmyNet/lemmy/issues/3685) ([#3716](https://github.com/LemmyNet/lemmy/issues/3716))
- Sanitize html ([#3708](https://github.com/LemmyNet/lemmy/issues/3708))
- Add controversial ranking ([#3205](https://github.com/LemmyNet/lemmy/issues/3205))
- Skip fragile API tests ([#3723](https://github.com/LemmyNet/lemmy/issues/3723))
- Enable gzip for reqwest ([#3696](https://github.com/LemmyNet/lemmy/issues/3696))
- Dont authenticate user after successful password reset [#3714](https://github.com/LemmyNet/lemmy/issues/3714) ([#3715](https://github.com/LemmyNet/lemmy/issues/3715))
- Bump version of dependency "webmention" ([#3711](https://github.com/LemmyNet/lemmy/issues/3711))
- prevent ordering by comment path without post filter ([#3717](https://github.com/LemmyNet/lemmy/issues/3717))
- Update Dockerfile to run process as non-privileged user. ([#3709](https://github.com/LemmyNet/lemmy/issues/3709))
- Dont show removed comments to unauthenticated users (release branch) ([#3689](https://github.com/LemmyNet/lemmy/issues/3689))
- Add dev profile to strip symbols and disable debug info (ref [#3610](https://github.com/LemmyNet/lemmy/issues/3610)) ([#3611](https://github.com/LemmyNet/lemmy/issues/3611))
- Dont publish releases to crates.io (fixes [#3272](https://github.com/LemmyNet/lemmy/issues/3272)) ([#3664](https://github.com/LemmyNet/lemmy/issues/3664))
- Change logic for determining comment default language (fixes [#3451](https://github.com/LemmyNet/lemmy/issues/3451)) ([#3672](https://github.com/LemmyNet/lemmy/issues/3672))
- Post remove delete federation outbound fix0 ([#3613](https://github.com/LemmyNet/lemmy/issues/3613))
- disable rustfmt feature on rosetta-build ([#3679](https://github.com/LemmyNet/lemmy/issues/3679))
- Make sure comments are sorted by hot_rank, then score. ([#3667](https://github.com/LemmyNet/lemmy/issues/3667))
- Ignore errors when fetching community mods (fixes [#3460](https://github.com/LemmyNet/lemmy/issues/3460)) ([#3674](https://github.com/LemmyNet/lemmy/issues/3674))
- Upgrade activitypub library to 0.4.6 (fixes [#3222](https://github.com/LemmyNet/lemmy/issues/3222)) ([#3675](https://github.com/LemmyNet/lemmy/issues/3675))
- Denormalize community_id into post_aggregates for a 1000x speed-up when loading posts ([#3653](https://github.com/LemmyNet/lemmy/issues/3653))
- Fixing hot_ranks and scores to append a published sort. ([#3618](https://github.com/LemmyNet/lemmy/issues/3618))
- Use local_site.default_post_listing_type as the initial default listing type for new users ([#3666](https://github.com/LemmyNet/lemmy/issues/3666))
- Don't panic when scheduled tasks can't connect to database ([#3634](https://github.com/LemmyNet/lemmy/issues/3634))
- Add http cache for webfingers ([#3317](https://github.com/LemmyNet/lemmy/issues/3317))
- Optimize hot rank updates ([#3617](https://github.com/LemmyNet/lemmy/issues/3617))
- Split activity table into sent and received parts (fixes [#3103](https://github.com/LemmyNet/lemmy/issues/3103)) ([#3583](https://github.com/LemmyNet/lemmy/issues/3583))
- work around race condition on community fetch ([#3414](https://github.com/LemmyNet/lemmy/issues/3414))
- Make `lemmy_api_common` wasm-compatible ([#3587](https://github.com/LemmyNet/lemmy/issues/3587))
- Check for dead federated instances (fixes [#2221](https://github.com/LemmyNet/lemmy/issues/2221)) ([#3427](https://github.com/LemmyNet/lemmy/issues/3427))
- Fix wrong SMTP port when TLS is being used (fixes [#3574](https://github.com/LemmyNet/lemmy/issues/3574)) ([#3607](https://github.com/LemmyNet/lemmy/issues/3607))
- Add infinite scroll user option ([#3572](https://github.com/LemmyNet/lemmy/issues/3572))
- Shrink capacity in `RateLimitStorage::remove_older_than` ([#3536](https://github.com/LemmyNet/lemmy/issues/3536))
- Fix [#3501](https://github.com/LemmyNet/lemmy/issues/3501) - Fix aggregation counts for elements removed and deleted ([#3543](https://github.com/LemmyNet/lemmy/issues/3543))

### Lemmy-UI

- Fixing comment report showing dot. ([#1989](https://github.com/LemmyNet/lemmy-ui/issues/1989))
- Make sure comment score color matches your vote. ([#1988](https://github.com/LemmyNet/lemmy-ui/issues/1988))
- Allow limited set of markdown in title rendering ([#1977](https://github.com/LemmyNet/lemmy-ui/issues/1977))
- Allow selecting from all languages in person settings (fixes [#1971](https://github.com/LemmyNet/lemmy-ui/issues/1971)) ([#1985](https://github.com/LemmyNet/lemmy-ui/issues/1985))
- Separate final comment row + add classes ([#1982](https://github.com/LemmyNet/lemmy-ui/issues/1982))
- Fix CSP in dev mode ([#1918](https://github.com/LemmyNet/lemmy-ui/issues/1918))
- Fix base.output (see [#1911](https://github.com/LemmyNet/lemmy-ui/issues/1911)) ([#1943](https://github.com/LemmyNet/lemmy-ui/issues/1943))
- Add show/hide button to password fields ([#1861](https://github.com/LemmyNet/lemmy-ui/issues/1861))
- Fix start_url and scope ([#1931](https://github.com/LemmyNet/lemmy-ui/issues/1931))
- Remove lodash.merge dependency ([#1911](https://github.com/LemmyNet/lemmy-ui/issues/1911))
- Set person_id to myId in handleLeaveModTeam ([#1929](https://github.com/LemmyNet/lemmy-ui/issues/1929))
- Remove invalid default option from language list ([#1919](https://github.com/LemmyNet/lemmy-ui/issues/1919))
- Comment border tweak ([#1820](https://github.com/LemmyNet/lemmy-ui/issues/1820))
- Add Toast Messages for Bad Logins ([#1874](https://github.com/LemmyNet/lemmy-ui/issues/1874))
