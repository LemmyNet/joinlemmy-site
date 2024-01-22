# Lemmy v0.19.3 Release

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Major Changes

- Fixed lemmy-ui error page bug by @Sleepless in https://github.com/LemmyNet/lemmy-ui/pull/2302
- Fix bug with Mastodon undo follow activities by @Nutomic in https://github.com/LemmyNet/lemmy/pull/4364
- Count chars, not bytes for max title length (fixes #4366) by @Nutomic in https://github.com/LemmyNet/lemmy/pull/4367
- Mark instance as alive after successful activity send (fixes #4039) by @Nutomic in https://github.com/LemmyNet/lemmy/pull/4377
- Dont allow caching captcha response by @Nutomic in https://github.com/LemmyNet/lemmy/pull/4381
- Revert "Dont ignore errors during login (fixes #4319) (#4321)" by @Nutomic in https://github.com/LemmyNet/lemmy/pull/4380
- Removing group from woodpecker, as its deprecated. by @dessalines in https://github.com/LemmyNet/lemmy/pull/4387
- Add secondary sort by published date for post view (fixes #4383) by @Nutomic in https://github.com/LemmyNet/lemmy/pull/4384

## Upgrade instructions

Follow the upgrade instructions for [ansible](https://github.com/LemmyNet/lemmy-ansible#upgrading) or [docker](https://join-lemmy.org/docs/en/administration/install_docker.html#updating).

If you need help with the upgrade, you can ask in our [support forum](https://lemmy.ml/c/lemmy_support) or on the [Matrix Chat](https://matrix.to/#/!OwmdVYiZSXrXbtCNLw:matrix.org).

## Thanks to everyone

We'd like to thank our many contributors and users of Lemmy for coding, translating, testing, and helping find and fix bugs. We're glad many people find it useful and enjoyable enough to contribute.

## Support development

We (@dessalines and @nutomic) have been working full-time on Lemmy for over three years. This is largely thanks to support from [NLnet foundation](https://nlnet.nl/), as well as [donations from individual users](https://join-lemmy.org/donate).

If you like using Lemmy, and want to make sure that we will always be available to work full time building it, consider [donating to support its development](https://join-lemmy.org/donate). A recurring donation is the best way to ensure that open-source software like Lemmy can stay independent and alive.

- [Liberapay](https://liberapay.com/Lemmy) (preferred option)
- [Open Collective](https://opencollective.com/lemmy)
- [Patreon](https://www.patreon.com/dessalines)
- [Cryptocurrency](https://join-lemmy.org/donate) (scroll to bottom of page)
