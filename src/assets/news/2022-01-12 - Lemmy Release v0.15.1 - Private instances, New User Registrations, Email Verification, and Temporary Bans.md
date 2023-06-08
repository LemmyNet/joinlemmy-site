# Lemmy Release v0.15.1: Private instances, New User Registrations, Email Verification, and Temporary Bans

_Written by @dessalines and @nutomic, 2022-01-12_

Lemmy now has private instances, optional registration applications, optional email verification, and temporary bans! These are described in detail below.

Special thanks to @asonix for adding [tokio-console](https://github.com/LemmyNet/Lemmy/issues/2003) and [Jaeger + opentelemetry](https://github.com/LemmyNet/Lemmy/issues/1992) to our dev setups, so we can better identify performance bottlenecks.

## What is Lemmy?

[Lemmy](https://join-lemmy.org/) is similar to sites like Reddit, Lobste.rs, or Hacker News: you subscribe to communities you're interested in, post links and discussions, then vote and comment on them. Lemmy isn't just a reddit alternative; its a network of interconnected communities ran by different people and organizations, all combining to create a single, personalized front page of your favorite news, articles, and memes.

## Major Changes

### Required email verification

Admins can turn this on, and new users will need to verify their emails. Current users will not have to do this.

### Registration applications

Admins can now optionally make new users fill out an application to join your server. There is a new panel in their top bar where they can approve or deny pending applications.

This works in conjunction with the _require_email_ field. If that is also turned on, the application will only be shown after their email has been verified. The user will receive an email when they have been accepted.

### Closed / Private instances

The instance settings now includes a _private instance_ option, which if turned on, will only let logged in users view your site. Private instances was one of our first issues, and it was a large effort, so its great to finally have this completed.

### Temporary Bans

When banning users from your site or community, moderators can now optionally give a number of days for the ban to last.

### Allow comment replies from blocked users

It used to be that if a user blocked you, you couldn't respond to their public posts and comments. This is now fixed. They won't see your content, but others can.

## Upgrade notes

Follow the [Docker or Ansible upgrade instructions here.](https://join-lemmy.org/docs/en/administration/administration.html)

## Support development

If you'd like to support development, and make sure that we will always be available to work full time on Lemmy, consider [donating to support its development](https://join-lemmy.org/donate). We've spent hundreds of hours on Lemmy, and would like to be able to add more developers to our little open-source co-op as time goes on.

## Changes

### API

We've removed a list of banned users from `GetSite`, added a few endpoints related to registration applications, made a few changes allowing temporary bans, site settings, made a few changes to the login response. These are non-destructive and current clients should work with this release.

- A full list of the API changes can be seen on this diff of [lemmy-js-client: 0.14.0 -> 0.15.0](https://github.com/LemmyNet/lemmy-js-client/compare/0.14.0-rc.1...0.15.0-rc.34) .

### Config

There is a new rate limit for creating new comments in the [config.hjson](https://github.com/LemmyNet/lemmy/blob/main/config/defaults.hjson#L36).

### Lemmy Server

- Adding temporary bans. Fixes [#1423](https://github.com/LemmyNet/Lemmy/issues/1423) ([#1999](https://github.com/LemmyNet/Lemmy/issues/1999))
- Add console-subscriber ([#2003](https://github.com/LemmyNet/Lemmy/issues/2003))
- Opentelemetry ([#1992](https://github.com/LemmyNet/Lemmy/issues/1992))
- Use correct encoding when fetching non-UTF-8 site metadata ([#2015](https://github.com/LemmyNet/Lemmy/issues/2015))
- Adding a banned endpoint for admins. Removing it from GetSite. Fixes [#1806](https://github.com/LemmyNet/Lemmy/issues/1806)
- Prevent panic on InboxRequestGuard
- Case-insensitive webfinger response. Fixes [#1955](https://github.com/LemmyNet/Lemmy/issues/1955) & [#1986](https://github.com/LemmyNet/Lemmy/issues/1986) ([#2005](https://github.com/LemmyNet/Lemmy/issues/2005))
- First pass at invite-only migration. ([#1949](https://github.com/LemmyNet/Lemmy/issues/1949))
- Upgrading pictrs. ([#1996](https://github.com/LemmyNet/Lemmy/issues/1996))
- Trying out an upgraded version of html5ever. [#1964](https://github.com/LemmyNet/Lemmy/issues/1964) ([#1991](https://github.com/LemmyNet/Lemmy/issues/1991))
- Adding min setup password length to the docs. Fixes [#1989](https://github.com/LemmyNet/Lemmy/issues/1989) ([#1990](https://github.com/LemmyNet/Lemmy/issues/1990))
- Test pleroma follow ([#1988](https://github.com/LemmyNet/Lemmy/issues/1988))
- Remove awc ([#1979](https://github.com/LemmyNet/Lemmy/issues/1979))
- Consolidate reqwest clients, use reqwest-middleware for tracing
- Don't drop error context when adding a message to errors ([#1958](https://github.com/LemmyNet/Lemmy/issues/1958))
- Change lemmur repo links ([#1977](https://github.com/LemmyNet/Lemmy/issues/1977))
- added deps - git and ca-certificates (for federation to work) and changed adduser to useradd so that user can be added non-interactively ([#1976](https://github.com/LemmyNet/Lemmy/issues/1976))
- Allow comment replies from blocked users. Fixes [#1793](https://github.com/LemmyNet/Lemmy/issues/1793) ([#1969](https://github.com/LemmyNet/Lemmy/issues/1969))
- Fix retry infinite loops. Fixes [#1964](https://github.com/LemmyNet/Lemmy/issues/1964) ([#1967](https://github.com/LemmyNet/Lemmy/issues/1967))
- Add lotide activities to tests
- Allow single item for to, cc, and @context
- Adding a captcha rate limit. Fixes [#1755](https://github.com/LemmyNet/Lemmy/issues/1755) ([#1941](https://github.com/LemmyNet/Lemmy/issues/1941))
- Dont send email notifications for edited comments (fixes [#1925](https://github.com/LemmyNet/Lemmy/issues/1925))
- Fix API dupes query. [#1878](https://github.com/LemmyNet/Lemmy/issues/1878)
- Fixing duped report view for admins. Fixes [#1933](https://github.com/LemmyNet/Lemmy/issues/1933) ([#1945](https://github.com/LemmyNet/Lemmy/issues/1945))
- Adding a GetComment endpoint. Fixes [#1919](https://github.com/LemmyNet/Lemmy/issues/1919) ([#1944](https://github.com/LemmyNet/Lemmy/issues/1944))
- Fix min title char count for post titles. Fixes [#1854](https://github.com/LemmyNet/Lemmy/issues/1854) ([#1940](https://github.com/LemmyNet/Lemmy/issues/1940))
- Adding MarkPostAsRead to API. Fixes [#1784](https://github.com/LemmyNet/Lemmy/issues/1784) ([#1946](https://github.com/LemmyNet/Lemmy/issues/1946))
- background-jobs 0.11 ([#1943](https://github.com/LemmyNet/Lemmy/issues/1943))
- Add tracing ([#1942](https://github.com/LemmyNet/Lemmy/issues/1942))
- Remove pointless community follower sort. ([#1939](https://github.com/LemmyNet/Lemmy/issues/1939))
- Use once_cell instead of lazy_static
- Adding unique constraint for activity ap_id. Fixes [#1878](https://github.com/LemmyNet/Lemmy/issues/1878) ([#1935](https://github.com/LemmyNet/Lemmy/issues/1935))
- Making public key required. Fixes [#1934](https://github.com/LemmyNet/Lemmy/issues/1934)
- Change NodeInfo `links` to an array
- Fixing fuzzy_search to escape like chars.
- Fix build error in [#1914](https://github.com/LemmyNet/Lemmy/issues/1914)
- Fix login ilike bug. Fixes [#1920](https://github.com/LemmyNet/Lemmy/issues/1920)
- Fix Smithereen webfinger, remove duplicate webfinger impl (fixes [#1916](https://github.com/LemmyNet/Lemmy/issues/1916))
- Dont announce comments, edited posts to Pleroma/Mastodon followers
- Community outbox should only contain activities sent by community (fixes [#1916](https://github.com/LemmyNet/Lemmy/issues/1916))
- Remove HTTP signature compatibility mode (its not necessary)
- Implement rate limits on comments

### Lemmy UI

- Fixed an issue with post embeds not being pushed to a new line [#544](https://github.com/LemmyNet/lemmy-ui/issues/544)
- Adding as and lt languages, Updating translations.
- Temp bans ([#524](https://github.com/LemmyNet/lemmy-ui/issues/524))
- Fix banner. Fixes [#466](https://github.com/LemmyNet/lemmy-ui/issues/466) ([#534](https://github.com/LemmyNet/lemmy-ui/issues/534))
- Making the modlog badge stand out more. Fixes [#531](https://github.com/LemmyNet/lemmy-ui/issues/531) ([#539](https://github.com/LemmyNet/lemmy-ui/issues/539))
- Add some fallback properties for display in older browsers ([#535](https://github.com/LemmyNet/lemmy-ui/issues/535))
- Private instances ([#523](https://github.com/LemmyNet/lemmy-ui/issues/523))
- Add nord theme. Fixes [#520](https://github.com/LemmyNet/lemmy-ui/issues/520) ([#527](https://github.com/LemmyNet/lemmy-ui/issues/527))
- Dont receive post room comments from blocked users. ([#516](https://github.com/LemmyNet/lemmy-ui/issues/516))
- Using console.error for error logs. ([#517](https://github.com/LemmyNet/lemmy-ui/issues/517))
- Fix issue with websocket buffer.
- Switching to websocket-ts. [#247](https://github.com/LemmyNet/lemmy-ui/issues/247) ([#515](https://github.com/LemmyNet/lemmy-ui/issues/515))
- Fix native language issue. (zh_Hant) ([#513](https://github.com/LemmyNet/lemmy-ui/issues/513))
- Fix tippy on component mount. Fixes [#509](https://github.com/LemmyNet/lemmy-ui/issues/509) ([#511](https://github.com/LemmyNet/lemmy-ui/issues/511))
- Fix docker latest ([#510](https://github.com/LemmyNet/lemmy-ui/issues/510))
- Enabling html tags in markdown. Fixes [#498](https://github.com/LemmyNet/lemmy-ui/issues/498)
- Fix comment scroll bug. Fixes [#492](https://github.com/LemmyNet/lemmy-ui/issues/492)
- Fixing error for null person_block. Fixes [#491](https://github.com/LemmyNet/lemmy-ui/issues/491)
- Trying to catch promise and json parse errors. [#489](https://github.com/LemmyNet/lemmy-ui/issues/489) ([#490](https://github.com/LemmyNet/lemmy-ui/issues/490))
-
