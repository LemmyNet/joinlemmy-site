# Open beta testing for Lemmy 1.0.0

## What is lemmy

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

---

Two years have already passed since we started working on some major new features for Lemmy. Back then we still planned to release them as version 0.20, but over time the scope expanded and it turned into version 1.0 instead. Besides many new features, we also took the opportunity to do a lot of cleanup work, so that 1.0 can remain stable for a very long time.

Below you can see the list of major new features. This is far from complete because there are simply too many changes to list. In general, any Github issue which was fixed over the last two years and didn't get into version 0.19, will be part of version 1.0.

### For users:

- **Redesigned UI**: New card view, less clutter
- **Post Tags**: Categorize posts within a community.
- **Multi-communities**: Group different communities together into a custom feed.
- **Post scheduling**: Specify when your post should be published.
- **Keyword filter**: Automatically hide posts about certain topics.
- **Private communities**: Only approved followers can view the content (plus other community visibilities).
- **Notifications improvements** including notifications for mod actions, and subscribing to community/post notifications.
- **Combined Feeds**: view your liked posts and comments together in a single list.
- **User vote totals**: There is a setting to view the vote totals you've given to any user.
- **User notes**: You can make and view notes for any user.
- **GDPR style data exporting**: You can now export your historical data as a JSON file.

### Other changes:

- **Comment Locking**: Comments can now be locked, and it also locks any reply comments.
- **Plugins**: Can be written in JS, Python, Rust, and any other language that targets Webassembly. See the [documentation](https://join-lemmy.org/docs/contributors/08-plugins.html) for details.
- **Cursor pagination**: Don't lose your place in the feed when switching pages.
- **OAuth**: Login to Lemmy with existing account from another website.
- [**New API v4**](https://join-lemmy.org/api/main): Apps and frontends need to be updated to take advantage of new features. There is also a backwards compatible API v3 available.

The main work which still needs to be done before the official release is SQL optimizations. Some queries are still too slow, taking up to 300ms. And the database migrations from 0.19 to 1.0 take roughly 20 hours for lemmy.ml (smaller instances will be much faster). If you are an expert with PostgreSQL we need your help. Please have a look at the following issues which include all the relevant details:

- [Slow SQL queries](https://github.com/LemmyNet/lemmy/issues/6460)
- [Reduce DB / table sizes](https://github.com/LemmyNet/lemmy/issues/5876)

The other remaining task is testing and bug fixing. Now it is your turn as Lemmy users: on [voyager.lemmy.ml](https://voyager.lemmy.ml/) try the new version and create an account. Signups are open, feel free to make posts, create communities and do everything else that can be done. Spamming test posts is absolutely encouraged. See how the new features work, and open an issue if you encounter any problem ([backend](https://github.com/LemmyNet/lemmy/issues), [frontend](https://github.com/LemmyNet/lemmy-ui/issues)).

If you run a test instance for Lemmy, we suggest that you upgrade it to `1.0.0-beta.0` by following the [instructions](https://join-lemmy.org/docs/administration/1.0_upgrade.html). You can also try to run the 1.0 database migrations against a local copy of your production database. This will show how long the upgrade process will take, and help to reveal bugs in the migrations.

**Be careful about upgrading production instances**. In principle you can already use 1.0 in production. Be sure that you have working backups and that you can restore them. Expect to tolerate major bugs, or to revert back to the stable version for now. If you have any problems, join the [admin chat on matrix](https://matrix.to/#/!OwmdVYiZSXrXbtCNLw:matrix.org) or ask in [/c/lemmy-support](https://lemmy.ml/c/lemmy_support).

For developers of Lemmy apps and clients, now is the time to start updating your projects to use the new API v4. This will give you enough time to use the new API once Lemmy 1.0 is finally released. See the [API v4 upgrade guide](https://join-lemmy.org/docs/contributors/09-api-v4.html) for instructions. If you develop any tools which integrate with Lemmy, have a look at the new [plugin system](https://github.com/LemmyNet/lemmy-plugins/).

Over the next months we will focus on testing and bug fixing. Afterwards, when when all major problems are fixed we will go to the release candidate phase. Then lemmy.ml will be upgraded to version 1.0.0-rc.0 to find remaining problems in production. When these are also resolved we will publish the final 1.0 release.

Thanks to everyone who contributed to the new release so far!

---

An open source project the size of Lemmy needs constant work to manage the project, implement new features and fix bugs. Dessalines and Nutomic work full-time on these tasks and more. As there is no advertising or tracking, all of our work is funded through donations. Even so there is barely enough time in the day, and no time for a second job. The only available option are user donations.

To keep it viable donations need to reach a minimum of 5000€ per month, resulting in a modest salary of 2500€ per developer. If that goal is reached we can stop worrying about money, and fully focus on improving the software for the benefit of all users and instances. We especially rely on recurring donations to secure the long-term development and make Lemmy the best it can be.

[Donate](https://join-lemmy.org/donate)
