## What is lemmy

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top. 

## Lemmy 1.0.0-beta.1

After two years of quiet development, we are finally ready to show off the new features. There are also countless bug fixes and minor improvements, too many to list here. 

### For users:
- **Redesigned UI**: New card view, less clutter
- **Post Tags**: Categorize posts within a community.
- **Multi-communities**: Group different communities together into a custom feed.
- **Post scheduling**: Specify when your post should be published.
- **Keyword filter**: Automatically hide posts about certain topics.
- **Private communities**: Only approved followers can view the content (and other community visibilities).
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

The main work which still needs to be done is in SQL optimizations. The upgrade from 0.19 to 1.0 takes roughly 20 hours for lemmy.ml (for smaller instances this will be much faster). There are also some SQL queries which are too slow, taking over 300ms. If you are an expert with PostgreSQL we need your help. Please have a look at the following issues which include all the relevant details (schema dump, `explain analyze`):
- [Slow SQL queries](https://github.com/LemmyNet/lemmy/issues/6460)
- [Reduce DB / table sizes](https://github.com/LemmyNet/lemmy/issues/5876)

The other remaining task is testing and bug fixing. Now it is your turn as Lemmy users: on [voyager.lemmy.ml](https://voyager.lemmy.ml/) try the new version and create an account. Signups are open, feel free to make posts, create communities and do everything else that can be done. Spamming test posts is absolutely encouraged. See how the new features work, and if there are bugs or regressions, then open an issue ([backend](https://github.com/LemmyNet/lemmy/issues), [frontend](https://github.com/LemmyNet/lemmy-ui/issues)). Most of the above mentioned features are already implemented and fully working, but may need some polishing. 

If you run a test instance for Lemmy, we suggest that you upgrade it to `1.0.0-beta.0` by following the [instructions](https://join-lemmy.org/docs/administration/1.0_upgrade.html). You can also try to run the 1.0 database migrations against a local copy of your production database. This will show how long the upgrade process will take, and help to reveal bugs in the migrations.

**Be careful about upgrading production instances**. Ensure that you have working backups and that you can restore them. Expect to tolerate critical bugs, or to revert back to the stable version for now. Be sure to join the [admin chat on matrix](https://matrix.to/#/!OwmdVYiZSXrXbtCNLw:matrix.org) or [/c/lemmy-support](https://lemmy.ml/c/lemmy_support) to help resolve any problems.

For developers of Lemmy apps and clients, now is the time to start updating your projects to use the new API v4. This will give you enough time to use the new API once Lemmy 1.0 is finally released. See the [API v4 upgrade guide](https://join-lemmy.org/docs/contributors/09-api-v4.html) for instructions. If you develop any tools which integrate with Lemmy, have a look at the new [plugin system](https://github.com/LemmyNet/lemmy-plugins/).

Over the next months we will focus on testing and bug fixing. Afterwards, when when all major problems are fixed we will go to the release candidate phase. Then lemmy.ml will be upgraded to version 1.0.0-rc.1 to find remaining problems in production. When these are also resolved we will publish the final 1.0 release. 

---

An open source project the size of Lemmy needs constant work to manage the project, implement new features and fix bugs. Dessalines and Nutomic work full-time on these tasks and more. As there is no advertising or tracking, all of our work is funded through donations. Even so there is barely enough time in the day, and no time for a second job. The only available option are user donations.

To keep it viable donations need to reach a minimum of 5000€ per month, resulting in a modest salary of 2500€ per developer. If that goal is reached we can stop worrying about money, and fully focus on improving the software for the benefit of all users and instances. We especially rely on recurring donations to secure the long-term development and make Lemmy the best it can be.

[Donate](https://join-lemmy.org/donate)
