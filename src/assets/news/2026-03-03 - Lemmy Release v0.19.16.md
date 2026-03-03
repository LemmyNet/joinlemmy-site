# Lemmy Release v0.19.16

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top. Thanks to @flamingos-cant for contributing to resolve this.

## Changes

This release mitigates a potential security issue with the image endpoint. In short, an attacker can inject query parameters and make proxied requests to arbitrary URLs. See the [security advisory](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-jvxv-2jjp-jxc3) for details.

Also there are fixes for the database connection pool. The pool size is now at least two, as a lower size can result in deadlocks. Additionally there are now connection timeouts added. If your server logs show pool timeout errors, you should increase `database.pool_size` in the Lemmy config.

- Fix for image proxy filetypes by @dessalines in [#6357](https://github.com/LemmyNet/lemmy/pull/6357)
- Enable DB connection timeout by @Nutomic in [#6355](https://github.com/LemmyNet/lemmy/pull/6355)
- Use min database pool size of 2. by @dessalines in [#6345](https://github.com/LemmyNet/lemmy/pull/6345)

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
