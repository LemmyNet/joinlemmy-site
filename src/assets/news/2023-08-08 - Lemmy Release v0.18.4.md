# Lemmy v0.18.4 Release (2023-08-08)

_Written by @nutomic, 2023-08-08_

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Major Changes

This version fixes the problem of comment context not loading properly. It also fixes a couple other bugs.

## Support development

@dessalines and @nutomic are working full-time on Lemmy to integrate community contributions, fix bugs, optimize performance and much more. This work is funded exclusively through donations.

If you like using Lemmy, and want to make sure that we will always be available to work full time building it, consider [donating to support its development](https://join-lemmy.org/donate). No one likes recurring donations, but they’ve proven to be the only way that open-source software like Lemmy can stay independent and alive.

- [Liberapay](https://liberapay.com/Lemmy) (preferred option)
- [Open Collective](https://opencollective.com/lemmy)
- [Patreon](https://www.patreon.com/dessalines)
- [Cryptocurrency](https://join-lemmy.org/donate) (scroll to bottom of page)

## Upgrade instructions

Follow the upgrade instructions for [ansible](https://github.com/LemmyNet/lemmy-ansible#upgrading) or [docker](https://join-lemmy.org/docs/en/administration/install_docker.html#updating). There are no config or API changes with this release.

If you need help with the upgrade, you can ask in our [support forum](https://lemmy.ml/c/lemmy_support) or on the [Matrix Chat](https://matrix.to/#/#lemmy-admin-support-topics:discuss.online).

## Changes

### Lemmy

- Fix fetch instance software version from nodeinfo ([#3772](https://github.com/LemmyNet/lemmy/issues/3772))
- Correct logic to meet join-lemmy requirement, don't have closed signups. Allows Open and Applications. ([#3761](https://github.com/LemmyNet/lemmy/issues/3761))
- Fix ordering when doing a comment_parent type `list_comments` ([#3823](https://github.com/LemmyNet/lemmy/issues/3823))

### Lemmy-UI

- Mark post as read when clicking "Expand here" on the preview image on the post listing page ([#1600](](https://github.com/LemmyNet/lemmy/issues/1600)) ([#1978](](https://github.com/LemmyNet/lemmy/issues/1978))
- Update translation submodule ([#2023](](https://github.com/LemmyNet/lemmy/issues/2023))
- Fix comment insertion from context views. Fixes #2030 ([#2031](](https://github.com/LemmyNet/lemmy/issues/2031))
- Fix password autocomplete ([#2033](](https://github.com/LemmyNet/lemmy/issues/2033))
- Fix suggested title "&nbsp;" spaces ([#2037](](https://github.com/LemmyNet/lemmy/issues/2037))
- Expanded the RegEx to check if the title contains new line caracters. Should fix issue #1962 ([#1965](](https://github.com/LemmyNet/lemmy/issues/1965))
- ES-Lint tweak ([#2001](](https://github.com/LemmyNet/lemmy/issues/2001))
- Upgrading deps, running prettier. ([#1987](](https://github.com/LemmyNet/lemmy/issues/1987))
- Fix document title of admin settings being overwritten by tagline and emoji forms ([#2003](](https://github.com/LemmyNet/lemmy/issues/2003))
- Use proper modifier key in markdown text input on macOS ([#1995](](https://github.com/LemmyNet/lemmy/issues/1995))
