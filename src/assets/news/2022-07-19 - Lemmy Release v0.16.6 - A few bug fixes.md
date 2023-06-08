# Lemmy v0.16.6 Release : bug fixes (2022-07-19)

_Written by @dessalines and @nutomic, 2022-07-19_

A few bug fixes:

- Fix problem where actors can have empty public key (fixes [#2347](https://github.com/LemmyNet/lemmy/issues/2347)) ([#2348](https://github.com/LemmyNet/lemmy/issues/2348))
- Be more explicit about returning deleted actors or not ([#2335](https://github.com/LemmyNet/lemmy/issues/2335))
- Dont allow blocking admin ([#2340](https://github.com/LemmyNet/lemmy/issues/2340))
- Increase RSS fetch limit to 20. Fixes [#2319](https://github.com/LemmyNet/lemmy/issues/2319) ([#2327](https://github.com/LemmyNet/lemmy/issues/2327))
- Fix length of post_report.original_post_name db field (fixes [#2311](https://github.com/LemmyNet/lemmy/issues/2311)) ([#2315](https://github.com/LemmyNet/lemmy/issues/2315))
- Add pub use for db crates in api_common ([#2305](https://github.com/LemmyNet/lemmy/issues/2305))
- Accept private like ([#1968](https://github.com/LemmyNet/lemmy/issues/1968)) ([#2301](https://github.com/LemmyNet/lemmy/issues/2301))
