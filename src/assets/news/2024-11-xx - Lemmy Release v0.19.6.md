# Lemmy v0.19.6 Release

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Changes

This release took a long time to complete due to a major performance problem which brought lemmy.ml to a crawl every time we tried to deploy the new version. It took a lot of testing (in production) to narrow it down to a single commit, and finally fix the problem.

The release itself contains numerous bug fixes and minor improvements:

### Lemmy

#### Enhancements

- Enable more build optimizations
- Parallel federation sending by @phiresky in [#4623](https://github.com/LemmyNet/lemmy/pull/4623)
- Reduce CPU usage for generating link previews by @phiresky in [#4957](https://github.com/LemmyNet/lemmy/pull/4957)
- Switch from OpenSSL to rustls by @kwaa in [#4901](https://github.com/LemmyNet/lemmy/pull/4901)
- Increase max post url length to 2000 characters by @dessalines in [#4960](https://github.com/LemmyNet/lemmy/pull/4960)
- Increase max length of user bio to 1000 charactes by @dessalines [#5014](https://github.com/LemmyNet/lemmy/pull/5014)
- Reduce maximum comment depth to 50 by @nutomic [#5009](https://github.com/LemmyNet/lemmy/pull/5009)
- Resize post thumbnails by @nutomic [#5107/files](https://github.com/LemmyNet/lemmy/pull/5107)
- Add category to RSS feeds by @nutomic [#5030](https://github.com/LemmyNet/lemmy/pull/5030)
- Allow users to view their own removed/deleted communities by @dessalines in [#4912](https://github.com/LemmyNet/lemmy/pull/4912)
- Add backend check to enforce hierarchy of admins and mods by @dessalines in [#4860](https://github.com/LemmyNet/lemmy/pull/4860)
- Do pictrs transformations for proxied image urls by @dessalines in [#4895](https://github.com/LemmyNet/lemmy/pull/4895)
- Calculate "controversial" ranking with exponent instead of multiply (just like Reddit) by @dullbananas in [#4872](https://github.com/LemmyNet/lemmy/pull/4872)
- Automatically remove tracking parameters from URLs by @dessalines [#5018](https://github.com/LemmyNet/lemmy/pull/5018)
- Relax timeout for sending activities by @Nothing4You in [#4864](https://github.com/LemmyNet/lemmy/pull/4864)

#### Bug Fixes

- Fix admin notification for new user registration (fixes #4916) by @Nutomic in [#4925](https://github.com/LemmyNet/lemmy/pull/4925)
- Allow community settings changes by remote mods @flamingo-cant-draw in [#4937](https://github.com/LemmyNet/lemmy/pull/4937)
- Fix problem with connecting to Postgres with TLS @FenrirUnbound in [#4910](https://github.com/LemmyNet/lemmy/pull/4910)
- Fix bug when commenting in local-only community by @dessalines in [#4854](https://github.com/LemmyNet/lemmy/pull/4854) and @abdel-m in [#4920](https://github.com/LemmyNet/lemmy/pull/4920)
- Fix scheduled task to delete users with denied applications by @Nothing4You in [#4907](https://github.com/LemmyNet/lemmy/pull/4907)

#### API

- Return image dimensions and content type in API responses by @dessalines in [#4704](https://github.com/LemmyNet/lemmy/pull/4704)
- Adding a show_read override to GetPosts. by @dessalines in [#4846](https://github.com/LemmyNet/lemmy/pull/4846)
- Add show_nsfw override filter to GetPosts. by @dessalines in [#4889](https://github.com/LemmyNet/lemmy/pull/4889)
- Require authentication for site metadata fetch endpoint by @dessalines in [#4968](https://github.com/LemmyNet/lemmy/pull/4968)
- Add the ability to fetch a registration application by person_id by @dessalines in [#4913](https://github.com/LemmyNet/lemmy/pull/4913)
- Order community posts by published data, not id by @dullbananas in [#4859](https://github.com/LemmyNet/lemmy/pull/4859)
- Throw error when non-mod posts to mod-only comm or when URL is blocked by @flamingo-cant-draw in [#4966](https://github.com/LemmyNet/lemmy/pull/4966)
- Add option to search exclusively by post title by Carlos-Cabello [#5015](https://github.com/LemmyNet/lemmy/pull/5015)

#### Database

- Approve applications in transaction by @Nothing4You in [#4970](https://github.com/LemmyNet/lemmy/pull/4970)
- Use trigger to generate apub URL in insert instead of update, and fix query planner options not being set when TLS is disabled by @dullbananas in [#4797](https://github.com/LemmyNet/lemmy/pull/4797)

### Lemmy-UI

- Allow Arabic and Cyrillic characters when signing up or creating community by @SleeplessOne1917
- UX - Swap "Select Language" and "Cancel/Preview/Reply" button locations around in commentsReverse order of buttons in Reply TextArea
- Fix jump to content by @SleeplessOne1917
- Fixing peertube and ordinary video embeds. by @dessalines in [#2676](https://github.com/LemmyNet/lemmy-ui/pull/2676)
- Changing sameSite cookie from Strict to Lax. by @dessalines in [#2677](https://github.com/LemmyNet/lemmy-ui/pull/2677)
- Remove show new post notifs setting. by @dessalines in [#2675](https://github.com/LemmyNet/lemmy-ui/pull/2675)
- Fix memory leak around emojis on server render by @makotech222 in [#2674](https://github.com/LemmyNet/lemmy-ui/pull/2674)
- Enable spellcheck for markdown text area by @SleeplessOne1917 in [#2669](https://github.com/LemmyNet/lemmy-ui/pull/2669)
- Pre release dep bump by @SleeplessOne1917 in [#2661](https://github.com/LemmyNet/lemmy-ui/pull/2661)
- Add ability to fill magnet link title on post creation. by @dessalines in [#2654](https://github.com/LemmyNet/lemmy-ui/pull/2654)
- Registration application view by @SleeplessOne1917 in [#2651](https://github.com/LemmyNet/lemmy-ui/pull/2651)
- Add torrent help by @dessalines in [#2650](https://github.com/LemmyNet/lemmy-ui/pull/2650)
- More moderation history by @dessalines in [#2649](https://github.com/LemmyNet/lemmy-ui/pull/2649)
- Fix tribute related bug by @SleeplessOne1917 in [#2647](https://github.com/LemmyNet/lemmy-ui/pull/2647)
- Remove min and max length from password input when using login form by @SleeplessOne1917 in [#2643](https://github.com/LemmyNet/lemmy-ui/pull/2643)
- Remove trending communities card from home. by @dessalines in [#2639](https://github.com/LemmyNet/lemmy-ui/pull/2639)
- Set data-bs-theme based on the presence of "dark" in theme name by @SleeplessOne1917 in [#2638](https://github.com/LemmyNet/lemmy-ui/pull/2638)
- Fixing modlog filtering to allow admins and mods to filter by mod. by @dessalines in [#2629](https://github.com/LemmyNet/lemmy-ui/pull/2629)
- Fix issue from logo bugfix by @SleeplessOne1917 in [#2620](https://github.com/LemmyNet/lemmy-ui/pull/2620)
- Make more post params cross-postable by @SleeplessOne1917 in [#2621](https://github.com/LemmyNet/lemmy-ui/pull/2621)
- Fix wonky comment action icon button alignment by @SleeplessOne1917 in [#2622](https://github.com/LemmyNet/lemmy-ui/pull/2622)
- Prevent broken logo from crashing site by @SleeplessOne1917 in [#2619](https://github.com/LemmyNet/lemmy-ui/pull/2619)
- Add rate limit info message. by @dessalines in [#2563](https://github.com/LemmyNet/lemmy-ui/pull/2563)
- Fix getQueryString by @matc-pub in [#2558](https://github.com/LemmyNet/lemmy-ui/pull/2558)

### New Contributors

- @abdel-m made their first contribution in [#4920](https://github.com/LemmyNet/lemmy/pull/4920)
- @johnspurlock made their first contribution in [#4917](https://github.com/LemmyNet/lemmy/pull/4917)
- @FenrirUnbound made their first contribution in [#4910](https://github.com/LemmyNet/lemmy/pull/4910)
- @kwaa made their first contribution in [#4901](https://github.com/LemmyNet/lemmy/pull/4901)
- @Daniel15 made their first contribution in [#4892](https://github.com/LemmyNet/lemmy/pull/4892)

### Full Changelog

- [Lemmy Backend](https://github.com/LemmyNet/lemmy/compare/0.19.5...0.19.6)
- [Lemmy-UI](https://github.com/LemmyNet/lemmy-ui/compare/0.19.5...0.19.6)

## Upgrade instructions

_Note_: This upgrade could take as long as ~30 minutes for older servers, due to needing to fix controversy ranks for all historical posts.

There are no config file changes with this release.

Follow the upgrade instructions for [ansible](https://github.com/LemmyNet/lemmy-ansible/blob/main/UPGRADING.md) or [docker](https://join-lemmy.org/docs/en/administration/install_docker.html#updating).

If you need help with the upgrade, you can ask in our [support forum](https://lemmy.ml/c/lemmy_support) or on the [Matrix Chat](https://matrix.to/#/!OwmdVYiZSXrXbtCNLw:matrix.org).

## Thanks to everyone

We'd like to thank our many contributors and users of Lemmy for coding, translating, testing, and helping find and fix bugs. We're glad many people find it useful and enjoyable enough to contribute.

Special shout out to @SleeplessOne1917, @phiresky, @dullbananas, @mv-gh, @Nothing4u, @asonix, @sunaurus, @flamingo-cant-draw, and @Freakazoid182 for their many code contributions and helpful insights.

## Support development

We (@dessalines and @nutomic) have been working full-time on Lemmy for over five years. This is largely thanks to support from [NLnet foundation](https://nlnet.nl/), as well as [donations from individual users](https://join-lemmy.org/donate).

If you like using Lemmy, and want to make sure that we will always be available to work full time building it, consider [donating to support its development](https://join-lemmy.org/donate). A recurring donation is the best way to ensure that open-source software like Lemmy can stay independent and alive, and helps us grow our little developer co-op to support more full-time developers.

- [Liberapay](https://liberapay.com/Lemmy) (preferred option)
- [Open Collective](https://opencollective.com/lemmy)
- [Patreon](https://www.patreon.com/dessalines)
- [Cryptocurrency](https://join-lemmy.org/crypto)
