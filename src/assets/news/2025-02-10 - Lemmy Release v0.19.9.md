# Lemmy v0.19.9 Release

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Changes

This version fixes a potential security problem, by preventing Lemmy from accessing localhost URLs. There is also a fix for a crash during markdown parsing. Lemmy now uses [mimalloc](https://microsoft.github.io/mimalloc/) instead of the system allocator (usually glibc), which should improve performance and prevent unlimited memory growth over time.

### Lemmy

- [Error handling for thumbnail generation](https://github.com/LemmyNet/lemmy/pull/5298)
- [Use mimalloc as memory allocator](https://github.com/LemmyNet/lemmy/pull/5378)
- [Additional security checks for URLs](https://github.com/LemmyNet/lemmy/pull/5338) ([details](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-7723-35v7-qcxw)) . [Security Advisory](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-7723-35v7-qcxw)
- [Fix crash while rewriting markdown](https://github.com/LemmyNet/lemmy/pull/5395)
- [Fix peertube federation](https://github.com/LemmyNet/lemmy/pull/5381)
- [Append attachments to comments](https://github.com/LemmyNet/lemmy/pull/5143/files) (@flamingo-cant-draw)
- [Enable site languages for new user](https://github.com/LemmyNet/lemmy/pull/5235)

### Lemmy-UI

- [Enforce required validation on signup answers](https://github.com/LemmyNet/lemmy-ui/pull/2865) (@anhcuky)
- [copy thumbnail URL during crossposting](https://github.com/LemmyNet/lemmy-ui/pull/2877) (@anhcuky)
- [Adding a bottom-margin to spoiler details tag.](https://github.com/LemmyNet/lemmy-ui/pull/2882)
- [Fixing login password limits.](https://github.com/LemmyNet/lemmy-ui/pull/2904)
- [Adding zh-CN as default for zh lang.](https://github.com/LemmyNet/lemmy-ui/pull/2939)
- Updated translations

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
