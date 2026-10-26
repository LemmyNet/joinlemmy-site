# Lemmy Release v0.19.20 - Reduced Memory Usage

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Changes

This release again includes numerous security fixes. Some of them are severe so admins should update as soon as possible. There are no database migrations, which means you can easily revert the upgrade if needed.

The most severe problem is a wrong permission check in the federation code, which allowed write actions from any instance (details will be provided later). It also fixes the [emudhra CA failure](https://emudhra.we-have-a-problem.com/) by relying on sytem `ca-certificates` instead of builtin ones. To make this work it was necessary to remove the unmaintained `webmention` crate. And when connecting to the [PostgreSQL database over TLS, Lemmy didn't actually verify the certificate](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-pf8v-frhx-f6rx).

There are various problems related to IP validation, allowing an attacker to access internal services through Lemmy. One of these used [NAT64/6to4/Teredo IPv6 transition to bypass the checks](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-662w-vmqg-q6q7). For [markdown image links the IP check was missing](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-4c95-m7m2-c354). And there was another problem: an attacker-controlled domain could [resolve to an external IP at first, then resolve to an internal IP later (Time-of-check Time-of-use (TOCTOU) Race Condition)](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-6mv8-5jg3-gv28). If these new checks cause problems for your setup, you can disable them with `DANGER_FEDERATION_ALLOW_LOCAL_IP=1`.

The markdown-it library had various problems with [quadratic complexity that could lead to Denial of Service](https://github.com/markdown-it/markdown-it/security).

Finally there is some missing validation added, like when [importing user settings](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-rg64-mpqh-4j78). The [nodeinfo endpoint was missing a rate limit](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-rg2m-4j8v-7888). And [junior community moderator could seize top-mod rank by re-adding a senior mod](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-q5vj-w32q-m868).

Full changelog:

- 3fd5b2466 Add check for federation undo_delete
- 43642f2b6 Use system `ca-certificates` to mitigate emudhra CA failure (#6712)
- dcf726e69 [0.19] Improve IP validation
- 2870bf150 [0.19] Fix verification for delete user over federation
- 4d958d942 [0.19] Prevent caching of private RSS feeds (#6702)
- 51b337cb1 [0.19] Higher mod / admin check (#6694)
- 23dc1e3bc [0.19] Use root certs for tls DB connections (#6688)
- c52f079cd [0.19] Validate IPs of markdown image links before inserting (#6676)
- a28f4447f [0.19] Adding rate_limit to feeds route. (#6665)
- 26dd0a0b8 [0.19] Add missing validations for settings import (#6633)
- 0b5100a05 [0.19] Upgrade dependencies (#6632)

- 3005858d Update markdown-it (#4339)
- 533dfda0 [0.19] Fixing avif support. (#4338)
- 346edebe [0.19] Add `referrerpolicy` to video iframe (#4307)
- 06d424e8 [0.19] Fix for wrong link previews (#4299)
- a4b5b3e0 [0.19] Upgrade dependencies (#4288)
- 17c901bc Update dependency markdown-it to v14.2.0 (#4287)

## Upgrade instructions

There are no breaking changes with this release.

Follow the upgrade instructions for [ansible](https://github.com/LemmyNet/lemmy-ansible/blob/main/UPGRADING.md) or [docker](https://join-lemmy.org/docs/en/administration/install_docker.html#updating).

If you need help with the upgrade, you can ask in our [support forum](https://lemmy.ml/c/lemmy_support) or on the [Matrix Chat](https://matrix.to/#/!OwmdVYiZSXrXbtCNLw:matrix.org).

## Thanks to everyone

We'd like to thank our many contributors and users of Lemmy for coding, translating, testing, and helping find and fix bugs. We're glad many people find it useful and enjoyable enough to contribute.

## Support development

We (@dessalines and @nutomic) have been working full-time on Lemmy for over five years. This is largely thanks to support from [NLnet foundation](https://nlnet.nl/), as well as [donations from individual users](https://join-lemmy.org/donate).

If you like using Lemmy, and want to make sure that we will always be available to work full time building it, consider [donating to support its development](https://join-lemmy.org/donate). A recurring donation is the best way to ensure that open-source software like Lemmy can stay independent and alive, and helps us grow our little developer co-op to support more full-time developers.

- [Liberapay](https://liberapay.com/Lemmy) (preferred option)
- [Open Collective](https://opencollective.com/lemmy)
- [Patreon](https://www.patreon.com/dessalines)
- [Cryptocurrency](https://join-lemmy.org/crypto)
