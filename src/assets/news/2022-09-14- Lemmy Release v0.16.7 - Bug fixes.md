# Lemmy v0.16.7 Release : Bug fixes (2022-09-14)

_Written by @dessalines and @nutomic, 2022-09-14_

A few bug fixes:

- Fix missing auth on new post refresh. ([#764](https://github.com/LemmyNet/lemmy-ui/issues/764))
- Change CSP rule for connect-src (websocket) to wildcard (fixes [#730](https://github.com/LemmyNet/lemmy-ui/issues/730)) ([#737](https://github.com/LemmyNet/lemmy-ui/issues/737))
- Increase default search rate limit. ([#2424](https://github.com/LemmyNet/lemmy/issues/2424))
- Rejected federated pm from blocked users (fixes [#2398](https://github.com/LemmyNet/lemmy/issues/2398)) ([#2408](https://github.com/LemmyNet/lemmy/issues/2408))
- Handle Like, Undo/Like activities from Mastodon, add tests (fixes [#2378](https://github.com/LemmyNet/lemmy/issues/2378)) ([#2380](https://github.com/LemmyNet/lemmy/issues/2380))
- Dont allow login if account is banned or deleted (fixes [#2372](https://github.com/LemmyNet/lemmy/issues/2372)) ([#2374](https://github.com/LemmyNet/lemmy/issues/2374))
- Fix panics in search_by_apub_id() (fixes [#2371](https://github.com/LemmyNet/lemmy/issues/2371)) ([#2373](https://github.com/LemmyNet/lemmy/issues/2373))
