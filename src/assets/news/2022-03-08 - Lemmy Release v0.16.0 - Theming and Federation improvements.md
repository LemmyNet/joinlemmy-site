# Lemmy v0.16.0 Release: Theming and Federation improvements (2022-03-08)

_Written by @dessalines and @nutomic, 2022-03-08_

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Major Changes

### Theming

Customizing Lemmy is now much easier than before. Instance admins can select a default instance theme under `/admin` which applies to all users who are not logged in, and those who haven't explicitly picked a theme.

It is also possible now to add custom themes to an instance, without having to recompile lemmy-ui. When running with Docker, make sure that [these lines](https://github.com/LemmyNet/lemmy-ansible/pull/24/files) are present in docker-compose.yml (Ansible will add them automatically if you updated the repo). Then put your .css file into `./volumes/lemmy-ui/extra_themes`. The new theme can then be selected by users, or set as instance default.

For native installation (without Docker), themes are loaded by lemmy-ui from `./extra_themes` folder. A different path can be specified with `LEMMY_UI_EXTRA_THEMES_FOLDER` environment variable.

For instructions how to create a new theme, have a look at the [documentation](https://join-lemmy.org/docs/en/client_development/theming.html).

### Federation

@nutomic made many changes to federation to increase compatibility with other software. Lemmy can now receive deletions from [Pleroma], comments from [Friendica] and communities from [lotide](https://sr.ht/~vpzom/lotide/). Other actions were already compatible before. Mastodon can now display communities even when a user with identical name exists (but the user can't be viewed in that case). There were no breaking changes necessary, so federation is fully compatible with 0.15. If you notice something in another project that doesn't federate but should, please open an issue.

Multiple users have pointed out that posts, comments and votes don't federate reliably. We first attempted to fix this in [Lemmy 0.15.4](https://lemmy.ml/post/184152) a few days ago, but that didn't help much. Later @nutomic noticed that Lemmy was only sending out activities with 4 worker threads, which is not enough for a big instance like lemmy.ml. At the same time, many of those workers were taken up by sending to broken instances, trying to connect for a minute or more. This version adds a timeout and increases the number of workers.

### Federated bans

Until now, only community bans were federated, and the "Remove content" option didn't work over federation. The new version fixes this behaviour, so that both site bans and community bans federate, including "Remove content" option and expiry. Note that this change only affects new bans, those which were issued before upgrading to 0.16 will not be federated.

### Hide communities

@dayinjing implemented a funcionality for instance admins to hide controversial communities. A hidden community is only visible to those users who subscribe to it. This represents a milder alternative to removing a community. This functionality is not implemented in lemmy-ui yet, but admins can hide a community like this via command line:

```
curl -X PUT https://example.com/api/v3/community/hide \
    -H "Content-Type: application/json" \
    -d \
    '{"community_id":3,"hidden":true,"reason":"*reason for mod log*","auth":"*admin jwt token*"}'
```

### Jerboa: a new android app

To help adoption, and since most people use social media through their smartphones nowadays, @dessalines has been working on a native android app for Lemmy called [Jerboa](https://github.com/dessalines/jerboa), which is now on [F-Droid](https://f-droid.org/packages/com.jerboa) and [Google Play](https://play.google.com/store/apps/details?id=com.jerboa).

It is still at an alpha level, but is very usable. We'd love to have experienced android developers contribute to it.

This now makes three smartphone apps for Lemmy: [Lemmur and Jerboa for Android, and Remmel for iOS](https://join-lemmy.org/apps).

## Upgrade notes

Follow the [Docker or Ansible upgrade instructions here.](https://join-lemmy.org/docs/en/administration/administration.html)

There are three lemmy.hjson config changes. See [defaults.hjson](https://github.com/LemmyNet/lemmy/blob/main/config/defaults.hjson) for comments and default values.

- changed boolean `email.use_tls` to `email.tls_type`
- added `setup.default_theme`
- added `federation.worker_count`

## Support development

We (@dessalines and @nutomic) have been working full-time on Lemmy for almost two years. This is largely thanks to support from [NLnet foundation](https://nlnet.nl/). If you would like to support our efforts, please consider [donating](https://join-lemmy.org/donate).

If you'd like to support development, and make sure that we will always be available to work full time on Lemmy, consider [donating to support its development](https://join-lemmy.org/donate). We've spent hundreds of hours on Lemmy, and would like to be able to add more developers to our little open-source co-op as time goes on.

## Changes

### API

- A full list of the API changes can be seen on this diff of [lemmy-js-client: 0.15.0 -> 0.16.0](https://github.com/LemmyNet/lemmy-js-client/compare/0.15.0-rc.34...0.16.0-rc.1) .

### Config

- The config changes are [here.](https://github.com/LemmyNet/lemmy/compare/0.15.2...main#diff-bcc84ad7bb4d0687c679cb6b3711052d8eba74a8188578c7516a8fdb5584d01a)

### Lemmy Server

- Make delete activities backwards compatible with 0.15 ([#2114](https://github.com/LemmyNet/lemmy/issues/2114))
- Make activity queue worker count configurable, log stats ([#2113](https://github.com/LemmyNet/lemmy/issues/2113))
- Add timeout for sending activities ([#2112](https://github.com/LemmyNet/lemmy/issues/2112))
- Update `actix-*` dependencies to stable v4.
- Show nsfw communities if you are logged in and searching communities ([#2105](https://github.com/LemmyNet/lemmy/issues/2105))
- Fix resending activities (fixes [#1282](https://github.com/LemmyNet/lemmy/issues/1282)) ([#2109](https://github.com/LemmyNet/lemmy/issues/2109))
- Dont hardcode site id in Site::update ([#2110](https://github.com/LemmyNet/lemmy/issues/2110))
- send plain-text in email along with html ([#2107](https://github.com/LemmyNet/lemmy/issues/2107))
- Add site option for default theme ([#2104](https://github.com/LemmyNet/lemmy/issues/2104))
- Hide community v2 ([#2055](https://github.com/LemmyNet/lemmy/issues/2055))
- Reorganize federation tests ([#2092](https://github.com/LemmyNet/lemmy/issues/2092))
- Add logging to debug federation issues (ref [#2096](https://github.com/LemmyNet/lemmy/issues/2096)) ([#2099](https://github.com/LemmyNet/lemmy/issues/2099))
- Adding a reqwest timeout. Fixes [#2089](https://github.com/LemmyNet/lemmy/issues/2089) ([#2097](https://github.com/LemmyNet/lemmy/issues/2097))
- Upgrade to Rust 2021 edition ([#2093](https://github.com/LemmyNet/lemmy/issues/2093))
- Merge different delete activities for better compatibility (fixes [#2066](https://github.com/LemmyNet/lemmy/issues/2066)) ([#2073](https://github.com/LemmyNet/lemmy/issues/2073))
- Implement instance actor ([#1798](https://github.com/LemmyNet/lemmy/issues/1798))
- Use doku(skip) for opentelemetry_url config value (ref [#2085](https://github.com/LemmyNet/lemmy/issues/2085)) ([#2091](https://github.com/LemmyNet/lemmy/issues/2091))
- Alpha-ordering community follows. Fixes [#2062](https://github.com/LemmyNet/lemmy/issues/2062) ([#2079](https://github.com/LemmyNet/lemmy/issues/2079))
- Add federation tests for Friendica, improve parsing of source field (fixes [#2057](https://github.com/LemmyNet/lemmy/issues/2057)) ([#2070](https://github.com/LemmyNet/lemmy/issues/2070))

### Lemmy UI

- Rename theme files from _.min.css to _.css ([#590](https://github.com/LemmyNet/lemmy-ui/issues/590))
- Custom themes ([#584](https://github.com/LemmyNet/lemmy-ui/issues/584))
- Add option to set site default theme (fixes [#559](https://github.com/LemmyNet/lemmy-ui/issues/559))
- Adding nofollow to links. Fixes [#542](https://github.com/LemmyNet/lemmy-ui/issues/542) ([#543](https://github.com/LemmyNet/lemmy-ui/issues/543))
- Fix language names ([#580](https://github.com/LemmyNet/lemmy-ui/issues/580))
- Move fedi link in post listing location. Fixes [#569](https://github.com/LemmyNet/lemmy-ui/issues/569) ([#583](https://github.com/LemmyNet/lemmy-ui/issues/583))
- Don't redirect on server error. Fixes [#570](https://github.com/LemmyNet/lemmy-ui/issues/570) ([#582](https://github.com/LemmyNet/lemmy-ui/issues/582))
- Smart select inner content after bold or italics. Fixes [#497](https://github.com/LemmyNet/lemmy-ui/issues/497) ([#577](https://github.com/LemmyNet/lemmy-ui/issues/577))
- Fix comment jumping. Fixes [#529](https://github.com/LemmyNet/lemmy-ui/issues/529) ([#576](https://github.com/LemmyNet/lemmy-ui/issues/576))
- Add federated post and comment links. Fixes [#569](https://github.com/LemmyNet/lemmy-ui/issues/569) ([#575](https://github.com/LemmyNet/lemmy-ui/issues/575))
- Fix community comments iso fetch. Fixes [#572](https://github.com/LemmyNet/lemmy-ui/issues/572) ([#574](https://github.com/LemmyNet/lemmy-ui/issues/574))
- Don't allow transfer site. ([#551](https://github.com/LemmyNet/lemmy-ui/issues/551))
- Fix report page bugs. Fixes [#558](https://github.com/LemmyNet/lemmy-ui/issues/558) ([#568](https://github.com/LemmyNet/lemmy-ui/issues/568))
- Fix post title link bug. Fixes [#547](https://github.com/LemmyNet/lemmy-ui/issues/547) ([#563](https://github.com/LemmyNet/lemmy-ui/issues/563))
- Add markdown footnotes. Fixes [#561](https://github.com/LemmyNet/lemmy-ui/issues/561) ([#562](https://github.com/LemmyNet/lemmy-ui/issues/562))
