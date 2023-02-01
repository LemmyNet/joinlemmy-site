# Lemmy v0.17.0 Release (2023-01-31)

_Written by @dessalines and @nutomic, 2023-01-31_

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Major Changes

### Language Tags

Content can now be tagged to indicate the language it is written in. These tags can be used to filter content, so that you only see posts in languages which you actually understand. Instances and communities can also specify which languages are allowed, and prevent posting in other languages.

In the future this will also allow for integrated translation tools.

### Comment trees

Lemmy has changed the way it stores comments, in order to be able to properly limit the comments shown to a maximum depth.

Included are proper comment links (`/comment/id`), where you can see its children, a count of its hidden children, and a _context_ button to view its parents, or the post.

### Featured posts

Admins and mods can now "feature" (this used to be called "sticky" ala reddit) posts to the top of either a community, or the top of the front page. This makes possible announcement and bulletin-type posts.

Special thanks to @makotech for adding this feature.

### Federation

Lemmy users can now be followed. Just visit a user profile from another platform like Mastodon, and click the follow button, then you will receive new posts and comments in the timeline.

Votes are now federated as private. This prevents other platforms from showing who voted on a given post, and it also means that Lemmy now counts votes from Mastodon.

This release also improves compatibility with Pleroma. If you previously had trouble interacting between Pleroma and Lemmy, give it another try.

We've extracted the main federation logic into its own library, [activitypub-federation-rust](https://github.com/LemmyNet/activitypub-federation-rust). It is open source and can be used by other projects to implement Activitypub federation, without having to reinvent the wheel. The library helps with handling HTTP signatures, sending and receiving activities, fetching remote objects and more.

### Other changes

- Admins can now purge content and pictures from the database.
- Mods can _distinguish_ a comment, "stickying" it to the top of a post. Useful for mod messages and announcements.
- Number of new / unread comments are now shown for each post.
- Lemmy now automatically embeds videos from Peertube, Youtube and other sites which provide an embed link via Opengraph attribute.
- You can give your site "taglines", short markdown messages, which are shown at the top of your front page. Thanks to @makotech for adding this.
- You can now report private messages.
- Most settings have been moved from the config file into the database. This means they can be updated much easier, and apply immediately without a restart.
- When setting up a new Lemmy instance, it doesn't create a default community anymore. Instead this needs to be done manually.
- Admins can choose to receive emails for new registration applications.
- An upgrade of diesel to v2.0, our rust -> postgres layer.
- Too many bugfixes to count, they are listed below.

## Upgrade instructions

This upgrade requires a newer version of postgres, which **must be done manually**. Do not try to use Ansible.

`cd` to your lemmy docker directory and run this helper script:

```
sudo wget https://raw.githubusercontent.com/LemmyNet/lemmy/main/scripts/postgres_12_to_15_upgrade.sh
sudo sh postgres_12_to_15_upgrade.sh
```

This script saves a copy of your old database as `12_15.dump.sql`. **Do not delete this file until you've followed all the instructions below, and the upgrade is complete.**

