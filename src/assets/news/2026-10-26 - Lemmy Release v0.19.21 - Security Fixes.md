# Lemmy Release v0.19.21 - Security Fixes

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Changes

This release again includes numerous security fixes. Some of them are severe so admins should update as soon as possible. There are no database migrations, which means you can easily revert the upgrade if needed. In the frontend a long-standing bug with wrong link previews is fixed, plus Youtube links and .avif image embeds work now.

The most severe problem is a wrong permission check in the federation code, which allowed write actions from any instance (details will be provided later). It also fixes the [emudhra CA failure](https://emudhra.we-have-a-problem.com/) by relying on sytem `ca-certificates` instead of builtin ones. To make this work it was necessary to remove the unmaintained `webmention` crate. And when connecting to the [PostgreSQL database over TLS, Lemmy didn't actually verify the certificate](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-pf8v-frhx-f6rx).

There are various problems related to IP validation, allowing an attacker to access internal services through Lemmy. One of these used [NAT64/6to4/Teredo IPv6 transition to bypass the checks](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-662w-vmqg-q6q7). For [markdown image links the IP check was missing](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-4c95-m7m2-c354). And there was another problem: an attacker-controlled domain could [resolve to an external IP at first, then resolve to an internal IP later (Time-of-check Time-of-use (TOCTOU) Race Condition)](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-6mv8-5jg3-gv28). If these new checks cause problems for your setup, you can disable them with `DANGER_FEDERATION_ALLOW_LOCAL_IP=1`.

The markdown-it library had various problems with [quadratic complexity that could lead to Denial of Service](https://github.com/markdown-it/markdown-it/security).

Finally there is some missing validation added, like when [importing user settings](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-rg64-mpqh-4j78). The [nodeinfo endpoint was missing a rate limit](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-rg2m-4j8v-7888). And [junior community moderator could seize top-mod rank by re-adding a senior mod](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-q5vj-w32q-m868).

## Full changelog:

Backend:

- [Add check for federation undo_delete](https://github.com/LemmyNet/lemmy/commit/3fd5b2466)
- [Use system `ca-certificates` to mitigate emudhra CA failure](https://github.com/LemmyNet/lemmy/pull/6712)
- [Improve IP validation](https://github.com/LemmyNet/lemmy)
- [Fix verification for delete user over federation](https://github.com/LemmyNet/lemmy/commit/2870bf150)
- [Prevent caching of private RSS feeds](https://github.com/LemmyNet/lemmy/pull/6702)
- [Higher mod / admin check](https://github.com/LemmyNet/lemmy/pull/6694)
- [Use root certs for tls DB connections](https://github.com/LemmyNet/lemmy/pull/6688)
- [Validate IPs of markdown image links before inserting](https://github.com/LemmyNet/lemmy/pull/6676)
- [Adding rate_limit to feeds route.](https://github.com/LemmyNet/lemmy/pull/6665)
- [Add missing validations for settings import](https://github.com/LemmyNet/lemmy/pull/6633)
- [Upgrade dependencies](https://github.com/LemmyNet/lemmy/pull/6632)

Frontend:

- [Update markdown-it](https://github.com/LemmyNet/lemmy-ui/pull/4339)
- [Fixing avif support.](https://github.com/LemmyNet/lemmy-ui/pull/4338)
- [Add `referrerpolicy` to video iframe](https://github.com/LemmyNet/lemmy-ui/pull/4307)
- [Fix for wrong link previews](https://github.com/LemmyNet/lemmy-ui/pull/4299)
- [Upgrade dependencies](https://github.com/LemmyNet/lemmy-ui/pull/4288)
- [Update dependency markdown-it to v14.2.0](https://github.com/LemmyNet/lemmy-ui/pull/4287)

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
