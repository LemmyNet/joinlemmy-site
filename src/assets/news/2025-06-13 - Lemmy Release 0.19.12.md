# Lemmy Release v0.19.12

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Changes

This release includes various minor improvements and bug fixes.

### Backend

- Fix Peertube federation by @flamingos-cant in [#5652](https://github.com/LemmyNet/lemmy/pull/5652)
- Show NSFW content by default if content_warning exists by @xaegit in [#5655](https://github.com/LemmyNet/lemmy/pull/5655)
- Register users in a transaction by @Nothing4You in [#5608](https://github.com/LemmyNet/lemmy/pull/5608)
- Fix email notifications for denied applications by @Nutomic in [#5641](https://github.com/LemmyNet/lemmy/pull/5641)
- Dont run scheduled tasks at startup by @Nutomic in [#5732](https://github.com/LemmyNet/lemmy/pull/5745)
- Only use HTTP/1 for federation by @flamingos-cant in [#5744](https://github.com/LemmyNet/lemmy/pull/5744)
- Update user count from local_user table instead of person table, and only count users with accepted application by @dullbananas in [#5495](https://github.com/LemmyNet/lemmy/pull/5495)
- Decrement fail_count instead of reset to 0 by @Nutomic in [#5737](https://github.com/LemmyNet/lemmy/pull/5737)
- Fix opentelemetry by @MrKaplan-lw in [#5702](https://github.com/LemmyNet/lemmy/pull/5702)
- Fix post listing in nsfw communities by @Nutomic in [#5698](https://github.com/LemmyNet/lemmy/pull/5698)
- Add missing post_read / hide / saved post_id indexes by @dessalines in [#5689](https://github.com/LemmyNet/lemmy/pull/5689)
- Improve media deletion logic by @Nothing4You in [#5677](https://github.com/LemmyNet/lemmy/pull/5677)
- Include published in VoteView order by for more consistent pagination by @MrKaplan-lw in [#5676](https://github.com/LemmyNet/lemmy/pull/5676)
- Mark posts in NSFW communities as NSFW by @Nothing4You in [#5646](https://github.com/LemmyNet/lemmy/pull/5646)
- Use version from git to indicate unreleased changes by @MrKaplan-lw in [#5622](https://github.com/LemmyNet/lemmy/pull/5622)

### Frontend

- Add Rblind theme by @travis-jeans in [#3159](https://github.com/LemmyNet/lemmy-ui/pull/3159)
- Remove browser cache by @SleeplessOne1917 in [#3150](https://github.com/LemmyNet/lemmy-ui/pull/3150)
- Show registration denial reason on login by @dessalines in [#3175](https://github.com/LemmyNet/lemmy-ui/pull/3175)
- Always escape HTML attributes in emoji autocomplete and custom emoji markdown renderer by @Nothing4You in [#3169](https://github.com/LemmyNet/lemmy-ui/pull/3169)
- Fix missing user badge for deleted users by @MrKaplan-lw in [#3162](https://github.com/LemmyNet/lemmy-ui/pull/3162)
- Add hungarian language by @dessalines in [#3158](https://github.com/LemmyNet/lemmy-ui/pull/3158)
- Fixing cache-control header. by @dessalines in [#3148](https://github.com/LemmyNet/lemmy-ui/pull/3148)
- Disable blur for NSFW images by default if content_warning exists by @xaegit in [#3128](https://github.com/LemmyNet/lemmy-ui/pull/3128)
- Add `Vary: Cookie` Header (fixes #3117) by @xaegit in [#3119](https://github.com/LemmyNet/lemmy-ui/pull/3119)
- Use alert-info for donation dialog by @dessalines in [#3115](https://github.com/LemmyNet/lemmy-ui/pull/3115)
- Optimize Dockerfile by @Nothing4You in [#3090](https://github.com/LemmyNet/lemmy-ui/pull/3090)
- Add support for using Lemmy UI with an external Lemmy instance by @SolninjaA in [#3041](https://github.com/LemmyNet/lemmy-ui/pull/3041)
- Only show View registration button to admins on profiles of local users by @Nothing4You in [#3072](https://github.com/LemmyNet/lemmy-ui/pull/3072)

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