Next, **manually edit** your [lemmy.hjson](https://github.com/LemmyNet/lemmy/blob/main/config/defaults.hjson) to account for a few breaking changes:

- `pictrs_url` is removed, and the pictrs config is now a block. If using docker, it should look like:
  ```
  pictrs: {
      url: "http://pictrs:8080/"
      # api_key: "API_KEY"
  }
  ```
- The `rate_limit`, `federation`, `captcha`, and `slur_filter` blocks should be removed, as they are now in the database, and can be updated through the UI.
- The site setup has removed a few fields.
- See the link above for every setting.

Next, edit your `docker-compose.yml` file to use the newer version of lemmy and lemmy-ui.

The `image` lines should look like:

- `image: dessalines/lemmy:0.17.0` for lemmy
- `image: dessalines/lemmy-ui:0.17.0` for lemmy-ui
- The `lemmy-ui` environment variables have changed, and should now look like:
  ```
    environment:
      - LEMMY_UI_LEMMY_INTERNAL_HOST=lemmy:8536
      - LEMMY_UI_LEMMY_EXTERNAL_HOST={{ domain }}
      - LEMMY_UI_HTTPS=true
  ```
- You can always find the latest version [here](https://github.com/LemmyNet/lemmy-ansible/blob/main/VERSION).
- Ensure that postgres is `postgres:15-alpine` (the upgrade script above should have already set this correctly)

If you're having any problems, your docker-compose.yml should look similar to [the one from the lemmy-ansible repo](https://github.com/LemmyNet/lemmy-ansible/blob/main/templates/docker-compose.yml).

Finally, run `sudo docker-compose up -d`, and wait for lemmy to start up.

_Note_: On production databases with thousands of comments, this upgrade **takes several hours**. If your system has problems upgrading, or you'd like to speed up the upgrade, consider tuning your postgres database using the [instructions here](https://github.com/LemmyNet/lemmy/blob/main/docker/dev/docker-compose.yml#L88). If not, just wait for the database migrations to complete, as this large migration of the `comment` table only ever needs to be run once.

_Note_: If you have any issues upgrading, you can restore your old database using the [backup and restore instructions here](https://join-lemmy.org/docs/en/administration/backup_and_restore.html).

If you need help with the upgrade, you can ask in our [support forum](https://lemmy.ml/c/lemmy_support) or on the [Matrix Chat](https://matrix.to/#/!BZVTUuEiNmRcbFeLeI:matrix.org).

## Support development

We (@dessalines and @nutomic) have been working full-time on Lemmy for almost three years. This is largely thanks to support from [NLnet foundation](https://nlnet.nl/).

If you like using Lemmy, and want to make sure that we will always be available to work full time building it, consider [donating to support its development](https://join-lemmy.org/donate). No one likes recurring donations, but they've proven to be the only way that open-source software like Lemmy can stay independent and alive.

## Changes

### API

- [lemmy-js-client 0.16.4 -> 0.17.0 API changes](https://github.com/LemmyNet/lemmy-js-client/compare/0.16.4...0.17.0-rc.62)

### Config

- [lemmy.hjson](https://github.com/LemmyNet/lemmy/blob/main/config/defaults.hjson)

### Lemmy Server

- Speeding up comment-ltree migration, fixing index creation. Fixes [#2664](https://github.com/LemmyNet/lemmy/issues/2664)
- Add feature to embed pictrs in lemmy binary (fixes [#2627](https://github.com/LemmyNet/lemmy/issues/2627)) ([#2633](https://github.com/LemmyNet/lemmy/issues/2633))
- Update post_aggregates indexes to account for featured_local and featured_community columns. ([#2661](https://github.com/LemmyNet/lemmy/issues/2661))
- Post creation from Mastodon (fixes [#2590](https://github.com/LemmyNet/lemmy/issues/2590)) ([#2651](https://github.com/LemmyNet/lemmy/issues/2651))
- Upgrade to postgres 15. ([#2659](https://github.com/LemmyNet/lemmy/issues/2659))
- Add reddit -> lemmy importer to readme. ([#2662](https://github.com/LemmyNet/lemmy/issues/2662))
- Some script improvements ([#2654](https://github.com/LemmyNet/lemmy/issues/2654))
- Use enum for registration mode setting ([#2604](https://github.com/LemmyNet/lemmy/issues/2604))
- Removing sniptt/monads for lemmy-js-client. ([#2644](https://github.com/LemmyNet/lemmy/issues/2644))
- Fix historical post fetching. Fixes [#2640](https://github.com/LemmyNet/lemmy/issues/2640) ([#2643](https://github.com/LemmyNet/lemmy/issues/2643))
- Adding the go client. ([#2629](https://github.com/LemmyNet/lemmy/issues/2629))
- Point to !lemmy_support for support questions ([#2638](https://github.com/LemmyNet/lemmy/issues/2638))
- Add documentation for using Lemmy API from Rust ([#2639](https://github.com/LemmyNet/lemmy/issues/2639))
- Improve application question check ([#2628](https://github.com/LemmyNet/lemmy/issues/2628))
- Fix user following ([#2623](https://github.com/LemmyNet/lemmy/issues/2623))
- Allow embedding Lemmy, fix setup error ([#2618](https://github.com/LemmyNet/lemmy/issues/2618))
- Fixing missing forms, incorrect user discussion_languages ([#2580](https://github.com/LemmyNet/lemmy/issues/2580))
- Add support for Featured Posts ([#2585](https://github.com/LemmyNet/lemmy/issues/2585))
- Remove federation backwards compatibility with 0.16.x ([#2183](https://github.com/LemmyNet/lemmy/issues/2183))
- Rework websocket ([#2598](https://github.com/LemmyNet/lemmy/issues/2598))
- Add SendActivity trait so that api crates compile in parallel with lemmy_apub
- Move code to generate apub urls into lemmy_api_common
- Builds lemmy_routes in parallel with lemmy_apub
- Merge websocket crate into api_common
- Check user accepted before sending jwt in password reset (fixes [#2591](https://github.com/LemmyNet/lemmy/issues/2591)) ([#2597](https://github.com/LemmyNet/lemmy/issues/2597))
- Relax honeypot check (fixes [#2595](https://github.com/LemmyNet/lemmy/issues/2595)) ([#2596](https://github.com/LemmyNet/lemmy/issues/2596))
- Use audience field to federate items in groups (fixes [#2464](https://github.com/LemmyNet/lemmy/issues/2464)) ([#2584](https://github.com/LemmyNet/lemmy/issues/2584))
- Federate group moderators using attributedTo field ([#2588](https://github.com/LemmyNet/lemmy/issues/2588))
- Set cargo home in ci to avoid redownloading deps between steps ([#2587](https://github.com/LemmyNet/lemmy/issues/2587))
- Add some more clippy lints ([#2586](https://github.com/LemmyNet/lemmy/issues/2586))
- Use release docker image for nightly build ([#2583](https://github.com/LemmyNet/lemmy/issues/2583))
- Implement federated user following (fixes [#752](https://github.com/LemmyNet/lemmy/issues/752)) ([#2577](https://github.com/LemmyNet/lemmy/issues/2577))
- Upgrade activitypub_federation to 0.3.4 ([#2581](https://github.com/LemmyNet/lemmy/issues/2581))
- Upgrade activitypub_federation crate to 0.3.3 (ref [#2511](https://github.com/LemmyNet/lemmy/issues/2511)) ([#2578](https://github.com/LemmyNet/lemmy/issues/2578))
- Remove federation settings, rely on sensible defaults instead ([#2574](https://github.com/LemmyNet/lemmy/issues/2574))
- Fix clippy lints. ([#2572](https://github.com/LemmyNet/lemmy/issues/2572))
- Add support for Taglines ([#2548](https://github.com/LemmyNet/lemmy/issues/2548))
- Various pedantic clippy fixes ([#2568](https://github.com/LemmyNet/lemmy/issues/2568))
- Sort vecs before assert to avoid random test failures ([#2569](https://github.com/LemmyNet/lemmy/issues/2569))
- Display build status badge from drone.join-lemmy.org ([#2564](https://github.com/LemmyNet/lemmy/issues/2564))
- Specify dependencies and metadata for entire workspace ([#2565](https://github.com/LemmyNet/lemmy/issues/2565))
- Use enum_delegate crate ([#2554](https://github.com/LemmyNet/lemmy/issues/2554))
- Live reload settings (fixes [#2508](https://github.com/LemmyNet/lemmy/issues/2508)) ([#2543](https://github.com/LemmyNet/lemmy/issues/2543))
- Fix activity list test ([#2562](https://github.com/LemmyNet/lemmy/issues/2562))
- When announcing incoming activities, keep extra fields ([#2550](https://github.com/LemmyNet/lemmy/issues/2550))
- Mobilizon federation ([#2544](https://github.com/LemmyNet/lemmy/issues/2544))
- Update doku dependency for easier formatting of defaults.hjson ([#2553](https://github.com/LemmyNet/lemmy/issues/2553))
- Translated README.md to Chinese ([#2549](https://github.com/LemmyNet/lemmy/issues/2549))
- Add diesel_async, get rid of blocking function ([#2510](https://github.com/LemmyNet/lemmy/issues/2510))
- Use urlencoding for db url params (fixes [#2532](https://github.com/LemmyNet/lemmy/issues/2532)) ([#2537](https://github.com/LemmyNet/lemmy/issues/2537))
- Dont serve apub json for removed objects (ref [#2522](https://github.com/LemmyNet/lemmy/issues/2522)) ([#2538](https://github.com/LemmyNet/lemmy/issues/2538))
- Fix password length check ([#2536](https://github.com/LemmyNet/lemmy/issues/2536))
- Remove explicit panic from db connection code (fixes [#2533](https://github.com/LemmyNet/lemmy/issues/2533)) ([#2535](https://github.com/LemmyNet/lemmy/issues/2535))
- Send error message when rate limit is reached ([#2527](https://github.com/LemmyNet/lemmy/issues/2527))
- Mark own private messages as read in api (fixes [#2484](https://github.com/LemmyNet/lemmy/issues/2484)) ([#2531](https://github.com/LemmyNet/lemmy/issues/2531))
- Mark objects as not deleted when received via apub (fixes [#2507](https://github.com/LemmyNet/lemmy/issues/2507)) ([#2528](https://github.com/LemmyNet/lemmy/issues/2528))
- Group imports dess ([#2526](https://github.com/LemmyNet/lemmy/issues/2526))
- Fix invalid config in docker/prod (fixes [#2520](https://github.com/LemmyNet/lemmy/issues/2520)) ([#2524](https://github.com/LemmyNet/lemmy/issues/2524))
- Fix local site images. ([#2519](https://github.com/LemmyNet/lemmy/issues/2519))
- Fix 2455: Check auth for pictrs when instance is private. ([#2477](https://github.com/LemmyNet/lemmy/issues/2477))
- Fix limit_languages to operate on correct instance (fixes [#2496](https://github.com/LemmyNet/lemmy/issues/2496)) ([#2518](https://github.com/LemmyNet/lemmy/issues/2518))
- Image improvements ([#2513](https://github.com/LemmyNet/lemmy/issues/2513))
- Make verify apub url function async ([#2514](https://github.com/LemmyNet/lemmy/issues/2514))
- Moving settings to Database. ([#2492](https://github.com/LemmyNet/lemmy/issues/2492))
- Enable lto, strip symbols via cargo.toml ([#2512](https://github.com/LemmyNet/lemmy/issues/2512))
- Fix docker dev build ([#2509](https://github.com/LemmyNet/lemmy/issues/2509))
- Federate votes as private ([#2501](https://github.com/LemmyNet/lemmy/issues/2501))
- Dont try to send activities if federation is disabled (fixes [#2499](https://github.com/LemmyNet/lemmy/issues/2499)) ([#2500](https://github.com/LemmyNet/lemmy/issues/2500))
- Return empty vec when reading all languages (fixes [#2495](https://github.com/LemmyNet/lemmy/issues/2495)) ([#2497](https://github.com/LemmyNet/lemmy/issues/2497))
- Update clippy to use Rust 1.64 ([#2498](https://github.com/LemmyNet/lemmy/issues/2498))
- Only allow authenticated users to fetch remote objects ([#2493](https://github.com/LemmyNet/lemmy/issues/2493))
- More real-world prod config, separate lemmy config ([#2487](https://github.com/LemmyNet/lemmy/issues/2487))
- Fix check for federated mod actions ([#2489](https://github.com/LemmyNet/lemmy/issues/2489))
- Make docker-compose more clear and explicit ([#2469](https://github.com/LemmyNet/lemmy/issues/2469))
- implement language tags for site/community in db and api ([#2434](https://github.com/LemmyNet/lemmy/issues/2434))
- Change description in readme ([#2481](https://github.com/LemmyNet/lemmy/issues/2481))
- Use compat mode when signing outgoing activities (fixes [#1984](https://github.com/LemmyNet/lemmy/issues/1984)) ([#2473](https://github.com/LemmyNet/lemmy/issues/2473))
- Check to make sure comment isnt deleted / removed for unread count. ([#2472](https://github.com/LemmyNet/lemmy/issues/2472))
- Dont show deleted users or communities on profile page. ([#2450](https://github.com/LemmyNet/lemmy/issues/2450))
- Adding email admins for new applications. Fixes [#2271](https://github.com/LemmyNet/lemmy/issues/2271) ([#2390](https://github.com/LemmyNet/lemmy/issues/2390))
- Showing # of unread comments for posts. Fixes [#2134](https://github.com/LemmyNet/lemmy/issues/2134) ([#2393](https://github.com/LemmyNet/lemmy/issues/2393))
- Convert emails to lowercase (fixes [#2462](https://github.com/LemmyNet/lemmy/issues/2462)) ([#2463](https://github.com/LemmyNet/lemmy/issues/2463))
- Remove unnecessary show_deleted_and_removed comments for a profile. ([#2458](https://github.com/LemmyNet/lemmy/issues/2458))
- Remove pointless language joins. ([#2451](https://github.com/LemmyNet/lemmy/issues/2451))
- Fix rate limit error messages. Fixes [#2428](https://github.com/LemmyNet/lemmy/issues/2428) ([#2449](https://github.com/LemmyNet/lemmy/issues/2449))
- Fix missing local user from post queries. ([#2447](https://github.com/LemmyNet/lemmy/issues/2447))
- Diesel 2.0.0 upgrade ([#2452](https://github.com/LemmyNet/lemmy/issues/2452))
- Allow filtering out of deleted and removed comments when getting person details ([#2446](https://github.com/LemmyNet/lemmy/issues/2446))
- Implement reports for private messages ([#2433](https://github.com/LemmyNet/lemmy/issues/2433))
- Check for slurs in account creation. ([#2443](https://github.com/LemmyNet/lemmy/issues/2443))
- The language id is crucial for front ends. ([#2437](https://github.com/LemmyNet/lemmy/issues/2437))
- Update docker version to 0.16.6. Fixes [#2435](https://github.com/LemmyNet/lemmy/issues/2435) ([#2438](https://github.com/LemmyNet/lemmy/issues/2438))
- Adding job to drop phantom ccnew indexes. Fixes [#2431](https://github.com/LemmyNet/lemmy/issues/2431) ([#2432](https://github.com/LemmyNet/lemmy/issues/2432))
- Don't search for community descriptions, search for user display_name. ([#2430](https://github.com/LemmyNet/lemmy/issues/2430))
- Increase default search rate limit. ([#2424](https://github.com/LemmyNet/lemmy/issues/2424))
- fix clippy
- dont set default user languages in api code (already done in db)
- dont test with all features
- clippy fixes
- api changes for comment language tagging
- add test for comment view languages
- fix tests
- Add language tags for comments
- Pass LocalUser to PostQuery etc, instead of separate params ([#2413](https://github.com/LemmyNet/lemmy/issues/2413))
- Tag posts and comments with language (fixes [#440](https://github.com/LemmyNet/lemmy/issues/440)) ([#2269](https://github.com/LemmyNet/lemmy/issues/2269))
- Rejected federated pm from blocked users (fixes [#2398](https://github.com/LemmyNet/lemmy/issues/2398)) ([#2408](https://github.com/LemmyNet/lemmy/issues/2408))
- Adding distinguish comment. Fixes [#2002](https://github.com/LemmyNet/lemmy/issues/2002) ([#2391](https://github.com/LemmyNet/lemmy/issues/2391))
- Fix pictrs routing ([#2407](https://github.com/LemmyNet/lemmy/issues/2407))
- Add postgres auto-explain for dev testing. ([#2399](https://github.com/LemmyNet/lemmy/issues/2399))
- Add Modlog Filters ([#2313](https://github.com/LemmyNet/lemmy/issues/2313))
- Accept Image objects in attachments ([#2394](https://github.com/LemmyNet/lemmy/issues/2394))
- Tweaking postgres upgrade script ([#2389](https://github.com/LemmyNet/lemmy/issues/2389))
- Use typed-builder crate for queries ([#2379](https://github.com/LemmyNet/lemmy/issues/2379))
- Use doku release version (ref [#2343](https://github.com/LemmyNet/lemmy/issues/2343)) ([#2386](https://github.com/LemmyNet/lemmy/issues/2386))
- First pass at adding comment trees. ([#2362](https://github.com/LemmyNet/lemmy/issues/2362))
- Update apub examples to remove `to` field (ref [#2380](https://github.com/LemmyNet/lemmy/issues/2380)) ([#2382](https://github.com/LemmyNet/lemmy/issues/2382))
- Handle Like, Undo/Like activities from Mastodon, add tests (fixes [#2378](https://github.com/LemmyNet/lemmy/issues/2378)) ([#2380](https://github.com/LemmyNet/lemmy/issues/2380))
- Fix a few form options for diesel. Fixes [#2287](https://github.com/LemmyNet/lemmy/issues/2287) ([#2376](https://github.com/LemmyNet/lemmy/issues/2376))
- Remove docker/pleroma/ folder ([#2381](https://github.com/LemmyNet/lemmy/issues/2381))
- Remove listing type community. Fixes [#2361](https://github.com/LemmyNet/lemmy/issues/2361) ([#2377](https://github.com/LemmyNet/lemmy/issues/2377))
- Dont allow login if account is banned or deleted (fixes [#2372](https://github.com/LemmyNet/lemmy/issues/2372)) ([#2374](https://github.com/LemmyNet/lemmy/issues/2374))
- Send websocket message on accepted follow. Fixes [#2369](https://github.com/LemmyNet/lemmy/issues/2369) ([#2375](https://github.com/LemmyNet/lemmy/issues/2375))
- Fix panics in search_by_apub_id() (fixes [#2371](https://github.com/LemmyNet/lemmy/issues/2371)) ([#2373](https://github.com/LemmyNet/lemmy/issues/2373))
- Fix follow being stuck as pending after accept ([#2366](https://github.com/LemmyNet/lemmy/issues/2366))
- Adding 0.16.6 release
- Change config pictrs key name ([#2360](https://github.com/LemmyNet/lemmy/issues/2360))
- Config changes, remove unused image purge function ([#2343](https://github.com/LemmyNet/lemmy/issues/2343))
- Fix problem where actors can have empty public key (fixes [#2347](https://github.com/LemmyNet/lemmy/issues/2347)) ([#2348](https://github.com/LemmyNet/lemmy/issues/2348))
- remove parking_lot ([#2350](https://github.com/LemmyNet/lemmy/issues/2350))
- Revert "Use correct url for activitystreams protocol context ([#2326](https://github.com/LemmyNet/lemmy/issues/2326))" ([#2351](https://github.com/LemmyNet/lemmy/issues/2351))
- Adding check for requests with no id or name, adding max limit. ([#2265](https://github.com/LemmyNet/lemmy/issues/2265))
- Dont allow blocking admin ([#2340](https://github.com/LemmyNet/lemmy/issues/2340))
- Fix wrong clippy warning in ci ([#2339](https://github.com/LemmyNet/lemmy/issues/2339))
- Be more explicit about returning deleted actors or not ([#2335](https://github.com/LemmyNet/lemmy/issues/2335))
- Specify minimum Rust version 1.57 (fixes [#2333](https://github.com/LemmyNet/lemmy/issues/2333)) ([#2334](https://github.com/LemmyNet/lemmy/issues/2334))
- Remove update and read site config. Fixes [#2306](https://github.com/LemmyNet/lemmy/issues/2306) ([#2329](https://github.com/LemmyNet/lemmy/issues/2329))
- Don't create or initially follow a default community. Fixes [#2317](https://github.com/LemmyNet/lemmy/issues/2317) ([#2328](https://github.com/LemmyNet/lemmy/issues/2328))
- Increase RSS fetch limit to 20. Fixes [#2319](https://github.com/LemmyNet/lemmy/issues/2319) ([#2327](https://github.com/LemmyNet/lemmy/issues/2327))
- Expose pending 2 ([#2282](https://github.com/LemmyNet/lemmy/issues/2282))
- Use correct url for activitystreams protocol context ([#2326](https://github.com/LemmyNet/lemmy/issues/2326))
- Move setting http_fetch_retry_limit into federation block ([#2314](https://github.com/LemmyNet/lemmy/issues/2314))
- Fix length of post_report.original_post_name db field (fixes [#2311](https://github.com/LemmyNet/lemmy/issues/2311)) ([#2315](https://github.com/LemmyNet/lemmy/issues/2315))
- Adding admin purging of DB items and pictures. [#904](https://github.com/LemmyNet/lemmy/issues/904) [#1331](https://github.com/LemmyNet/lemmy/issues/1331) ([#1809](https://github.com/LemmyNet/lemmy/issues/1809))
- Fix: Use correctly parseable JSON-LD context ([#2299](https://github.com/LemmyNet/lemmy/issues/2299))
- Fix lemmy version in prod docker-compose.yml ([#2304](https://github.com/LemmyNet/lemmy/issues/2304))
- Upgrade activitypub_federation to 0.2.0, add setting federation.debug ([#2300](https://github.com/LemmyNet/lemmy/issues/2300))
- Remove unused setup config vars ([#2302](https://github.com/LemmyNet/lemmy/issues/2302))
- Add pub use for db crates in api_common ([#2305](https://github.com/LemmyNet/lemmy/issues/2305))
- Add link to Matrix chat in readme ([#2303](https://github.com/LemmyNet/lemmy/issues/2303))
- Accept private like ([#1968](https://github.com/LemmyNet/lemmy/issues/1968)) ([#2301](https://github.com/LemmyNet/lemmy/issues/2301))
- Move different features drone check to below defaults.hjson check. ([#2296](https://github.com/LemmyNet/lemmy/issues/2296))
- Bump lettre to 0.10.0-rc.7 ([#2297](https://github.com/LemmyNet/lemmy/issues/2297))
- Remove unused cargo.toml files ([#2293](https://github.com/LemmyNet/lemmy/issues/2293))
- Forbid outgoing requests in activitypub tests (fixes [#2289](https://github.com/LemmyNet/lemmy/issues/2289)) ([#2294](https://github.com/LemmyNet/lemmy/issues/2294))
- Embed Peertube videos ([#2261](https://github.com/LemmyNet/lemmy/issues/2261))
- Run cargo check for each crate with different features (ref [#2284](https://github.com/LemmyNet/lemmy/issues/2284)) ([#2292](https://github.com/LemmyNet/lemmy/issues/2292))
- Remove 0.15 federation compat code ([#2131](https://github.com/LemmyNet/lemmy/issues/2131))
- Extract Activitypub logic into separate library ([#2288](https://github.com/LemmyNet/lemmy/issues/2288))

### Lemmy UI

- Fixing requireapplication string. ([#895](https://github.com/LemmyNet/lemmy-ui/issues/895))
- Fixing PWA install. Fixes [#822](https://github.com/LemmyNet/lemmy-ui/issues/822) ([#893](https://github.com/LemmyNet/lemmy-ui/issues/893))
- Removing monads. Fixes [#884](https://github.com/LemmyNet/lemmy-ui/issues/884) ([#886](https://github.com/LemmyNet/lemmy-ui/issues/886))
- Sanitize article html. Fixes [#882](https://github.com/LemmyNet/lemmy-ui/issues/882) ([#883](https://github.com/LemmyNet/lemmy-ui/issues/883))
- Add `id` to `App` component ([#880](https://github.com/LemmyNet/lemmy-ui/issues/880))
- Adding Community Language fixes. [#783](https://github.com/LemmyNet/lemmy-ui/issues/783) ([#868](https://github.com/LemmyNet/lemmy-ui/issues/868))
- Add FeaturedPost Support ([#873](https://github.com/LemmyNet/lemmy-ui/issues/873))
- Fix csp header for svgs in firefox. Fixes [#869](https://github.com/LemmyNet/lemmy-ui/issues/869) ([#870](https://github.com/LemmyNet/lemmy-ui/issues/870))
- Remove federation strict_allowlist and retry_count. ([#867](https://github.com/LemmyNet/lemmy-ui/issues/867))
- Add Taglines support ([#854](https://github.com/LemmyNet/lemmy-ui/issues/854))
- Fix wrong comment link. Fixes [#714](https://github.com/LemmyNet/lemmy-ui/issues/714) ([#865](https://github.com/LemmyNet/lemmy-ui/issues/865))
- Dont render images in tippy. Fixes [#776](https://github.com/LemmyNet/lemmy-ui/issues/776) ([#864](https://github.com/LemmyNet/lemmy-ui/issues/864))
- Move symbols to its own cacheable file. Fixes [#809](https://github.com/LemmyNet/lemmy-ui/issues/809) ([#862](https://github.com/LemmyNet/lemmy-ui/issues/862))
- Hide post report images. Fixes [#824](https://github.com/LemmyNet/lemmy-ui/issues/824) ([#861](https://github.com/LemmyNet/lemmy-ui/issues/861))
- Add inline markdown rendering for post titles. Fixes [#827](https://github.com/LemmyNet/lemmy-ui/issues/827) ([#860](https://github.com/LemmyNet/lemmy-ui/issues/860))
- Show deleted on profile page. Fixes [#834](https://github.com/LemmyNet/lemmy-ui/issues/834) ([#859](https://github.com/LemmyNet/lemmy-ui/issues/859))
- Make sure user is logged in for site creation. Fixes [#838](https://github.com/LemmyNet/lemmy-ui/issues/838) ([#858](https://github.com/LemmyNet/lemmy-ui/issues/858))
- Fix missing report shield. Fixes [#842](https://github.com/LemmyNet/lemmy-ui/issues/842) ([#855](https://github.com/LemmyNet/lemmy-ui/issues/855))
- Increase markdown field char limit to 50k. Fixes [#849](https://github.com/LemmyNet/lemmy-ui/issues/849) ([#850](https://github.com/LemmyNet/lemmy-ui/issues/850))
- Adding new site setup fields. ([#840](https://github.com/LemmyNet/lemmy-ui/issues/840))
- Fix workaround for broken logout ([#836](https://github.com/LemmyNet/lemmy-ui/issues/836))
- Strip html from og descriptions. Fixes [#830](https://github.com/LemmyNet/lemmy-ui/issues/830) ([#831](https://github.com/LemmyNet/lemmy-ui/issues/831))
- Cleanup docker builds ([#829](https://github.com/LemmyNet/lemmy-ui/issues/829))
- Fix admin default listing type. Fixes [#797](https://github.com/LemmyNet/lemmy-ui/issues/797) ([#818](https://github.com/LemmyNet/lemmy-ui/issues/818))
- Search button and input style fixes ([#825](https://github.com/LemmyNet/lemmy-ui/issues/825))
- Support new video embed api format (fixes [#709](https://github.com/LemmyNet/lemmy-ui/issues/709)) ([#817](https://github.com/LemmyNet/lemmy-ui/issues/817))
- Change for container divs to container-lg ([#813](https://github.com/LemmyNet/lemmy-ui/issues/813))
- Remove newline, save space for toast message.
- Avoid browser warning about leaving page, handle delete image fail and add user filenames to messages.
- Avoid browser warning about leaving page, handle delete image fail.
- Adding private message reporting. Fixes [#782](https://github.com/LemmyNet/lemmy-ui/issues/782) ([#806](https://github.com/LemmyNet/lemmy-ui/issues/806))
- Adding the email_admins for new application config. ([#742](https://github.com/LemmyNet/lemmy-ui/issues/742))
- Adding new unread comments. ([#749](https://github.com/LemmyNet/lemmy-ui/issues/749))
- Fix broken profile page, and missing sidebars. ([#795](https://github.com/LemmyNet/lemmy-ui/issues/795))
- Adding a loading indicator for post community searching. Fixes [#692](https://github.com/LemmyNet/lemmy-ui/issues/692) ([#794](https://github.com/LemmyNet/lemmy-ui/issues/794))
- Fix missing initial load of discussion languages. ([#793](https://github.com/LemmyNet/lemmy-ui/issues/793))
- Fix posts pushed from blocked users/comms. Fixes [#697](https://github.com/LemmyNet/lemmy-ui/issues/697) ([#792](https://github.com/LemmyNet/lemmy-ui/issues/792))
- Adding post and comment language tagging. Fixes [#771](https://github.com/LemmyNet/lemmy-ui/issues/771) ([#781](https://github.com/LemmyNet/lemmy-ui/issues/781))
- Hide create community ([#787](https://github.com/LemmyNet/lemmy-ui/issues/787))
- Increase fetch limit for user and community searches. Fixes [#756](https://github.com/LemmyNet/lemmy-ui/issues/756) ([#773](https://github.com/LemmyNet/lemmy-ui/issues/773))
- Fix private instance setting. Fixes [#769](https://github.com/LemmyNet/lemmy-ui/issues/769) ([#786](https://github.com/LemmyNet/lemmy-ui/issues/786))
- Hide extra comment and post functionality from search page. Fixes [#752](https://github.com/LemmyNet/lemmy-ui/issues/752) ([#788](https://github.com/LemmyNet/lemmy-ui/issues/788))
- Show create post even if not subscribed. Fixes [#768](https://github.com/LemmyNet/lemmy-ui/issues/768) ([#789](https://github.com/LemmyNet/lemmy-ui/issues/789))
- Cantarell for darkly/darkly-red. Fixes [#779](https://github.com/LemmyNet/lemmy-ui/issues/779) ([#784](https://github.com/LemmyNet/lemmy-ui/issues/784))
- Adding mod / admin distinguish. ([#744](https://github.com/LemmyNet/lemmy-ui/issues/744))
- Disable CSP when in debug mode. ([#743](https://github.com/LemmyNet/lemmy-ui/issues/743))
- Reduce search minLength to 1. Fixes [#750](https://github.com/LemmyNet/lemmy-ui/issues/750) ([#751](https://github.com/LemmyNet/lemmy-ui/issues/751))
- Add support for filtering mod logs
- Documenting and changing a few env vars. Fixes [#661](https://github.com/LemmyNet/lemmy-ui/issues/661) ([#739](https://github.com/LemmyNet/lemmy-ui/issues/739))
- Fixing post_view glitch. Fixes [#740](https://github.com/LemmyNet/lemmy-ui/issues/740) ([#741](https://github.com/LemmyNet/lemmy-ui/issues/741))
- Change CSP rule for connect-src (websocket) to wildcard (fixes [#730](https://github.com/LemmyNet/lemmy-ui/issues/730)) ([#737](https://github.com/LemmyNet/lemmy-ui/issues/737))
- Comment Tree paging ([#726](https://github.com/LemmyNet/lemmy-ui/issues/726))
- Adding block from community sidebar. Fixes [#690](https://github.com/LemmyNet/lemmy-ui/issues/690) ([#716](https://github.com/LemmyNet/lemmy-ui/issues/716))
- Fix suggested post title html. Fixes [#691](https://github.com/LemmyNet/lemmy-ui/issues/691) ([#717](https://github.com/LemmyNet/lemmy-ui/issues/717))
- Fix missing deny button. Fixes [#723](https://github.com/LemmyNet/lemmy-ui/issues/723) ([#728](https://github.com/LemmyNet/lemmy-ui/issues/728))
- Fix community filtering. ([#729](https://github.com/LemmyNet/lemmy-ui/issues/729))
- use zh-TW for language code, instead of zh_Hant. ([#725](https://github.com/LemmyNet/lemmy-ui/issues/725))
- Fix Notification browser fetch
- Forgot to type a few Searches. Fixes [#718](https://github.com/LemmyNet/lemmy-ui/issues/718) ([#722](https://github.com/LemmyNet/lemmy-ui/issues/722))
- Fixing linkify GC crash. ([#715](https://github.com/LemmyNet/lemmy-ui/issues/715))
- New communities fetch limit is 50. ([#711](https://github.com/LemmyNet/lemmy-ui/issues/711))
- Clicking "subscribe pending" button performs unsubscribe (fixes [#705](https://github.com/LemmyNet/lemmy-ui/issues/705)) ([#706](https://github.com/LemmyNet/lemmy-ui/issues/706))
- Fix site setup and login. Fixes [#699](https://github.com/LemmyNet/lemmy-ui/issues/699) ([#702](https://github.com/LemmyNet/lemmy-ui/issues/702))
- Adding purging of comments, posts, communities, and users. ([#459](https://github.com/LemmyNet/lemmy-ui/issues/459))
- Removing save and read config hjson. Fixes [#695](https://github.com/LemmyNet/lemmy-ui/issues/695) ([#696](https://github.com/LemmyNet/lemmy-ui/issues/696))
- Expose pending 2 ([#662](https://github.com/LemmyNet/lemmy-ui/issues/662))
- Adding option types 2 ([#689](https://github.com/LemmyNet/lemmy-ui/issues/689))
- Fix NPE during new site startup ([#677](https://github.com/LemmyNet/lemmy-ui/issues/677))
- Fixing CSP for iOS devices. Fixes [#669](https://github.com/LemmyNet/lemmy-ui/issues/669) ([#678](https://github.com/LemmyNet/lemmy-ui/issues/678))
- Fix issue with new notification trying to do a fetch.
