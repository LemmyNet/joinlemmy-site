# Lemmy Release v0.19.17

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top. Thanks to @flamingos-cant for contributing to resolve this.

## Changes

This release addresses another [security advisory](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-q537-8fr5-cw35#advisory-comment-172695) related to internal host access. You can now bypass these checks for federation, in order to federate with instances over the local network by setting environment variable `DANGER_FEDERATION_ALLOW_LOCAL_IP=1`. There are also some bug fixes, and lemmy-ui now logs file requests.

- Improve IP checks by @nutomic in [#6411](https://github.com/LemmyNet/lemmy/pull/6411)
- Allow to bypass federation IP checks with env var `DANGER_FEDERATION_ALLOW_LOCAL_IP` by @nutomic in [#158](https://github.com/LemmyNet/activitypub-federation-rust/pull/158)
- Fix Arabic user/community names by @nutomic in [#3968](https://github.com/LemmyNet/lemmy-ui/pull/3968)
- Fix removing post.url by @nutomic in [#3984](https://github.com/LemmyNet/lemmy-ui/pull/3984)
- Add lemmy-ui request logs by @MrKaplan-lw in [#3933](https://github.com/LemmyNet/lemmy-ui/pull/3933)

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
