# Lemmy Release v0.19.11

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Changes

This release fixes a security vulnerability which allows an attacker to delete images uploaded by other users. You can read the details in the [security advisory](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-wr2m-38xh-rpc9). Thanks to @Nothing4You for discovering and fixing it.

A new donation dialog is shown to users once per year, to help fund Lemmy development.

There are also various backports from the development branch. Importantly the "Private instance" setting can now be used with federation enabled. This way only logged-in users can browse posts and comments, which stops AI crawlers from overloading the server. Also moderators can now view votes in the post/comment options.

### Backend

- Remove unnecessary pictrs purge calls ([#5566](https://github.com/LemmyNet/lemmy/issues/5566))
- Donation dialog ([#5559](https://github.com/LemmyNet/lemmy/issues/5559))
- Send out email after registration denied, email confirmed ([#5553](https://github.com/LemmyNet/lemmy/pull/5553))
- Change private instance setting to allow federation ([#5530](https://github.com/LemmyNet/lemmy/issues/5530))
- Proxy post.url if it is an image ([#5545](https://github.com/LemmyNet/lemmy/issues/5545))
- When creating community copy allowed languages from creator profile ([#5490](https://github.com/LemmyNet/lemmy/issues/5490))
- Include image alt text in post search ([#5449](https://github.com/LemmyNet/lemmy/issues/5449))
- Add config option to enable json logging ([#5471](https://github.com/LemmyNet/lemmy/issues/5471), [#5557](https://github.com/LemmyNet/lemmy/issues/5557))
- Embed images in RSS feeds ([#5488](https://github.com/LemmyNet/lemmy/issues/5488))
- Fix federation of sticky posts ([#5593](https://github.com/LemmyNet/lemmy/pull/5593))
- Deleted user shouldnt break federation outbox ([#5443](https://github.com/LemmyNet/lemmy/issues/5443), [#5573](https://github.com/LemmyNet/lemmy/issues/5573))
- Fix some image embeds by escaping alt text [(#5506](https://github.com/LemmyNet/lemmy/issues/5506))
- Properly federate distinguish comment ([#5586](https://github.com/LemmyNet/lemmy/pull/5586))
- Increase default registration rate limit to 10 per hour ([#5600](https://github.com/LemmyNet/lemmy/pull/5600))
- Remove debug ratelimit being used in production ([#5551](https://github.com/LemmyNet/lemmy/pull/5551))

### Frontend

- Implement donation dialog ([#3034](https://github.com/LemmyNet/lemmy-ui/pull/3034))
- Hide images in private message reports ([#3053](https://github.com/LemmyNet/lemmy-ui/pull/3053))
- Dont render images in private message ([#3043](https://github.com/LemmyNet/lemmy-ui/pull/3043))
- Changed checkbox text "Only moderators can post to this community" from legend to label on the Create Community page ([#3046](https://github.com/LemmyNet/lemmy-ui/pull/3046))
- Trigger toast error on community request failure ([#3045](https://github.com/LemmyNet/lemmy-ui/pull/3045))
- Add local link next to fedilink on posts ([#3033](https://github.com/LemmyNet/lemmy-ui/pull/3033))
- Add banned badges to post and comment listings ([#3030](https://github.com/LemmyNet/lemmy-ui/pull/3030))
- Linkify user @ mentions ([#3029](https://github.com/LemmyNet/lemmy-ui/pull/3029))
- Adding ability for mods to view votes. ([#3027](https://github.com/LemmyNet/lemmy-ui/pull/3027))
- Upvote, downvote, view source, and favorite icons become larger when pressed to improve visibility on grayscale screens ([#2960](https://github.com/LemmyNet/lemmy-ui/pull/2960))
- Improve colour contrast of the mini-overlay in the top right corner of link or image post thumbnails ([#2961](https://github.com/LemmyNet/lemmy-ui/pull/2961))
- Improve screenreader accessibility by adding a main element to more pages (issue #2891) ([#2944](https://github.com/LemmyNet/lemmy-ui/pull/2944))
- Using input group for allowed and block instance buttons. ([#2905](https://github.com/LemmyNet/lemmy-ui/pull/2905))
- Moving totp and delete account settings into their own cards. ([#2907](https://github.com/LemmyNet/lemmy-ui/pull/2907))
- Hide NSFW field for create post form, for NSFW communities. ([#2887](https://github.com/LemmyNet/lemmy-ui/pull/2887))
- Modify the logic for appending the URL after uploading an image, placing the image URL after the cursor. ([#2804](https://github.com/LemmyNet/lemmy-ui/pull/2804))

## Upgrade instructions

There are no breaking changes with this release.

Follow the upgrade instructions for [ansible](https://github.com/LemmyNet/lemmy-ansible/blob/main/UPGRADING.md) or [docker](https://join-lemmy.org/docs/en/administration/install_docker.html#updating).

If you need help with the upgrade, you can ask in our [support forum](https://lemmy.ml/c/lemmy_support) or on the [Matrix Chat](https://matrix.to/#/!OwmdVYiZSXrXbtCNLw:matrix.org).

## Thanks to everyone

We'd like to thank our many contributors and users of Lemmy for coding, translating, testing, and helping find and fix bugs. We're glad many people find it useful and enjoyable enough to contribute.

## Support development

We are able to develop Lemmy as an open source platform free of tracking and ads thanks to the generosity of our users. Once a year we ask you to consider donating to support our work. Financial security allows us to continue maintaining and improving the platform. If you’d like to make a one-time or recurring donation simply use the links below. Thank you for using Lemmy.

Nutomic and Dessalines, Lemmy Developers

- [Liberapay](https://liberapay.com/Lemmy) (preferred option)
- [Open Collective](https://opencollective.com/lemmy)
- [Patreon](https://www.patreon.com/dessalines)
- [Cryptocurrency](https://join-lemmy.org/crypto)
