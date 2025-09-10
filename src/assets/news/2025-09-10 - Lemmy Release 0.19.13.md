# Lemmy Release v0.19.13

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Changes

This version fixes a handful of bugs. Most importantly it prevents a background task from blocking the Lemmy server entirely. Edit marks on comments are now hidden if it was edited within 5 minutes of creation. Also the browser cache usage is significantly reduced. Additionally ARM builds are fixed by using the default memory allocator on that platform.

### Backend

- Fixing active counts slow queries. by @dessalines in [#5907](https://github.com/LemmyNet/lemmy/pull/5907)
- Only use mimalloc on x86 and purge images in background task by @Nutomic in [#5893](https://github.com/LemmyNet/lemmy/pull/5893)
- Add missing comment depth check by @Nutomic in [#5842](https://github.com/LemmyNet/lemmy/pull/5842)
- Dont sanitize RSS content manually (fixes #5850) by @Nutomic in [#5852](https://github.com/LemmyNet/lemmy/pull/5852)
- Reduce false positives in URL blocklist to reduce scunthorpe problem by @Nothing4You in [#5807](https://github.com/LemmyNet/lemmy/pull/5807)

### Frontend

- Don't show edit mark if comment was edited in less than 5 minutes by @jfaustino [#3197](https://github.com/LemmyNet/lemmy-ui/pull/3197)
- Increase bio max length to 1000 chars by @nutomic [#3249](https://github.com/LemmyNet/lemmy-ui/pull/3249)
- Change link from element.io to matrix.org by @nutomic [#3250](https://github.com/LemmyNet/lemmy-ui/pull/3250)
- Remove all caches (fixes #3195) by @Nutomic in [#3248](https://github.com/LemmyNet/lemmy-ui/pull/3248)
- Fixed ordering for search results by @Nutomic in [#3219](https://github.com/LemmyNet/lemmy-ui/pull/3219)
- Add search field to community sidebar by @Nutomic in [#3217](https://github.com/LemmyNet/lemmy-ui/pull/3217)
- Add checkbox for title only search by @Nutomic in [#3220](https://github.com/LemmyNet/lemmy-ui/pull/3220)

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
