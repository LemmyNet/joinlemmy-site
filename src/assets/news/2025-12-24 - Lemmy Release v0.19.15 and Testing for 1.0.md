# Lemmy Release v0.19.15 and Testing for 1.0

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top. Thanks to @flamingos-cant for contributing to resolve this.

## Changes

We messed up the previous release and did not include the full list of changes. In fact there were a handful of other bug fixes, and notably a maximum page limit of 10 to prevent a DDoS attack. Some users were also hitting this limit, so with this version the limit is increased to 100. We apologize for these mistakes.

Here is the full changelog since 0.19.13:

- Don't allow accessing page numbers greater than 10 by @dessalines [#6017](https://github.com/LemmyNet/lemmy/pull/6017)
- Update deps based on cargo audit by @Nutomic in [#6258](https://github.com/LemmyNet/lemmy/pull/6258)
- Increase page limit to 100 by @Nutomic in [#6252](https://github.com/LemmyNet/lemmy/pull/6252)
- Ban federation for deleted users by @Nutomic in [#6207](https://github.com/LemmyNet/lemmy/pull/6207)
- Federate mod actions on deleted users by @Nutomic in [#6199](https://github.com/LemmyNet/lemmy/pull/6199)
- Allow admins to view deleted user profiles by @Nutomic in [#6194](https://github.com/LemmyNet/lemmy/pull/6194)
- Adding creator and community indexes for post_aggregates. by @dessalines in [#6025](https://github.com/LemmyNet/lemmy/pull/6025)
- Ignore apub person banners which cannot be parsed by @Nutomic in [#6015](https://github.com/LemmyNet/lemmy/pull/6015)u

---

Now for the good news, the development version of Lemmy 1.0 is available for testing on voyager.lemmy.ml with lots of new features. Registration is open, you're welcome to create an account. Feel free to post spam and try everything out. Here is only a short overview:

- **Multi-communities**: Combine different communities together into a custom feed.
- **Post scheduling**: Specify when your post should be published.
- **Keyword filter**: Automatically hide posts about certain topics.
- **Private communities**: Only followers can view the content, and need to be approved manually by mods. Other community visibilities are also available (unlisted, local only).
- **New notification system**: Including notifications for mod actions, and subscribing to communities and posts to be notified about new comments.
- **OAuth**: Login to Lemmy with existing account from another website. Use [this link](https://voyager.lemmy.ml/signup?sso_provider_id=1) to signup with your Github account (the UI still needs to be improved).
- **Post Tags**: Categorize posts within a community (UI part not implemented yet).
- **User vote totals**: You can see the total number of upvotes and downvotes given to each user.
- **User notes**: You can keep notes on other users.
- **Combined Feeds**: View your saved, liked posts and comments together in a single list.
- **Comment Locking**: Mods can now lock comments recursively.
- **GDPR style data exporting**: You can now export your full posting history as a JSON file.
- **Plugins**: Can be written in JS, Python, Rust, and any other language that targets Webassembly. The test server has a plugin for automatic language tagging of posts.
- **Cursor pagination**: Don't lose your place in the feed when switching pages.
- **API v3 compat**: Lemmy 1.0 can be used by existing apps with no changes (but most new features are only available via the new API v4).
- **More**: Countless smaller features, bug fixes and improvements, too much to list here.

All the above mentioned features are already implemented and fully working, but may need some polishing. If you encounter any problems, please open an issue ([backend](https://github.com/LemmyNet/lemmy/issues), [frontend](https://github.com/LemmyNet/lemmy-ui/issues)). voyager.lemmy.ml is automatically updated to the latest development version every night, so that changes can immediately be tested.

Keep in mind that Lemmy 1.0 is still in alpha state. There may be breaking changes and critical bugs, so do not attempt to upgrade your own instances yet. We intend to publish the first beta version in January, along with API docs and upgrade instructions for test servers.

We hope that you are as excited about these new features as we are. With all this said, happy testing and Merry Christmas!

## Upgrade instructions

There are no breaking changes with this release.

Follow the upgrade instructions for [ansible](https://github.com/LemmyNet/lemmy-ansible/blob/main/UPGRADING.md) or [docker](https://join-lemmy.org/docs/en/administration/install_docker.html#updating).

If you need help with the upgrade, you can ask in our [support forum](https://lemmy.ml/c/lemmy_support) or on the [Matrix Chat](https://matrix.to/#/!OwmdVYiZSXrXbtCNLw:matrix.org).

## Thanks to everyone

We’d like to thank our many contributors and users of Lemmy for coding, translating, testing, donating and reporting bugs. We're glad many people find it useful and enjoyable enough to contribute.

## Support development

We (@dessalines and @nutomic) have been working full-time on Lemmy for over five years. This is largely thanks to support from [NLnet foundation](https://nlnet.nl/), as well as [donations from individual users](https://join-lemmy.org/donate).

If you like using Lemmy, and want to make sure that we will always be available to work full time building it, consider [donating to support its development](https://join-lemmy.org/donate). A recurring donation is the best way to ensure that open-source software like Lemmy can stay independent and alive, and helps us grow our little developer co-op to support more full-time developers.

- [Liberapay](https://liberapay.com/Lemmy) (preferred option)
- [Open Collective](https://opencollective.com/lemmy)
- [Patreon](https://www.patreon.com/dessalines)
- [Cryptocurrency](https://join-lemmy.org/crypto)
