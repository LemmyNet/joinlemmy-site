# Lemmy v0.19.7 Release

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Changes

This is a small bugfix release with the following:

- Fixing cors origin wildcard. by @dessalines in [#5194](https://github.com/LemmyNet/lemmy/pull/5194)
- Fetch community mods synchronously by @Nutomic in [#5169](https://github.com/LemmyNet/lemmy/pull/5169)
- Move aggregates to replaceable_schema, fix error (fixes #5186) by @Nutomic in [#5190](https://github.com/LemmyNet/lemmy/pull/5190)

### Full Changelog

- [Lemmy Backend](https://github.com/LemmyNet/lemmy/compare/0.19.6...0.19.7)
- [Lemmy-UI](https://github.com/LemmyNet/lemmy-ui/compare/0.19.6...0.19.7)

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
