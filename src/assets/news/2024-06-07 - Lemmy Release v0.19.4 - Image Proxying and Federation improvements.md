# Lemmy v0.19.4 Release

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Major Changes

This `v0.19.4` release is a big one, with > 200 pull requests merged since `v0.19.3`. As such we can only give a general overview of the major changes in this post, and without going into detail. For more information, read the full changelogs at the bottom of this post.

### Local Only Communities

Communities have a new `visibility` setting, which can be either `Public` (current behaviour) or [`LocalOnly`](https://github.com/LemmyNet/lemmy/pull/4350). The latter means that the community won't federate, and can only be viewed by users who are logged in to the local instance. This can be useful for meta communities discussing moderation policies of the local instance, where outside users shouldn't be able to participate. It is also a first step towards implementing [private communities](https://github.com/LemmyNet/rfcs/pull/5). Local only communities still need more testing and should be considered experimental for now.

### Image Proxying

There is a new config option called [image_mode](https://github.com/LemmyNet/lemmy/blob/705e86eb4c0079d0775f0c1490968f1183095fcc/config/defaults.hjson#L51) which provides a way to [proxy external image links](https://github.com/LemmyNet/lemmy/pull/4035) through the local instance. This prevents deanonymization attacks where an attacker uploads an image to his own server, embeds it in a Lemmy post and watches the IPs which load the image.

Instead if `image_mode` is set to `ProxyAllImages`, image urls are rewritten to be proxied through `/api/v3/image_proxy`. This can also improve performance and avoid overloading other websites. The setting works by rewriting links in new posts, comments and other places when they are inserted in the database. This means the setting has no effect on posts created _before_ the setting was activated. And after disabling the setting, existing images will continue to be proxied. It should also be considered experimental.

Many thanks to @asonix for adding this functionality to pict-rs `v0.5`.

### Post hiding

You can now hide a post as a dropdown option, and there is a new toggle to filter hidden posts in lemmy-ui. Apps can use the new `show_hidden` field on [GetPosts](https://join-lemmy.org/api/interfaces/GetPosts.html) to enable this.

### Moderation enhancements

With the [URL blocklist](https://github.com/LemmyNet/lemmy/pull/4515) admins can prevent users from linking to specific sites.

Admins and mods can now view the [report history](https://github.com/LemmyNet/lemmy) and [moderation history](https://github.com/LemmyNet/lemmy/pull/4492) for a given post or comment.

The functionality to resolve reports automatically when a post is removed was previously broken and is [now fixed](https://github.com/LemmyNet/lemmy/pull/4402). Additionally, reports for already removed items are now ignored.

The [site.content_warning](https://github.com/LemmyNet/lemmy/pull/4393) setting lets admins show a message to users before rendering any content. If it is active, nsfw posts can be viewed without login, after consenting.

Mods and admins can now [comment in locked posts](https://github.com/LemmyNet/lemmy/pull/4488).

Mods and admins can also use external tools such as [LemmyAutomod](https://github.com/RikudouSage/LemmyAutomod) for more advanced cases.

### Media

There is a new functionality for users to [list all images they have previously uploaded](https://github.com/LemmyNet/lemmy/pull/4509), and delete them if desired. It also allows admins to view and delete images hosted on the local instance.

When uploading a new avatar or banner, the old one is [automatically deleted](https://github.com/LemmyNet/lemmy/pull/4573).

Instance admins should also checkout [lemmy-thumbnail-cleaner](https://github.com/wereii/lemmy-thumbnail-cleaner) which can delete thumbnails for old posts, and free significant amounts of storage.

### Federation

Lemmy can now federate with [Wordpress](https://github.com/Automattic/wordpress-activitypub), [Discourse](https://github.com/discourse/discourse-activity-pub) and [NodeBB](https://github.com/NodeBB/NodeBB). So far there was only minor testing and these projects are still under heavy development. If you encounter any issues federating with these platforms, open an issue either in the Lemmy repo or in the respective project's issue tracker. You can test it by fetching the following posts:

- [Wordpress](https://pfefferle.org/hello-lemmy-part2/)
- [Discourse](https://socialhub.activitypub.rocks/ap/object/1899f65c062200daec50a4c89ed76dc9)
- [NodeBB](https://community.nodebb.org/post/98325)

In order to improve interoperability with Mastodon and other microblogging platforms, Lemmy now [automatically includes a hashtag with new posts](https://github.com/LemmyNet/lemmy/pull/4398). The hashtag is based on the community name, so posts to `/c/lemmy` will automatically have the hashtag `#lemmy`. This makes Lemmy posts much easier to discover.

Reliability and security of federation have been improved, and numerous bugs squashed. Signed fetch was broken and is fixed now.

### Vote display user setting

There is now a [user setting to change the way vote counts are displayed](https://github.com/LemmyNet/lemmy/pull/4450), called [vote display mode](https://join-lemmy.org/api/interfaces/LocalUserVoteDisplayMode.html).

You can specify which of the following vote data you'd like to see (or hide): Upvotes, Downvotes, Score, Upvote Percentage, or none of the above. The default (based on user feedback) is showing the upvotes + downvotes.

App developers will need to update their apps to support this setting.

### RSS Feeds

RSS feeds now include [post thumbnail](https://github.com/LemmyNet/lemmy/pull/4413) and [embedded images](https://github.com/LemmyNet/lemmy/pull/4442).

### Security Audit

A security audit was recently performed on Lemmy. Big thanks to [Radically Open Security](https://www.radicallyopensecurity.com/) for the generous funding, and to Sabrina Deibe and Joe Neeman for carrying out the audit. The focus was on federation logic, and discovered various problems in this area. Most of the problems are being mitigated as part of this release. Fortunately no critical security vulnerabilities were discovered.

This is already the third security audit of Lemmy, all organized by ROS. We're greatly indebted to them for their support.

### Other Changes

- [Added Community `local_subscribers` count](https://github.com/LemmyNet/lemmy/pull/4166)
- [Support for custom post thumbnail](https://github.com/LemmyNet/lemmy/pull/4425)
- For new user accounts the [interface language](https://github.com/LemmyNet/lemmy/pull/4435) and [discussion languages](https://github.com/LemmyNet/lemmy/pull/4550) are set automatically based on `accept-language` HTTP header
- [Added instance-level default sort type](https://github.com/LemmyNet/lemmy/pull/4454)
- [Indicate to user when they are banned from community](https://github.com/LemmyNet/lemmy/pull/4458)
- [Added alt_text for image posts](https://github.com/LemmyNet/lemmy/pull/4477)
- [Dont require leading ! or @ to fetch a user or community](https://github.com/LemmyNet/lemmy/pull/4513)
- [Extra fields for PostReport and CommentReport views](https://github.com/LemmyNet/lemmy/pull/4520)

### Full Changelog

- [API changes - lemmy-js-client 0.19.3 -> 0.19.4](https://github.com/LemmyNet/lemmy-js-client/compare/0.19.3-alpha.1...0.19.4)
- [lemmy-client-rs](https://github.com/LemmyNet/lemmy-client-rs/pulls?q=is%3Apr+merged%3A%3E2024-01-22)
- [Lemmy Backend](https://github.com/LemmyNet/lemmy/pulls?q=is%3Apr+merged%3A%3E2024-01-22)
- [Lemmy-UI](https://github.com/LemmyNet/lemmy-ui/pulls?q=is%3Apr+merged%3A%3E2024-01-22)

## Upgrade instructions

**Warning: This version requires both a Postgres and Pictrs version upgrade, which requires manual intervention.**

Follow the upgrade instructions for [ansible](https://github.com/LemmyNet/lemmy-ansible/blob/main/UPGRADING.md) or [docker](https://join-lemmy.org/docs/en/administration/install_docker.html#updating).

If you need help with the upgrade, you can ask in our [support forum](https://lemmy.ml/c/lemmy_support) or on the [Matrix Chat](https://matrix.to/#/!OwmdVYiZSXrXbtCNLw:matrix.org).

## Thanks to everyone

We'd like to thank our many contributors and users of Lemmy for coding, translating, testing, and helping find and fix bugs. We're glad many people find it useful and enjoyable enough to contribute.

Special thanks goes to [Radically Open Security](https://www.radicallyopensecurity.com/), @sleepless and @matc-pub for their work on lemmy-ui and lemmy-ui-leptos, @dullbananas for their help cleaning up the back-end, DB, and reviewing PRs, @phiresky for federation work, @MV-GH for their work on Jerboa and API suggestions, @asonix for developing pictrs, @ticoombs and @codyro for helping maintain lemmy-ansible, @kroese, @povoq, @flamingo-cant-draw, @aeharding, @Nothing4U, @db0, @MrKaplan, for helping with issues and troubleshooting, and too many more to count.

## Support development

We (@dessalines and @nutomic) have been working full-time on Lemmy for over three years. This is largely thanks to support from [NLnet foundation](https://nlnet.nl/), as well as [donations from individual users](https://join-lemmy.org/donate).

If you like using Lemmy, and want to make sure that we will always be available to work full time building it, consider [donating to support its development](https://join-lemmy.org/donate). A recurring donation is the best way to ensure that open-source software like Lemmy can stay independent and alive, and helps us grow our little developer co-op to support more full-time developers.

- [Liberapay](https://liberapay.com/Lemmy) (preferred option)
- [Open Collective](https://opencollective.com/lemmy)
- [Patreon](https://www.patreon.com/dessalines)
- [Cryptocurrency](https://join-lemmy.org/crypto) (scroll to bottom of page)
