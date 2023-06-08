# Lemmy Release v0.16.4 - Peertube federation, Rust API and other improvements (2022-05-27)

_Written by @dessalines and @nutomic, 2022-05-27_

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Major changes

This version adds a new community setting "restricted". If this is active, only moderators can post in the community (but anyone can comment). This can be useful for announcements or blogs.

In your site settings there is a new field for legal information. This can be used to present terms of service, privacy policy etc.

We've also added an admin setting for the default post listing type. This determines whether users without login, and newly registered users, will see the `Local` or `All` timeline by default.

HTML tags are now disabled in markdown, as the were causing some issues.

### Federation

Lemmy now federates with [Peertube](https://joinpeertube.org/)! Be aware that this requires Peertube [v4.2.0-rc.1](https://github.com/Chocobozzz/PeerTube/releases/tag/v4.2.0-rc.1) or later. You can now follow Peertube channels from Lemmy and comment on videos. If there is other functionality that you would like to see federated, please open an issue (the same goes for federation with other projects).

When browsing remote Lemmy communities, you will now see the site description and rules in the sidebar. Some federated actions did not generate mod log entries previously, this has been fixed. Also, federation with Friendica was approved, Lemmy now correctly receives comments with hashtags. Additionally, the previous version had a check which rejected federation in case the domain of user avatars or banners didn't match the user's domain. This check broke federation with some instances, and was removed.

### Rust API

If you are thinking of developing a Rust application which interacts with Lemmy, this is now much easier. The [lemmy-api-common](https://crates.io/crates/lemmy_api_common) crate has a new feature which disables all heavy dependencies (like diesel) by default. You can add the crate to your project, and interact with Lemmy API using the exact same structs that Lemmy itself uses. For an example, have a look at [lemmyBB](https://github.com/Nutomic/lemmyBB). Its in a very early stage, so contributions are welcome!

In other development news, our test instances ([ds9.lemmy.ml](https://ds9.lemmy.ml/), [voyager.lemmy.ml](https://voyager.lemmy.ml/), [enterprise.lemmy.ml](https://enterprise.lemmy.ml/)) are now updated automatically every night with the latest development version. This should make it easier for admins and users to test new features before they are released. At the same time, [join-lemmy.org](https://join-lemmy.org/) and its instance list are also updated automatically every night.

## Upgrade notes

Follow the [Docker or Ansible upgrade instructions here.](https://join-lemmy.org/docs/en/administration/administration.html)

## Support development

We (@dessalines and @nutomic) have been working full-time on Lemmy for almost two years. This is largely thanks to support from [NLnet foundation](https://nlnet.nl/).

If you'd like to support development, and make sure that we will always be available to work full time on Lemmy, consider [donating to support its development](https://join-lemmy.org/donate). We've spent hundreds of hours on Lemmy, and would like to be able to add more developers to our little open-source co-op as time goes on.

## Changes

### API

- A full list of the API changes can be seen on this diff of [lemmy-js-client: 0.16.0 -> 0.16.4](https://github.com/LemmyNet/lemmy-js-client/compare/0.16.0-rc.1...0.16.4-rc.3) .

### Lemmy

- Add legal information (fixes [#721](https://github.com/LemmyNet/lemmy/issues/721)) ([#2273](https://github.com/LemmyNet/lemmy/issues/2273))
- Add drone task for nightly build ([#2264](https://github.com/LemmyNet/lemmy/issues/2264))
- Fixing malformed rosetta translations. Fixes [#2231](https://github.com/LemmyNet/lemmy/issues/2231)
- Make opentelemetry dependency optional
- Remove check that avatars/banners are locally hosted (fixes [#2254](https://github.com/LemmyNet/lemmy/issues/2254)) ([#2255](https://github.com/LemmyNet/lemmy/issues/2255))
- Simplify building plain/html emails ([#2251](https://github.com/LemmyNet/lemmy/issues/2251))
- Federate with Peertube ([#2244](https://github.com/LemmyNet/lemmy/issues/2244))
- Derive default for api request structs, move type enums ([#2245](https://github.com/LemmyNet/lemmy/issues/2245))
- Add cargo feature for building lemmy_api_common with mininum deps ([#2243](https://github.com/LemmyNet/lemmy/issues/2243))
- Add restricted community field to CreateCommunity, UpdateCommunity (ref [#2235](https://github.com/LemmyNet/lemmy/issues/2235)) ([#2242](https://github.com/LemmyNet/lemmy/issues/2242))
- Implement restricted community (only mods can post) (fixes [#187](https://github.com/LemmyNet/lemmy/issues/187)) ([#2235](https://github.com/LemmyNet/lemmy/issues/2235))
- Update community statistics after post or comment is deleted by user ([#2193](https://github.com/LemmyNet/lemmy/issues/2193))
- Accept comments with hashtags from Friendica ([#2236](https://github.com/LemmyNet/lemmy/issues/2236))
- Remove unused dependencies ([#2239](https://github.com/LemmyNet/lemmy/issues/2239))
- Fix link metadata unit test ([#2237](https://github.com/LemmyNet/lemmy/issues/2237))
- Dont return "admin" for GET user when no id/name is provided (fixes [#1546](https://github.com/LemmyNet/lemmy/issues/1546)) ([#2233](https://github.com/LemmyNet/lemmy/issues/2233))
- Federation: dont overwrite local object from Announce activity ([#2232](https://github.com/LemmyNet/lemmy/issues/2232))
- Require registration application by default ([#2229](https://github.com/LemmyNet/lemmy/issues/2229))
- Add default post listing type (fixes [#2195](https://github.com/LemmyNet/lemmy/issues/2195)) ([#2209](https://github.com/LemmyNet/lemmy/issues/2209))
- Show deny reason to users after a failed login. Fixes [#2191](https://github.com/LemmyNet/lemmy/issues/2191) ([#2206](https://github.com/LemmyNet/lemmy/issues/2206))
- Fix allowlist / blocklist description location. Fixes [#2214](https://github.com/LemmyNet/lemmy/issues/2214) ([#2215](https://github.com/LemmyNet/lemmy/issues/2215))
- Split apart api files ([#2216](https://github.com/LemmyNet/lemmy/issues/2216))
- Changing default listing type to Local from Subscribed.
- Expose remote site info in GetCommunity API (fixes [#2208](https://github.com/LemmyNet/lemmy/issues/2208)) ([#2210](https://github.com/LemmyNet/lemmy/issues/2210))
- Fixing unstable post sorts. Fixes [#2188](https://github.com/LemmyNet/lemmy/issues/2188) ([#2204](https://github.com/LemmyNet/lemmy/issues/2204))
- Adding lemmy_ui_debug for future debug testing. ([#2211](https://github.com/LemmyNet/lemmy/issues/2211))
- Fixing generate unique changeme ([#2205](https://github.com/LemmyNet/lemmy/issues/2205))
- Change Person, Instance types ([#2200](https://github.com/LemmyNet/lemmy/issues/2200))
- Write mod log for federated sticky/lock post actions ([#2203](https://github.com/LemmyNet/lemmy/issues/2203))

### Lemmy-UI

- Adding Legal info ([#666](https://github.com/LemmyNet/lemmy-ui/issues/666))
- Add nightly dev drone cron build. ([#664](https://github.com/LemmyNet/lemmy-ui/issues/664))
- Add LEMMY_UI_CUSTOM_SCRIPT env var. Fixes [#655](https://github.com/LemmyNet/lemmy-ui/issues/655) ([#656](https://github.com/LemmyNet/lemmy-ui/issues/656))
- Turn off html in markdown. Fixes [#650](https://github.com/LemmyNet/lemmy-ui/issues/650) ([#657](https://github.com/LemmyNet/lemmy-ui/issues/657))
- Add posting restricted to mods ([#642](https://github.com/LemmyNet/lemmy-ui/issues/642))
- Add default post listing ([#645](https://github.com/LemmyNet/lemmy-ui/issues/645))
- Don't render markdown for summaries. Fixes [#658](https://github.com/LemmyNet/lemmy-ui/issues/658) ([#659](https://github.com/LemmyNet/lemmy-ui/issues/659))
- Set content security policy http header for all responses ([#621](https://github.com/LemmyNet/lemmy-ui/issues/621))
- Adding site sidebar for remote communities. Fixes [#626](https://github.com/LemmyNet/lemmy-ui/issues/626) ([#640](https://github.com/LemmyNet/lemmy-ui/issues/640))
- Properly debouncing tribute mentions. Fixes [#633](https://github.com/LemmyNet/lemmy-ui/issues/633) ([#639](https://github.com/LemmyNet/lemmy-ui/issues/639))
- Adding litely-red and darkly-red themes. ([#636](https://github.com/LemmyNet/lemmy-ui/issues/636))
- Fixing initial loading of admin page. Fixes [#635](https://github.com/LemmyNet/lemmy-ui/issues/635) ([#638](https://github.com/LemmyNet/lemmy-ui/issues/638))
- Fixing helmet theme bug. Fixes [#628](https://github.com/LemmyNet/lemmy-ui/issues/628) ([#629](https://github.com/LemmyNet/lemmy-ui/issues/629))
- Adding site ban from profile page. Fixes [#588](https://github.com/LemmyNet/lemmy-ui/issues/588) ([#627](https://github.com/LemmyNet/lemmy-ui/issues/627))
- Adding sidebar and subscribed collapse. Fixes [#609](https://github.com/LemmyNet/lemmy-ui/issues/609) ([#622](https://github.com/LemmyNet/lemmy-ui/issues/622))
- Adding a LEMMY_UI_DEBUG flag for eruda debugging ([#624](https://github.com/LemmyNet/lemmy-ui/issues/624))
- Adds OC ([#620](https://github.com/LemmyNet/lemmy-ui/issues/620))
