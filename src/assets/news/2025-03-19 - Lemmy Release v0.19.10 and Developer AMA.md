# Lemmy Release v0.19.10 and Developer AMA

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Developer AMA

Next week we are going to hold an "Ask me Anything" where users can ask the Lemmy developers all sorts of questions. They will be answered by [@dessalines](https://lemmy.ml/u/dessalines) and [@nutomic](https://lemmy.ml/u/nutomic) who have been working on Lemmy since the beginning in 2019. Other maintainers may also chime in. You can ask about the beginnings of Lemmy, how we see the future of Lemmy, what makes Lemmy different from Reddit, internet and social media in general, as well as personal questions.

The AMA thread will be opened next Tuesday, March 25 in [!announcements@lemmy.ml](https://lemmy.ml/c/announcements). We will start responding one day later. Until then you can let other people know about the AMA, think of good questions and read our previous AMAs:

- [August 2023](https://lemmy.ml/post/2920188)
- [January 2024](https://lemmy.ml/post/11023519)

## Changes

- Fix Youtube thumbnails by increasing the metadata fetch limit to 1 MB [#5266](https://github.com/LemmyNet/lemmy/pull/5266)
- Also remove private messages when banning user with "remove content" (goodbye Nicole) [#5414](https://github.com/LemmyNet/lemmy/pull/5414)
- Ignore accept-language header if no site languages are specified, to avoid that users have English disabled and can't see most posts [#5485](https://github.com/LemmyNet/lemmy/pull/5485)
- Enable english for users on instances with all languages enabled, to resolve the above problem [#5489](https://github.com/LemmyNet/lemmy/pull/5489) [#5493](https://github.com/LemmyNet/lemmy/pull/5493)
- Only list local banned users under `/admin` [#5364](https://github.com/LemmyNet/lemmy/pull/5364)
- Add crawl-delay to robots.txt [#3009](https://github.com/LemmyNet/lemmy-ui/pull/3009)
- Optimize migrations which were included in 0.19.6 [#5301](https://github.com/LemmyNet/lemmy/pull/5301)

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
