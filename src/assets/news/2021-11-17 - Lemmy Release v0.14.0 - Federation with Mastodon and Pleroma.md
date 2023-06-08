# Lemmy Release v0.14.0: Federation with Mastodon and Pleroma

_Written by @dessalines and @nutomic, 2021-11-17_

Today is an exciting day for the Lemmy project.

Almost one year after [first enabling federation](https://lemmy.ml/post/42833), we now federate with other projects for the first time! According to some people's definition, this finally makes us part of the Fediverse.

It took a lot of work to make this possible, so big thanks to [NLnet](https://nlnet.nl/) for funding our full time work on Lemmy, and to [@lanodan](https://queer.hacktivis.me/users/lanodan) and [@asonix](https://masto.asonix.dog/@asonix) for helping to figure out how Pleroma and Mastodon federation works (it's difficult because they have almost no documentation).

## What is Lemmy?

[Lemmy](https://join-lemmy.org/) is similar to sites like Reddit, Lobste.rs, or Hacker News: you subscribe to communities you're interested in, post links and discussions, then vote and comment on them. Lemmy isn't just a reddit alternative; its a network of interconnected communities ran by different people and organizations, all combining to create a single, personalized front page of your favorite news, articles, and memes.

## Major Changes

### Federation code rewrite

The rewrite of the federation code started by @nutomic in August is now mostly complete. As a result, the code is much cleaner, and has tests to guarantee no breaking changes between Lemmy versions. As a side effect of this rewrite, it was now relatively easy to enable federation with other projects.

Mastodon and Pleroma users can:

- View Lemmy communities, user profiles, posts and comments
- Follow Lemmy communities to receive new posts and comments
- Replies (mentions) work in both directions, including notifications

In addition, Pleroma users can exchange private messages with Lemmy users.

Note that Pleroma and Mastodon rely on a compatibility mode in Lemmy, which means that they won't receive events like Deletes or Votes. Other projects whose federation works similar to Pleroma/Mastodon will likely also federate.

### Hardcoded slur filter removed

Lemmy finally has essential moderation tools (reporting, user/community blocking), so the hardcoded filter isn't necessary anymore. If you want to keep using the slur filter, copy [these lines](https://github.com/LemmyNet/lemmy/blob/b18ea3e0cc620c3f97f9804c09b92f193809b846/config/config.hjson#L8-L12) to your config file when upgrading, and adjust to your liking.

## Upgrade notes

If you installed Lemmy without Ansible, you need to edit the nginx config file [to follow this example](https://github.com/LemmyNet/lemmy-ansible/blob/main/templates/nginx.conf#L63). Otherwise Mastodon won't be able to fetch objects or actors from Lemmy. Ansible applies this change automatically.

No other changes are necessary for federation with Mastodon/Pleroma. Just make sure your allowlist/blocklist allows it. Then get started by searching the URL of a Lemmy user or Community in Mastodon.

Note that Mastodon and Pleroma are much, much bigger than Lemmy at this point, with a combined 3 milion users and 4500 instances, compared to 20.000 users and 35 instances for Lemmy ([source](https://the-federation.info/)). The existing mod tools in Lemmy might not be adequate to handle that at the moment.

Be aware that if you have federation enabled in the Lemmy config, Mastodon and Pleroma users can now fetch all posts and comments, to view them and share with their followers. The Lemmy blocklist/allowlist can not prevent this, it only prevents posts/comments from blocked instances to be shown on your own instance. The only solution to this problem is disabling federation, or waiting for [signed fetch](https://github.com/LemmyNet/lemmy/issues/868) to be implemented.

If you want to use federation, but review new instances before federating with them, use the allowlist. You can switch from open federation to allowlist federation by pasting the output of the command below into `federation.allowed_instances` in the Lemmy config.

```
curl https://your-instance.com/api/v3/site | jq -c .federated_instances.linked
```

The [`lemmy.hjson` `additional_slurs` field has changed its name to `slur_filter`. ](https://github.com/LemmyNet/lemmy/blob/b18ea3e0cc620c3f97f9804c09b92f193809b846/config/config.hjson#L8-L12)

Follow the [Docker or Ansible upgrade instructions here.](https://join-lemmy.org/docs/en/administration/administration.html)

## Lemmy-Ansible

We've now separated our ansible install method (the preferred way to deploy Lemmy) into its own repo, [lemmy-ansible](https://github.com/LemmyNet/lemmy-ansible). Let us know if you need help migrating existing installations over to it.

## Changes

### API

- There is now a `GetUnreadCount` in the API to check the count of your unread messages, replies, and mentions.
- A full list of the API changes can be seen on this diff of [lemmy-js-client: 0.13.0 -> 0.14.0-rc.1](https://github.com/LemmyNet/lemmy-js-client/compare/0.13.0...0.14.0-rc.1) .

### Lemmy Server

- More federation compat ([#1894](https://github.com/LemmyNet/Lemmy/issues/1894))
- Adding clippy:unwrap to husky. Fixes [#1892](https://github.com/LemmyNet/Lemmy/issues/1892) ([#1893](https://github.com/LemmyNet/Lemmy/issues/1893))
- Remove header guard for activitypub routes
- Add federation test cases for Smithereen and Mastodon
- Reduce stack memory usage in apub code
- Remove ActivityFields trait, deserialize into another struct instead
- Check if post or comment are deleted first. Fixes [#1864](https://github.com/LemmyNet/Lemmy/issues/1864) ([#1867](https://github.com/LemmyNet/Lemmy/issues/1867))
- Correctly use and document check_is_apub_id_valid() param use_strict_allowlist
- Convert note.content and chat_message.content to html (fixes [#1871](https://github.com/LemmyNet/Lemmy/issues/1871))
- Upgrade background_jobs to 0.9.1 [#1820](https://github.com/LemmyNet/Lemmy/issues/1820) ([#1875](https://github.com/LemmyNet/Lemmy/issues/1875))
- Fix husky fmt hook. ([#1868](https://github.com/LemmyNet/Lemmy/issues/1868))
- Renaming to slur_filter. Fixes [#1773](https://github.com/LemmyNet/Lemmy/issues/1773) ([#1801](https://github.com/LemmyNet/Lemmy/issues/1801))
- Three instance inbox bug ([#1866](https://github.com/LemmyNet/Lemmy/issues/1866))
- Remove ansible from this repo. ([#1829](https://github.com/LemmyNet/Lemmy/issues/1829))
- Rewrite collections to use new fetcher ([#1861](https://github.com/LemmyNet/Lemmy/issues/1861))
- Dont blank out post or community info. Fixes [#1813](https://github.com/LemmyNet/Lemmy/issues/1813) ([#1841](https://github.com/LemmyNet/Lemmy/issues/1841))
- Format config/defaults.hjson before committing ([#1860](https://github.com/LemmyNet/Lemmy/issues/1860))
- Breaking apub changes ([#1859](https://github.com/LemmyNet/Lemmy/issues/1859))
- Pleroma federation2 ([#1855](https://github.com/LemmyNet/Lemmy/issues/1855))
- Create a custom pre-commit hook, generates config/defaults.hjson ([#1857](https://github.com/LemmyNet/Lemmy/issues/1857))
- Add cargo metadata to all crates ([#1853](https://github.com/LemmyNet/Lemmy/issues/1853))
- Add both (De)Serialize to all models ([#1851](https://github.com/LemmyNet/Lemmy/issues/1851))
- Adding GetUnreadCount to the API. Fixes [#1794](https://github.com/LemmyNet/Lemmy/issues/1794) ([#1842](https://github.com/LemmyNet/Lemmy/issues/1842))
- Federate reports ([#1830](https://github.com/LemmyNet/Lemmy/issues/1830))
- Fix saved posts and hide read posts issue. Fixes [#1839](https://github.com/LemmyNet/Lemmy/issues/1839) ([#1840](https://github.com/LemmyNet/Lemmy/issues/1840))
- Dont allow posts to deleted / removed communities. Fixes [#1827](https://github.com/LemmyNet/Lemmy/issues/1827) ([#1828](https://github.com/LemmyNet/Lemmy/issues/1828))
- Dont swallow API errors (fixes [#1834](https://github.com/LemmyNet/Lemmy/issues/1834)) ([#1837](https://github.com/LemmyNet/Lemmy/issues/1837))
- Fix federation of initial post/comment vote (fixes [#1824](https://github.com/LemmyNet/Lemmy/issues/1824)) ([#1835](https://github.com/LemmyNet/Lemmy/issues/1835))
- Fix clippy warnings added in nightly ([#1833](https://github.com/LemmyNet/Lemmy/issues/1833))
- Admins can view all reports. Fixes [#1810](https://github.com/LemmyNet/Lemmy/issues/1810) ([#1825](https://github.com/LemmyNet/Lemmy/issues/1825))
- Adding a message_id to emails. Fixes [#1807](https://github.com/LemmyNet/Lemmy/issues/1807) ([#1826](https://github.com/LemmyNet/Lemmy/issues/1826))
- Generate config docs from code ([#1786](https://github.com/LemmyNet/Lemmy/issues/1786))
- Trying a background_jobs fix. [#1820](https://github.com/LemmyNet/Lemmy/issues/1820) ([#1822](https://github.com/LemmyNet/Lemmy/issues/1822))
- mark parent as read on reply ([#1819](https://github.com/LemmyNet/Lemmy/issues/1819))
- Move code to apub library ([#1795](https://github.com/LemmyNet/Lemmy/issues/1795))
- Adding honeypot to user and post creation. Fixes [#1802](https://github.com/LemmyNet/Lemmy/issues/1802) ([#1803](https://github.com/LemmyNet/Lemmy/issues/1803))
- Add database host back into config file ([#1805](https://github.com/LemmyNet/Lemmy/issues/1805))

### Lemmy UI

- Updating translations.
- Fixing unload ([#487](https://github.com/LemmyNet/lemmy-ui/issues/487))
- Fix setup password. Fixes [#478](https://github.com/LemmyNet/lemmy-ui/issues/478) ([#484](https://github.com/LemmyNet/lemmy-ui/issues/484))
- Adding post comment scrolling hack. Fixes [#480](https://github.com/LemmyNet/lemmy-ui/issues/480) [#486](https://github.com/LemmyNet/lemmy-ui/issues/486)
- Navbar links ([#476](https://github.com/LemmyNet/lemmy-ui/issues/476))
