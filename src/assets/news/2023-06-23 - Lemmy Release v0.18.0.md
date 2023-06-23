# Lemmy v0.18 Release (2023-06-23)

_Written by @dessalines and @nutomic, 2023-06-23_

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Major Changes

### HTTP API instead of Websocket

Until now Lemmy-UI used websocket for all API requests. This has [many disadvantages](https://github.com/LemmyNet/lemmy/issues/2841#issuecomment-1535469357), like making the code harder to maintain, and causing live updates to the site which many users dislike. Most importantly, it requires keeping a connection open between server and client at all times, which causes increased load and makes scaling difficult. That's why we decided to rip out websocket entirely, and switch to HTTP instead. This change was made much more urgent by the sudden influx of new users. [@CannotSleep420](https://lemmygrad.ml/u/CannotSleep420) and [@dessalines](https://lemmy.ml/u/dessalines) have been working hard for the past weeks to implement this change in lemmy-ui.

HTTP on its own is already more lightweight than websocket. Additionally it also allows for caching of server responses which can decrease load on the database. Here is an [experimental nginx config](https://github.com/LemmyNet/lemmy-ansible/pull/75) which enables response caching. Note that Lemmy doesn't send any cache-control headers yet, so there is a chance that private data gets cached and served to other users. Test carefully and use at your own risk.

### Two-Factor Authentication

New support for two-factor authentication. Use an app like [andOTP](https://f-droid.org/es/packages/org.shadowice.flocke.andotp/) or [Authenticator Pro](https://f-droid.org/packages/me.jmh.authenticatorpro/) to store a secret for your account. This secret needs to be entered every time you login. It ensures that an attacker can't access your account with the password alone.

### Custom Emojis

Instance admins can add different images as emojis which can be referenced by users when posting.

### Other changes

#### Progressive Web App

Lemmy's web client can now be installed on browsers that support PWAs, both on desktop and mobile. It will use an instance's icon and name for the app if they are set, making it look like a given instance is an app.

**Note for desktop Firefox users**: the desktop version of Firefox does not have built in support for PWAs. If you would like to use a Lemmy instance as a PWA, use [use this extension](https://addons.mozilla.org/en-US/firefox/addon/pwas-for-firefox/).

#### Error Pages

Lemmy's web client now has error pages that include resources to use if the problem persists. This should be much less jarring for users than displaying a white screen with the text "404 _error message here_".

#### Route Changes

Pages that took arguments in the route now take query parameters instead. For example, a link to lemmy.ml's home page with a few options used to look like this:

```
https://lemmy.ml/home/data_type/Post/listing_type/All/sort/Active/page/1
```

The new route would look like this:

```
https://lemmy.ml?listingType=All
```

Note that you now only have to specify parameters you want instead of all of them.

#### Searchable select redesign

The searchable selects, such as those used on the search page, have a new look and feel. No more inexplicable green selects when using the lightly themes!

#### Share button

Posts on the web client now have a share button on supported browsers. This can be used to share posts to other applications quickly and easily.

#### Lemmy-UI Overall look and feel

lemmy-ui is now upgraded to bootstrap 5, and every component is now much cleaner.

Special thanks to [sleepless](https://github.com/SleeplessOne1917), [alectrocute](https://github.com/alectrocute), [jsit](https://github.com/jsit), and many others for their great work on improving and re-organizing lemmy-ui.

#### Database optimizations

Special thanks to [johanndt](https://github.com/johanndt), for suggesting improvements to Lemmy's database queries. Some of these suggestions have already been implemented, and more are on the way.

Query speed is Lemmy's main performance bottleneck, so we really appreciate any help database experts can provide.

#### Captchas

Captchas are not available in this version, as they need to be reimplemented in a different way. They will be back in 0.18.1, so wait with upgrading if you rely on them.

## Upgrade instructions

The installation instructions have been slightly updated. However there are no breaking changes, other than removing websocket.

Follow the upgrade instructions for [ansible](https://github.com/LemmyNet/lemmy-ansible#upgrading) or [docker](https://join-lemmy.org/docs/en/administration/install_docker.html#updating).

If you need help with the upgrade, you can ask in our [support forum](https://lemmy.ml/c/lemmy_support) or on the [Matrix Chat](https://matrix.to/#/!OwmdVYiZSXrXbtCNLw:matrix.org).

## Support development

We (@dessalines and @nutomic) have been working full-time on Lemmy for almost three years. This is largely thanks to support from [NLnet foundation](https://nlnet.nl/).

If you like using Lemmy, and want to make sure that we will always be available to work full time building it, consider [donating to support its development](https://join-lemmy.org/donate). No one likes recurring donations, but they've proven to be the only way that open-source software like Lemmy can stay independent and alive.

## Changes

### API

- Our HTTP API docs are at https://join-lemmy.org/api/
  - These are now auto-generated directly from our rust type definitions, using [ts-rs](https://github.com/Aleph-Alpha/ts-rs).
  - [A comparison from the last release](https://github.com/LemmyNet/lemmy-js-client/compare/0.17.0-rc.1...0.18.0-rc.1)
- There are two breaking changes since the last release:
  - [GetSite.taglines](https://join-lemmy.org/api/interfaces/GetSiteResponse.html#taglines) is now required, and is an empty array.
  - `SortType` and `ListingType` are now numbered enums, rather than strings in some places, and numbers in others.

### Config

- No changes, but you can see the current config options [here.](https://github.com/LemmyNet/lemmy/blob/main/config/defaults.hjson)

### Lemmy Server

- Speedup cargo check in CI ([#3239](https://github.com/LemmyNet/Lemmy/issues/3239))
- Correct error messages if user registers with taken user/email ([#3093](https://github.com/LemmyNet/Lemmy/issues/3093))
- Fixing cross_post duplicates. Fixes [#3233](https://github.com/LemmyNet/Lemmy/issues/3233) ([#3234](https://github.com/LemmyNet/Lemmy/issues/3234))
- Add test to check reading and listing posts return my_vote ([#3215](https://github.com/LemmyNet/Lemmy/issues/3215))
- Reduce memory usage of rate limiting ([#3111](https://github.com/LemmyNet/Lemmy/issues/3111))
- Adding current domain from settings to CORs. ([#3231](https://github.com/LemmyNet/Lemmy/issues/3231))
- remove debugging println ([#3227](https://github.com/LemmyNet/Lemmy/issues/3227))
- Fixing comment_view unit tests. ([#3224](https://github.com/LemmyNet/Lemmy/issues/3224))
- Fix parameter ordering for new_report_subject string ([#3210](https://github.com/LemmyNet/Lemmy/issues/3210))
- Move cors default to source code ([#3219](https://github.com/LemmyNet/Lemmy/issues/3219))
- Fixing tag deploys. ([#3216](https://github.com/LemmyNet/Lemmy/issues/3216))
- Feature add hours as sorting options backend ([#3161](https://github.com/LemmyNet/Lemmy/issues/3161))
- Don't check verified email when an admin logs in ([#3209](https://github.com/LemmyNet/Lemmy/issues/3209))
- fix: add CORS origin environment variable ([#3191](https://github.com/LemmyNet/Lemmy/issues/3191))
- make embedded pict-rs port configurable ([#3201](https://github.com/LemmyNet/Lemmy/issues/3201))
- Move connection creation into scheduler. ([#3120](https://github.com/LemmyNet/Lemmy/issues/3120))
- Calculate initial hot_rank and hot_rank_active for posts and comments from other instances ([#3131](https://github.com/LemmyNet/Lemmy/issues/3131))
- Changed github issue template to align logically with the question asked ([#3135](https://github.com/LemmyNet/Lemmy/issues/3135))
- Update README.md ([#3137](https://github.com/LemmyNet/Lemmy/issues/3137))
- Remove e-mail verification success e-mails ([#3124](https://github.com/LemmyNet/Lemmy/issues/3124))
- Fix Hidden communities showing in community list ([#3094](https://github.com/LemmyNet/Lemmy/issues/3094))
- Update all dependencies ([#3091](https://github.com/LemmyNet/Lemmy/issues/3091))
- Prevent making an instance private if federation is enabled. ([#3074](https://github.com/LemmyNet/Lemmy/issues/3074))
- Handle scheduled task errors ([#3090](https://github.com/LemmyNet/Lemmy/issues/3090))
- Fix unapproved users being able to log in after registration mode set to closed. ([#3096](https://github.com/LemmyNet/Lemmy/issues/3096))
- Link tafkars in readme ([#3087](https://github.com/LemmyNet/Lemmy/issues/3087))
- doc: Added pythorhead library in readme ([#3114](https://github.com/LemmyNet/Lemmy/issues/3114))
- Only create ltree postgres extension in migration if doesn't already exist ([#3092](https://github.com/LemmyNet/Lemmy/issues/3092))
- add issue template yml from lemmy-ui ([#3086](https://github.com/LemmyNet/Lemmy/issues/3086))
- Fix Issue [#3075](https://github.com/LemmyNet/Lemmy/issues/3075) by using None for local fields instead of Some(false) ([#3088](https://github.com/LemmyNet/Lemmy/issues/3088))
- stop requiring superuser to run migrations ([#3002](https://github.com/LemmyNet/Lemmy/issues/3002))
- Fixes [#1884](https://github.com/LemmyNet/Lemmy/issues/1884) - Support Spoiler Tags ([#3018](https://github.com/LemmyNet/Lemmy/issues/3018))
- Fix compilation
- Align default DB password with documentation ([#3068](https://github.com/LemmyNet/Lemmy/issues/3068))
- Update RSS url ([#3053](https://github.com/LemmyNet/Lemmy/issues/3053))
- Docker yaml anchors and docker logs ([#3027](https://github.com/LemmyNet/Lemmy/issues/3027))
- Fix ports used by docker ([#3012](https://github.com/LemmyNet/Lemmy/issues/3012))
- Add limit and pagination to feeds ([#2980](https://github.com/LemmyNet/Lemmy/issues/2980))
- Upgrade activitypub-federation to 0.4.1 ([#3039](https://github.com/LemmyNet/Lemmy/issues/3039))
- Adding Lemmy-Swift-Client to README.md ([#3026](https://github.com/LemmyNet/Lemmy/issues/3026))
- use usize::MAX for line wrap length, since lettre does it for us ([#3034](https://github.com/LemmyNet/Lemmy/issues/3034))
- update doku ([#3003](https://github.com/LemmyNet/Lemmy/issues/3003))
- Fix contributing link ([#3015](https://github.com/LemmyNet/Lemmy/issues/3015))
- Better issue templates. ([#2991](https://github.com/LemmyNet/Lemmy/issues/2991))
- allow specifying db uri in config file ([#2956](https://github.com/LemmyNet/Lemmy/issues/2956))
- Adding hot_rank columns in place of function sorting. ([#2952](https://github.com/LemmyNet/Lemmy/issues/2952))
- make shebangs posix compliant ([#2974](https://github.com/LemmyNet/Lemmy/issues/2974))
- Fix private message e-mail notification subject and body ([#2963](https://github.com/LemmyNet/Lemmy/issues/2963))
- Add comment depth check ([#2940](https://github.com/LemmyNet/Lemmy/issues/2940))
- Add `lemmyexternalproxy` to `lemmy` so that it can talk to the internet ([#2960](https://github.com/LemmyNet/Lemmy/issues/2960))
- Fix translation build error (fixes [#2967](https://github.com/LemmyNet/Lemmy/issues/2967)) ([#2968](https://github.com/LemmyNet/Lemmy/issues/2968))
- Activitypub breaking changes for Lemmy 0.18 ([#2705](https://github.com/LemmyNet/Lemmy/issues/2705))
- Add db index for post.url column ([#2929](https://github.com/LemmyNet/Lemmy/issues/2929))
- Fall back to String for Comment::path when not using the full feature ([#2941](https://github.com/LemmyNet/Lemmy/issues/2941))
- update diesel to 2.1.0 and diesel-async to 0.3.0 (issue [#2882](https://github.com/LemmyNet/Lemmy/issues/2882)) ([#2895](https://github.com/LemmyNet/Lemmy/issues/2895))
- Fix dev setups. ([#2944](https://github.com/LemmyNet/Lemmy/issues/2944))
- Set version name for crates.io release ([#2928](https://github.com/LemmyNet/Lemmy/issues/2928))
- Fix handling of follows addressed to single value ([#2920](https://github.com/LemmyNet/Lemmy/issues/2920))
- Remove chatserver ([#2919](https://github.com/LemmyNet/Lemmy/issues/2919))
- Adding taglines to SiteResponse. Fixes [#2925](https://github.com/LemmyNet/Lemmy/issues/2925) ([#2926](https://github.com/LemmyNet/Lemmy/issues/2926))
- Fix _All_ reports not showing. Fixes [#2902](https://github.com/LemmyNet/Lemmy/issues/2902) ([#2903](https://github.com/LemmyNet/Lemmy/issues/2903))
- README updates ([#2913](https://github.com/LemmyNet/Lemmy/issues/2913))
- Filter empty username strings from Mastodon (fixes [#2886](https://github.com/LemmyNet/Lemmy/issues/2886)) ([#2887](https://github.com/LemmyNet/Lemmy/issues/2887))
- Update humane tech badge to point to new repo ([#2898](https://github.com/LemmyNet/Lemmy/issues/2898))
- Update to fix nginx proxy config for Docker Installs ([#2908](https://github.com/LemmyNet/Lemmy/issues/2908))
- Remove jaeger, opentelemetry from docker-compose ([#2894](https://github.com/LemmyNet/Lemmy/issues/2894))
- Replace remmel with Mlem. ([#2890](https://github.com/LemmyNet/Lemmy/issues/2890))
- Add CORS support for debug mode. ([#2884](https://github.com/LemmyNet/Lemmy/issues/2884))
- Don't filter comments of posts from blocked community when viewing post detail ([#2880](https://github.com/LemmyNet/Lemmy/issues/2880))
- Remove websocket code ([#2878](https://github.com/LemmyNet/Lemmy/issues/2878))
- Dont return error in case optional auth is invalid ([#2879](https://github.com/LemmyNet/Lemmy/issues/2879))
- Remove unnecessary clone ([#2874](https://github.com/LemmyNet/Lemmy/issues/2874))
- Remove GetCommunityResponse.default_post_language ([#2867](https://github.com/LemmyNet/Lemmy/issues/2867))
- Dont refetch post url metadata when post is received again
- Dont retry outgoing HTTP requests (ref [#2865](https://github.com/LemmyNet/Lemmy/issues/2865))
- Force enable undetermined language ([#2851](https://github.com/LemmyNet/Lemmy/issues/2851))
- Fix typo that caused error ([#2861](https://github.com/LemmyNet/Lemmy/issues/2861))
- Prettier check ([#2855](https://github.com/LemmyNet/Lemmy/issues/2855))
- Downgrade postgres for CI to 15.2 (fixes [#2857](https://github.com/LemmyNet/Lemmy/issues/2857)) ([#2859](https://github.com/LemmyNet/Lemmy/issues/2859))
- Make volumes used in docker compose work when running on machines with SELinux enabled ([#2853](https://github.com/LemmyNet/Lemmy/issues/2853))
- Set attribute `deny_unknown_fields` for Lemmy config ([#2852](https://github.com/LemmyNet/Lemmy/issues/2852))
- Fixing empty req issue. ([#2849](https://github.com/LemmyNet/Lemmy/issues/2849))
- Upgrade api_test deps ([#2850](https://github.com/LemmyNet/Lemmy/issues/2850))
- Adding comments to all API related types. Fixes [#2846](https://github.com/LemmyNet/Lemmy/issues/2846) ([#2848](https://github.com/LemmyNet/Lemmy/issues/2848))
- Adding typescript generation for API. Fixes [#2824](https://github.com/LemmyNet/Lemmy/issues/2824) ([#2827](https://github.com/LemmyNet/Lemmy/issues/2827))
- Addressing slow profile queries. [#2777](https://github.com/LemmyNet/Lemmy/issues/2777) ([#2830](https://github.com/LemmyNet/Lemmy/issues/2830))
- Reverting to older non-multi-arch dockerfile. Fixes [#2832](https://github.com/LemmyNet/Lemmy/issues/2832) ([#2833](https://github.com/LemmyNet/Lemmy/issues/2833))
- Add `to` field in follow activities for better compatibility ([#2829](https://github.com/LemmyNet/Lemmy/issues/2829))
- Use older git clone for woodpecker. ([#2831](https://github.com/LemmyNet/Lemmy/issues/2831))
- Remove last Option<Vec.. from API. Fixes [#2820](https://github.com/LemmyNet/Lemmy/issues/2820) ([#2822](https://github.com/LemmyNet/Lemmy/issues/2822))
- Adding cross_post fetching to GetPost. Fixes [#2127](https://github.com/LemmyNet/Lemmy/issues/2127) ([#2821](https://github.com/LemmyNet/Lemmy/issues/2821))
- Use Dockerfile.multiarch as Dockerfile ([#2818](https://github.com/LemmyNet/Lemmy/issues/2818))
- Adding diesel enums for SortType and ListingType ([#2808](https://github.com/LemmyNet/Lemmy/issues/2808))
- Make path to local lemmy-ui use correct relative path ([#2817](https://github.com/LemmyNet/Lemmy/issues/2817))
- Add lemmy-bot to README libraries list ([#2816](https://github.com/LemmyNet/Lemmy/issues/2816))
- Separate federated_instances into its own endpoint. Fixes [#1931](https://github.com/LemmyNet/Lemmy/issues/1931) ([#2813](https://github.com/LemmyNet/Lemmy/issues/2813))
- Use official rust image and clean up Dockerfiles ([#2804](https://github.com/LemmyNet/Lemmy/issues/2804))
- Temporary fix for hiding deleted posts. [#2624](https://github.com/LemmyNet/Lemmy/issues/2624) ([#2811](https://github.com/LemmyNet/Lemmy/issues/2811))
- Leave modded communities on account deletion. Fixes [#2560](https://github.com/LemmyNet/Lemmy/issues/2560) ([#2810](https://github.com/LemmyNet/Lemmy/issues/2810))
- Adding check to description and body length fields. ([#2805](https://github.com/LemmyNet/Lemmy/issues/2805))
- Fix & Optimize CI config ([#2802](https://github.com/LemmyNet/Lemmy/issues/2802))
- Making the chat server an actor. ([#2793](https://github.com/LemmyNet/Lemmy/issues/2793))
- Use pretty print for federation json responses ([#2801](https://github.com/LemmyNet/Lemmy/issues/2801))
- Fix listing type default value ([#2796](https://github.com/LemmyNet/Lemmy/issues/2796))
- Add woodpecker ci ([#2789](https://github.com/LemmyNet/Lemmy/issues/2789))
- Remove unused dependencies ([#2795](https://github.com/LemmyNet/Lemmy/issues/2795))
- Optimize federated language updates to avoid unnecessary db writes ([#2786](https://github.com/LemmyNet/Lemmy/issues/2786))
- Added identifier to context ([#2791](https://github.com/LemmyNet/Lemmy/issues/2791))
- Activitypub crate rewrite ([#2782](https://github.com/LemmyNet/Lemmy/issues/2782))
- Add Custom Emojis Support ([#2616](https://github.com/LemmyNet/Lemmy/issues/2616))
- Adding deadpool timeouts. ([#2775](https://github.com/LemmyNet/Lemmy/issues/2775))
- Adding TOTP / 2FA to lemmy ([#2741](https://github.com/LemmyNet/Lemmy/issues/2741))
- Get rid of Safe Views, use serde_skip ([#2767](https://github.com/LemmyNet/Lemmy/issues/2767))
- Show deleted and removed posts for profile views. Fixes [#2624](https://github.com/LemmyNet/Lemmy/issues/2624) ([#2729](https://github.com/LemmyNet/Lemmy/issues/2729))
- Dont upsert Instance row every apub fetch ([#2771](https://github.com/LemmyNet/Lemmy/issues/2771))
- Fixing broken websockets. ([#2770](https://github.com/LemmyNet/Lemmy/issues/2770))
- Ignore undetermined language when calculating post default language ([#2769](https://github.com/LemmyNet/Lemmy/issues/2769))
- Switch from bb8 to deadpool. Fixes [#2765](https://github.com/LemmyNet/Lemmy/issues/2765) ([#2768](https://github.com/LemmyNet/Lemmy/issues/2768))
- Adding a vector indexing check to prevent panics. Fixes [#2753](https://github.com/LemmyNet/Lemmy/issues/2753) ([#2754](https://github.com/LemmyNet/Lemmy/issues/2754))
- Cleaning up person_view sorts ([#2760](https://github.com/LemmyNet/Lemmy/issues/2760))
- Add default attribute for webfinger properties (fixes [#2756](https://github.com/LemmyNet/Lemmy/issues/2756)) ([#2759](https://github.com/LemmyNet/Lemmy/issues/2759))
- Include type information with webfinger responses (fixes [#2037](https://github.com/LemmyNet/Lemmy/issues/2037)) ([#2746](https://github.com/LemmyNet/Lemmy/issues/2746))
- Fixing issue with saving site language. Fixes [#2748](https://github.com/LemmyNet/Lemmy/issues/2748) ([#2749](https://github.com/LemmyNet/Lemmy/issues/2749))
- Proper permission check for federated comment distinguish ([#2697](https://github.com/LemmyNet/Lemmy/issues/2697))
- Implement separate mod activities for feature, lock post ([#2716](https://github.com/LemmyNet/Lemmy/issues/2716))
- Fix case in activitypub context (ref [#2734](https://github.com/LemmyNet/Lemmy/issues/2734)) ([#2743](https://github.com/LemmyNet/Lemmy/issues/2743))
- Separate comment distinguish ([#2740](https://github.com/LemmyNet/Lemmy/issues/2740))
- Adding instance software and version. Fixes [#2222](https://github.com/LemmyNet/Lemmy/issues/2222) ([#2733](https://github.com/LemmyNet/Lemmy/issues/2733))
- Fixing slow joins to post_read, post_saved, and comment_saved . ([#2738](https://github.com/LemmyNet/Lemmy/issues/2738))
- Remove lemmur since its deprecated. ([#2742](https://github.com/LemmyNet/Lemmy/issues/2742))
- Combine prod and dev docker setups using build-arg ([#2739](https://github.com/LemmyNet/Lemmy/issues/2739))
- Organize utils into separate files. Fixes [#2295](https://github.com/LemmyNet/Lemmy/issues/2295) ([#2736](https://github.com/LemmyNet/Lemmy/issues/2736))
- Removing checking permissions when editing posts and comments. ([#2727](https://github.com/LemmyNet/Lemmy/issues/2727))
- Fixing updated form fields. Fixes [#2724](https://github.com/LemmyNet/Lemmy/issues/2724) ([#2725](https://github.com/LemmyNet/Lemmy/issues/2725))
- Only let top admin purge. Fixes [#2731](https://github.com/LemmyNet/Lemmy/issues/2731) ([#2732](https://github.com/LemmyNet/Lemmy/issues/2732))
- Fix writing of `removeData` in apub context (fixes [#2734](https://github.com/LemmyNet/Lemmy/issues/2734)) ([#2735](https://github.com/LemmyNet/Lemmy/issues/2735))
- Adding a site option to email admins for new reports. ([#2730](https://github.com/LemmyNet/Lemmy/issues/2730))
- Sort community search by active_monthly by default. ([#2728](https://github.com/LemmyNet/Lemmy/issues/2728))
- Fix post titles being cut off (fixes [#2718](https://github.com/LemmyNet/Lemmy/issues/2718)) ([#2720](https://github.com/LemmyNet/Lemmy/issues/2720))
- Improved error message when attempting to fetch non-local object (fixes [#2715](https://github.com/LemmyNet/Lemmy/issues/2715)) ([#2717](https://github.com/LemmyNet/Lemmy/issues/2717))
- Convert HTML from titles into markdown ([#2709](https://github.com/LemmyNet/Lemmy/issues/2709))
- In apub post receive, check posting restricted to mods (ref [#2702](https://github.com/LemmyNet/Lemmy/issues/2702)) ([#2704](https://github.com/LemmyNet/Lemmy/issues/2704))
- Fix docker federation setup ([#2706](https://github.com/LemmyNet/Lemmy/issues/2706))
- Fix data fetching from Peertube (fixes [#2689](https://github.com/LemmyNet/Lemmy/issues/2689)) ([#2703](https://github.com/LemmyNet/Lemmy/issues/2703))
- Add a ntfy notif on a tag deploy success. ([#2701](https://github.com/LemmyNet/Lemmy/issues/2701))
- Disable pictrs feature in CI to make it faster ([#2698](https://github.com/LemmyNet/Lemmy/issues/2698))
- Fixing admin application email subject. Fixes [#2688](https://github.com/LemmyNet/Lemmy/issues/2688) ([#2695](https://github.com/LemmyNet/Lemmy/issues/2695))
- Fixing person block views. Fixes [#2693](https://github.com/LemmyNet/Lemmy/issues/2693) ([#2694](https://github.com/LemmyNet/Lemmy/issues/2694))
- Fixing GetPosts active sort index. Fixes [#2683](https://github.com/LemmyNet/Lemmy/issues/2683) ([#2684](https://github.com/LemmyNet/Lemmy/issues/2684))
- More explicit upgrade instructions.
- Fix yerbate.ml -> join-lemmy.org links
- Publish without verify ([#2681](https://github.com/LemmyNet/Lemmy/issues/2681))
- Fix paths in release script, update crate versions ([#2680](https://github.com/LemmyNet/Lemmy/issues/2680))

### Lemmy UI

- fix(tabs): Fix tab semantics and a11y ([#1382](https://github.com/LemmyNet/lemmy-ui/issues/1382))
- fix: Remove Bootstrap JS in sidebars ([#1434](https://github.com/LemmyNet/lemmy-ui/issues/1434))
- Store manifest in memory so it does not need to be generated for every page request ([#1433](https://github.com/LemmyNet/lemmy-ui/issues/1433))
- Com create post ([#1431](https://github.com/LemmyNet/lemmy-ui/issues/1431))
- fix: Small adjustments to create post form
- fix: Fix Communities search/filter header [#1417](https://github.com/LemmyNet/lemmy-ui/issues/1417)
- Fix mobile navbar bug ([#1428](https://github.com/LemmyNet/lemmy-ui/issues/1428))
- feat: Hide 'comments' in post listing comments button; icon and title text is clear
- feat: Drop dependency for tsconfig-paths-webpack-plugin
- fix main.css vars ([#1424](https://github.com/LemmyNet/lemmy-ui/issues/1424))
- feat: Bootstrap 5 ([#1378](https://github.com/LemmyNet/lemmy-ui/issues/1378))
- Add scripts to make managing translations easier ([#1414](https://github.com/LemmyNet/lemmy-ui/issues/1414))
- Fix redirect after successful password reset
- fix: Shrink and normalize some post action button colors and sizes
- fix: Litely Red was importing the wrong vars
- fix: Always show advanced post buttons dropdown
- Fixing missing class for language select.
- feat(post): Move post domain beneath post title ([#1363](https://github.com/LemmyNet/lemmy-ui/issues/1363))
- Updated link to lemmy-repo as direct link to issues
- feat(css): make vertical rhythm more consistent for post listings
- fix(post): Fix missing labels on block/report buttons in new dropdown
- fix: Add compiled theme stylesheets
- fix: Fix too-intense hr color between posts
- fix: Fix post creator text alignment
- fix: Prettier ignore generated themes, as they aren't written by humans
- feat: Badge-ify NSFW and removed by mod title info
- fix: Fix display inline of post title
- fix: Only post title should be inside h5, not the additional metadata icons
- fix: Use btn-sm for advanced menu dropdown buttons
- fix: Remove some extra classes on flag/report buttons
- fix: Fix vertical alignment and border radius of advanced dropdown menu items
- fix(a11y): Add aria-controls for advanced button dropdown
- fix: Fix some button labels and tippy text
- feat: Move advanced post menu into dropdown
- Always allow users to control whether they see NSFW content
- fix: Fix display inline of post title
- fix: Use btn-sm for advanced menu dropdown buttons
- fix: Remove some extra classes on flag/report buttons
- fix: Fix vertical alignment and border radius of advanced dropdown menu items
- fix(a11y): Add aria-controls for advanced button dropdown
- fix: Fix some button labels and tippy text
- feat: Move advanced post menu into dropdown
- fix: Fix some small style issues
- feat(a11y): Add eslint-plugin-jsx-a11y
- fix: Fix Trending sidebar card too
- fix(a11y): Fix some mobile styles for Sidebar Cards
- fix(a11y): Apply same accordion/collapse markup to Subscribed Communities sidebar card
- fix: Add .accordion wrapper around sidebar to obtain negative bottom margin
- fix(a11y): Fix some a11y issues in Site Sidebar and use native Bootstrap Collapse and Card classes
- fix(a11y): Add aria-label to fetaured pins
- fix: Only post title should be inside h5, not the additional metadata icons
- fix: Fix some references to ; they should refer to a specific gray in case changes
- fix: Move var to grays area
- fix: Fix broken theme overrides; group theme variable files by variable type
- fix accidental changes
- remove comments
- fix merge conflicts
- Add default profile picture for users who do not set one ([#1339](https://github.com/LemmyNet/lemmy-ui/issues/1339))
- feat(navbar): Add labels for navbar items on mobile ([#1323](https://github.com/LemmyNet/lemmy-ui/issues/1323))
- fix: Fix rounded top corners in markdown textarea
- fix: Fix input-bg for darkly theme
- chore: Fix a missing theme color
- chore: Fix vars
- chore: Remove some redundant Sass variable declarations and re-organize them
- fix: Fix imports
- Revert "fix: Sass files don't need to refer to full node_modules path"
- fix: Sass files don't need to refer to full node_modules path
- fix: Remove inline styles and use Bootstrap classes
- fix: Fix missing prop
- fix: Vertically align icons in post listing
- fix: Add total users in site sidebar
- fix: Re-add 'number of communities' to site sidebar
- fix: Fix broken link
- fix: Fix rounded textarea in Markdown box
- feat: Fix some colors on dark mode
- feat: Redesign the format bar / textarea into a single bordered area with divider
- and of course, yarn.lock
- handle login failures correctly
- wrap login call in try/catch for error handling
- Fix first loads not working
- Remove extra div in post sidebar
- feat: Move text formatting bar above textarea
- Add a class to the more button on a comment node
- Switch navbar classes to ids
- break out browser and helper methods
- feat: Adds Jump to main content functionality
- chore: ensures validURL function does not throw exception
- break out all role utils
- Adding a few more 0.18.0 API changes. ([#1324](https://github.com/LemmyNet/lemmy-ui/issues/1324))
- Use aside semantic HTML tag for sidebars
- Use article semantic HTML tag for posts/comments
- Use footer semantic HTML tag
- Add lemmy-site class for easier detection
- Add ID's and classes to sidebars
- Add clases and ID's to post form/listing
- Add classes to post and comment repy textareas
- Rename markdown-textarea ID's
- Add nav and footer ID's
- fix block community functionality in sidebar ([#1316](https://github.com/LemmyNet/lemmy-ui/issues/1316))
- fix: fix loading custom themes with a custom LEMMY_UI_EXTRA_THEMES_FOLDER
- Admin Settings: Bugfixes ([#1313](https://github.com/LemmyNet/lemmy-ui/issues/1313))
- hardcoded node version due to bug "Text file busy" error introduced in node 20.3 ([#1320](https://github.com/LemmyNet/lemmy-ui/issues/1320))
- changed required checkbox ([#1318](https://github.com/LemmyNet/lemmy-ui/issues/1318))
- set loading state attribute to false if createPost fails ([#1311](https://github.com/LemmyNet/lemmy-ui/issues/1311))
- Make community IDs more easily selectable ([#1306](https://github.com/LemmyNet/lemmy-ui/issues/1306))
- Re-arrange elements beneath markdown textarea [#1057](https://github.com/LemmyNet/lemmy-ui/issues/1057) ([#1288](https://github.com/LemmyNet/lemmy-ui/issues/1288))
- Match more specific locales to supported ones ([#1241](https://github.com/LemmyNet/lemmy-ui/issues/1241))
- formatting
- refactor server, tidy up, use handlers/middleware/utils pattern
- Fixed color scheme variables of litely-red
- Improve the look of tables ([#1299](https://github.com/LemmyNet/lemmy-ui/issues/1299))
- feat(post-listing): Add link to post for mobile preview
- go back if last history action was push, fix bug preventing navigation to / working from login
- add user-scalable=no to meta tag
- Removed duplicated CSS rule
- Make comment border colors semi-transparent
- Add long polling to update unread counts in navbar. ([#1271](https://github.com/LemmyNet/lemmy-ui/issues/1271))
- make button a tad smaller
- remove pictrsDeleteToast usage from PostForm, add delete image button, fix infinite loading bug if upload error occured
- Use http client ([#1081](https://github.com/LemmyNet/lemmy-ui/issues/1081))
- Horizontally scrollable code blocks, instead of wrapping.
- Update BUG_REPORT.yml
- add checkboxes to feature requests
- required under label
- indent validations
- label array
- add checkboxes to issue template
- Fixed NSFW image blur spilling outside the preview
- Recompiled theme files using latest Bootstrap 4
- Added npm scripts to rebuild theme files
- Add title to pictrs-image
- Make the community title in the sidebar link to the local community. ([#1161](https://github.com/LemmyNet/lemmy-ui/issues/1161))
- Fix prompt component ([#1223](https://github.com/LemmyNet/lemmy-ui/issues/1223))
- Fix mobile menu collapse bug ([#1222](https://github.com/LemmyNet/lemmy-ui/issues/1222))
- Another try at sanitize. ([#1208](https://github.com/LemmyNet/lemmy-ui/issues/1208))
- remove unused theme files ([#1202](https://github.com/LemmyNet/lemmy-ui/issues/1202))
- issue templates in yml format ([#1211](https://github.com/LemmyNet/lemmy-ui/issues/1211))
- Make preview button say "edit" when in preview mode ([#1164](https://github.com/LemmyNet/lemmy-ui/issues/1164))
- Add shortcut for submitting post ([#1163](https://github.com/LemmyNet/lemmy-ui/issues/1163))
- Fix typo in post-listing.tsx ([#1181](https://github.com/LemmyNet/lemmy-ui/issues/1181))
- Only show 'saved' tab on own profile page
- Added Ctrl-K keybind
- Fix quotes ([#1131](https://github.com/LemmyNet/lemmy-ui/issues/1131))
- Alternative way to sanitize isoData ([#1129](https://github.com/LemmyNet/lemmy-ui/issues/1129))
- chore: switched to enabling language warning by prop rather than disabling
- fix: Adds ability to hide language warning
- styles([#1067](https://github.com/LemmyNet/lemmy-ui/issues/1067)): Run prettier
- fix([#1067](https://github.com/LemmyNet/lemmy-ui/issues/1067)): Fix language not updating when editing post
- Fix isoData can contain user generated content ([#1114](https://github.com/LemmyNet/lemmy-ui/issues/1114))
- Add media-src \* to Content-Security-Policy header
- Refactor lets to consts
- Fix aria-label for language select
- Add aria attribute to track toggle status of up/down votes. ([#1074](https://github.com/LemmyNet/lemmy-ui/issues/1074))
- Make comment depth easier to track visually
- Make comments nested lists
- Fix CONTRIBUTING link
- Fix sorting help link
- Do not refresh when community is selected in create post ([#1042](https://github.com/LemmyNet/lemmy-ui/issues/1042))
- Navbar fix 2 ([#1038](https://github.com/LemmyNet/lemmy-ui/issues/1038))
- Lint fix ([#1035](https://github.com/LemmyNet/lemmy-ui/issues/1035))
- Changes to language tag
- Hopefully stop lint command from erroring
- Always replace host with internal host
- Revert "User HTTP instead of HTTPS when fetching icon in docker internal network"
- Revert "Add debug statement."
- Add debug statement.
- User HTTP instead of HTTPS when fetching icon in docker internal network
- Add error message paragraph
- Make error code always display
- Navbar hide menu fix ([#1033](https://github.com/LemmyNet/lemmy-ui/issues/1033))
- Show parent comment for comment link. Fixes [#1030](https://github.com/LemmyNet/lemmy-ui/issues/1030) ([#1032](https://github.com/LemmyNet/lemmy-ui/issues/1032))
- Add heading tag to rate limit form
- Remove console log
- Include forgotten translation
- Remove console logs
- Add web share for browsers that have it enabled ([#1029](https://github.com/LemmyNet/lemmy-ui/issues/1029))
- Show language on posts and comments ([#1026](https://github.com/LemmyNet/lemmy-ui/issues/1026))
- Allow user to submit rate limit changes
- Put rate limit options in its own tab
- Refactor tabs into reuseable component
- Replace link to issue tracker with proper support spaces
- Fix isoData bug
- Refactor how error data is passed from server to client
- Make admin UI for allowing/blocking instances easier to work with ([#1012](https://github.com/LemmyNet/lemmy-ui/issues/1012))
- Get rid or forced error
- Changing all bigints to numbers
- Upgrade lemmy-js-client to work with bigints. Fixes [#1018](https://github.com/LemmyNet/lemmy-ui/issues/1018) ([#1022](https://github.com/LemmyNet/lemmy-ui/issues/1022))
- Redirect from pages that require auth on logout ([#1016](https://github.com/LemmyNet/lemmy-ui/issues/1016))
- Fix things not working in production build
- Fix error page not showing when site not fetched and adjust styles
- Handle error when site not returned
- Use node env instead of version for environment specific logic
- Redirect to login and remove duplicated code
- Fix server redirect error
- Set up logic for handling errors
- Extract helper function
- Dont preselect new post language ([#1008](https://github.com/LemmyNet/lemmy-ui/issues/1008))
- Update JS client to version with fixed JSON serialization ([#1017](https://github.com/LemmyNet/lemmy-ui/issues/1017))
- Redirect fomr pages that require auth on logout
- Remove "banned" badge from posts and comments (fixes 899) ([#1011](https://github.com/LemmyNet/lemmy-ui/issues/1011))
- Add support for PWA ([#1005](https://github.com/LemmyNet/lemmy-ui/issues/1005))
- Using auto-generated types from ts-rs. ([#1003](https://github.com/LemmyNet/lemmy-ui/issues/1003))
- Fixing some outdated docs links. Fixes [#1006](https://github.com/LemmyNet/lemmy-ui/issues/1006) ([#1007](https://github.com/LemmyNet/lemmy-ui/issues/1007))
- Upgrading deps. ([#1004](https://github.com/LemmyNet/lemmy-ui/issues/1004))
- Prettier css ([#995](https://github.com/LemmyNet/lemmy-ui/issues/995))
- Add content warning to modlog and fix modlog routing bug ([#994](https://github.com/LemmyNet/lemmy-ui/issues/994))
- Get rid of "No Results" showing while search is still loading. ([#997](https://github.com/LemmyNet/lemmy-ui/issues/997))
- Add SleeplessOne1917 to Codeowners.
- Handle when logged out ([#986](https://github.com/LemmyNet/lemmy-ui/issues/986))
- Make pages use query params instead of route params where appropriate ([#977](https://github.com/LemmyNet/lemmy-ui/issues/977))
- Multiple image upload ([#971](https://github.com/LemmyNet/lemmy-ui/issues/971))
- I18 quality of life change ([#973](https://github.com/LemmyNet/lemmy-ui/issues/973))
- Optimize Tagline Form page ([#972](https://github.com/LemmyNet/lemmy-ui/issues/972))
- Don't show icons / banners for banned users and removed communities. ([#962](https://github.com/LemmyNet/lemmy-ui/issues/962))
- fix: Fix undefined showing up in markdown ([#970](https://github.com/LemmyNet/lemmy-ui/issues/970))
- refactor: update UI to use new client uploadImage function ([#967](https://github.com/LemmyNet/lemmy-ui/issues/967))
- Add woodpecker ci ([#964](https://github.com/LemmyNet/lemmy-ui/issues/964))
- fix: Make search screen able to change type, listing type, and sort when there is no query ([#966](https://github.com/LemmyNet/lemmy-ui/issues/966))
- Adding 2FA support. Fixes [#938](https://github.com/LemmyNet/lemmy-ui/issues/938) ([#939](https://github.com/LemmyNet/lemmy-ui/issues/939))
- Add Custom Emoji Support
- Only show the determined warning for multiple. ([#952](https://github.com/LemmyNet/lemmy-ui/issues/952))
- Upgrading deps ([#951](https://github.com/LemmyNet/lemmy-ui/issues/951))
- Adding ban_from_community to be more clear. Fixes [#872](https://github.com/LemmyNet/lemmy-ui/issues/872) ([#943](https://github.com/LemmyNet/lemmy-ui/issues/943))
- Let any mod feature and lock posts. Fixes [#875](https://github.com/LemmyNet/lemmy-ui/issues/875) ([#944](https://github.com/LemmyNet/lemmy-ui/issues/944))
- Adding a warning for deselecting the undetermined language. ([#945](https://github.com/LemmyNet/lemmy-ui/issues/945))
- Fixing line formatting. ([#947](https://github.com/LemmyNet/lemmy-ui/issues/947))
- Do local community checks for buttons. Fixes [#918](https://github.com/LemmyNet/lemmy-ui/issues/918) ([#948](https://github.com/LemmyNet/lemmy-ui/issues/948))
- Check to make sure post is correct. Fixes [#934](https://github.com/LemmyNet/lemmy-ui/issues/934) ([#949](https://github.com/LemmyNet/lemmy-ui/issues/949))
- Remove buggy navbar search. Fixes [#921](https://github.com/LemmyNet/lemmy-ui/issues/921) ([#950](https://github.com/LemmyNet/lemmy-ui/issues/950))
- Fix issue with empty markdown content not nulling DB. Fixes [#924](https://github.com/LemmyNet/lemmy-ui/issues/924) ([#925](https://github.com/LemmyNet/lemmy-ui/issues/925))
- Adding reports send email to admins option ([#932](https://github.com/LemmyNet/lemmy-ui/issues/932))
- v0.17.1
- Fix comment box closing. Fixes [#904](https://github.com/LemmyNet/lemmy-ui/issues/904) ([#914](https://github.com/LemmyNet/lemmy-ui/issues/914))
- Fix showing crosspost dupes. Fixes [#900](https://github.com/LemmyNet/lemmy-ui/issues/900) ([#912](https://github.com/LemmyNet/lemmy-ui/issues/912))
- Fix live updating postres edit. Fixes [#908](https://github.com/LemmyNet/lemmy-ui/issues/908) ([#911](https://github.com/LemmyNet/lemmy-ui/issues/911))
- Removing extra themes. Fixes [#905](https://github.com/LemmyNet/lemmy-ui/issues/905) ([#910](https://github.com/LemmyNet/lemmy-ui/issues/910))
- Fixing post setState error. Fixes [#902](https://github.com/LemmyNet/lemmy-ui/issues/902) ([#903](https://github.com/LemmyNet/lemmy-ui/issues/903))
