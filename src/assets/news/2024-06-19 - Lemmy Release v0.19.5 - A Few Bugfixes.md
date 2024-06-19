# Lemmy v0.19.5 Release

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Changes

This is a smaller bugfix release, with the following changes:

### Lemmy

- [Replacing wav crate with hound](https://github.com/LemmyNet/lemmy/pull/4788).
- [Don't change encoding style in clean_url_params](https://github.com/LemmyNet/lemmy/pull/4802).
- [Fix for federation last_successful_id](https://github.com/LemmyNet/lemmy/issues/4363).
- [Refactoring local user settings](https://github.com/LemmyNet/lemmy/pull/4746).
- [Fixing featured_local trigger](https://github.com/LemmyNet/lemmy/pull/4837).
- [Fix postres TLS connection](https://github.com/LemmyNet/lemmy/pull/4844).

### Lemmy-UI

- [Fix for fetch page title](https://github.com/LemmyNet/lemmy-ui/pull/2519).
- [Fix create post focus resets](https://github.com/LemmyNet/lemmy-ui/pull/2520).
- [Make media uploads viewable only on your own profile](https://github.com/LemmyNet/lemmy-ui/pull/2540).
- [Fixing an auto-download bug](https://github.com/LemmyNet/lemmy-ui/pull/2552).
- [Regenerating lemmy-ui themes](https://github.com/LemmyNet/lemmy-ui/pull/2554).

### Full Changelog

- [Lemmy Backend](https://github.com/LemmyNet/lemmy/compare/0.19.4...0.19.5)
- [Lemmy-UI](https://github.com/LemmyNet/lemmy-ui/compare/0.19.4...0.19.5)

## Upgrade instructions

Follow the upgrade instructions for [ansible](https://github.com/LemmyNet/lemmy-ansible/blob/main/UPGRADING.md) or [docker](https://join-lemmy.org/docs/en/administration/install_docker.html#updating).

If you need help with the upgrade, you can ask in our [support forum](https://lemmy.ml/c/lemmy_support) or on the [Matrix Chat](https://matrix.to/#/!OwmdVYiZSXrXbtCNLw:matrix.org).

## Thanks to everyone

We'd like to thank our many contributors and users of Lemmy for coding, translating, testing, and helping find and fix bugs. We're glad many people find it useful and enjoyable enough to contribute.

## Support development

We (@dessalines and @nutomic) have been working full-time on Lemmy for over three years. This is largely thanks to support from [NLnet foundation](https://nlnet.nl/), as well as [donations from individual users](https://join-lemmy.org/donate).

If you like using Lemmy, and want to make sure that we will always be available to work full time building it, consider [donating to support its development](https://join-lemmy.org/donate). A recurring donation is the best way to ensure that open-source software like Lemmy can stay independent and alive, and helps us grow our little developer co-op to support more full-time developers.

- [Liberapay](https://liberapay.com/Lemmy) (preferred option)
- [Open Collective](https://opencollective.com/lemmy)
- [Patreon](https://www.patreon.com/dessalines)
- [Cryptocurrency](https://join-lemmy.org/donate) (scroll to bottom of page)
