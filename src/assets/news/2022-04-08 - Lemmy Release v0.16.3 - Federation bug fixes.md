# Lemmy v0.16.3 Release: Federation Bug Fixes (2022-04-08)

_Written by @dessalines and @nutomic, 2022-04-08_

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Major Changes

A full list of fixes is below, but this patch release includes federation compatibility and bug fixes, as well as fixing vulnerabilities in our websocket rate limiting.

## Upgrade notes

Besides the addition of a [search rate limit to the lemmy.hjson](https://github.com/LemmyNet/lemmy/blob/main/config/defaults.hjson#L39), there are no config or API changes.

Follow the [Docker or Ansible upgrade instructions here.](https://join-lemmy.org/docs/en/administration/administration.html)

## Support development

We (@dessalines and @nutomic) have been working full-time on Lemmy for almost two years. This is largely thanks to support from [NLnet foundation](https://nlnet.nl/). If you would like to support our efforts, please consider [donating](https://join-lemmy.org/donate).

If you'd like to support development, and make sure that we will always be available to work full time on Lemmy, consider [donating to support its development](https://join-lemmy.org/donate). We've spent hundreds of hours on Lemmy, and would like to be able to add more developers to our little open-source co-op as time goes on.

## Changes

### Lemmy Server

- Federate user account deletion (fixes [#1284](https://github.com/LemmyNet/lemmy/issues/1284)) ([#2199](https://github.com/LemmyNet/lemmy/issues/2199))
- Dont federate initial upvote ([#2196](https://github.com/LemmyNet/lemmy/issues/2196))
- Add missing mod log entries for federated actions (fixes [#1489](https://github.com/LemmyNet/lemmy/issues/1489)) ([#2198](https://github.com/LemmyNet/lemmy/issues/2198))
- Make sure application questionaire is required. Fixes [#2189](https://github.com/LemmyNet/lemmy/issues/2189)
- Fix verify_mod_action check for remote admin actions ([#2190](https://github.com/LemmyNet/lemmy/issues/2190))
- Run cargo upgrade ([#2176](https://github.com/LemmyNet/lemmy/issues/2176))
- Migrate towards using page.attachment field for url (ref [#2144](https://github.com/LemmyNet/lemmy/issues/2144)) ([#2182](https://github.com/LemmyNet/lemmy/issues/2182))
- Exclude removed/deleted posts from community outbox ([#2184](https://github.com/LemmyNet/lemmy/issues/2184))
- Fetch community outbox in parallel (fixes [#2180](https://github.com/LemmyNet/lemmy/issues/2180)) ([#2181](https://github.com/LemmyNet/lemmy/issues/2181))
- Adding a ban expires update job. Fixes [#2177](https://github.com/LemmyNet/lemmy/issues/2177)
- Add email translations ([#2175](https://github.com/LemmyNet/lemmy/issues/2175))
- Add test files for Friendica federation (fixes [#2144](https://github.com/LemmyNet/lemmy/issues/2144)) ([#2167](https://github.com/LemmyNet/lemmy/issues/2167))
- Lowering search rate limit. Fixes [#2153](https://github.com/LemmyNet/lemmy/issues/2153) ([#2154](https://github.com/LemmyNet/lemmy/issues/2154))
- Rate limit ws joins ([#2171](https://github.com/LemmyNet/lemmy/issues/2171))
- Delete unused diesel.toml file ([#2166](https://github.com/LemmyNet/lemmy/issues/2166))
- Rate limit websocket joins. ([#2165](https://github.com/LemmyNet/lemmy/issues/2165))
- Doing tests in sequential order. Fixes [#2158](https://github.com/LemmyNet/lemmy/issues/2158) ([#2163](https://github.com/LemmyNet/lemmy/issues/2163))
- Dont log errors when rate limit is hit (fixes [#2157](https://github.com/LemmyNet/lemmy/issues/2157)) ([#2161](https://github.com/LemmyNet/lemmy/issues/2161))
- Fix rate limit check for register. Fixes [#2159](https://github.com/LemmyNet/lemmy/issues/2159)
- GNU social compatibility ([#2100](https://github.com/LemmyNet/lemmy/issues/2100))
- Consolidate and lower reqwest timeouts. Fixes [#2150](https://github.com/LemmyNet/lemmy/issues/2150) ([#2151](https://github.com/LemmyNet/lemmy/issues/2151))
- Check that config is valid before saving ([#2152](https://github.com/LemmyNet/lemmy/issues/2152))
- Dont log error if duplicate activity is received (fixes [#2146](https://github.com/LemmyNet/lemmy/issues/2146)) ([#2148](https://github.com/LemmyNet/lemmy/issues/2148))
- WIP: Email localization (fixes [#500](https://github.com/LemmyNet/lemmy/issues/500)) ([#2053](https://github.com/LemmyNet/lemmy/issues/2053))
- If viewed actor isnt in db, fetch it from other instance ([#2145](https://github.com/LemmyNet/lemmy/issues/2145))
- Show rate limit algorithm. Fixes [#2136](https://github.com/LemmyNet/lemmy/issues/2136)
- Adjust retry interval for sending activities ([#2141](https://github.com/LemmyNet/lemmy/issues/2141))
- Add jerboa link to readme. Fixes [#2137](https://github.com/LemmyNet/lemmy/issues/2137)
- Forbid remote URLs for avatars/banners (fixes [#1618](https://github.com/LemmyNet/lemmy/issues/1618)) ([#2132](https://github.com/LemmyNet/lemmy/issues/2132))
- Remove docker/prod unused files (fixes [#2086](https://github.com/LemmyNet/lemmy/issues/2086)) ([#2133](https://github.com/LemmyNet/lemmy/issues/2133))
- Rework error handling (fixes [#1714](https://github.com/LemmyNet/lemmy/issues/1714)) ([#2135](https://github.com/LemmyNet/lemmy/issues/2135))
- Dont allow admin to add mod to remote community ([#2129](https://github.com/LemmyNet/lemmy/issues/2129))
- Reject federated downvotes if downvotes are disabled (fixes [#2124](https://github.com/LemmyNet/lemmy/issues/2124)) ([#2128](https://github.com/LemmyNet/lemmy/issues/2128))

### Lemmy UI

- Dont allow community urls like /c/{id} (fixes [#611](https://github.com/LemmyNet/lemmy-ui/issues/611)) ([#612](https://github.com/LemmyNet/lemmy-ui/issues/612))
- Fix loading indicator on search page (fixes [#443](https://github.com/LemmyNet/lemmy-ui/issues/443)) ([#606](https://github.com/LemmyNet/lemmy-ui/issues/606))
- Upgrade deps ([#604](https://github.com/LemmyNet/lemmy-ui/issues/604))
- Remove auth token from error message. Fixes [#600](https://github.com/LemmyNet/lemmy-ui/issues/600) ([#601](https://github.com/LemmyNet/lemmy-ui/issues/601))
- Fix error during new site setup ([#596](https://github.com/LemmyNet/lemmy-ui/issues/596))
- Differentiate between mods and admins in mod log ([#597](https://github.com/LemmyNet/lemmy-ui/issues/597))
- Fix comment fedilink (fixes [#594](https://github.com/LemmyNet/lemmy-ui/issues/594)) ([#595](https://github.com/LemmyNet/lemmy-ui/issues/595))
