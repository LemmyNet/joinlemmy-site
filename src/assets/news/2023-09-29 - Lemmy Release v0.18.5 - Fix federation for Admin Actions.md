# Lemmy v0.18.5 Release (2023-09-29)

_Written by @nutomic and @dessalines, 2023-09-29_

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Major Changes

This release fixes a problem with federation of moderation actions performed by admin accounts. Specifically there is an check when receiving remote federation actions, which is incorrectly rejecting them in some cases. The problem is fixed by this release.

There are no other changes.

## Support development

@dessalines and @nutomic are working full-time on Lemmy to integrate community contributions, fix bugs, optimize performance and much more. This work is funded exclusively through donations.

If you like using Lemmy, and want to make sure that we will always be available to work full time building it, consider [donating to support its development](https://join-lemmy.org/donate). No one likes recurring donations, but theyâ€™ve proven to be the only way that open-source software like Lemmy can stay independent and alive.

- [Liberapay](https://liberapay.com/Lemmy) (preferred option)
- [Open Collective](https://opencollective.com/lemmy)
- [Patreon](https://www.patreon.com/dessalines)
- [Cryptocurrency](https://join-lemmy.org/donate) (scroll to bottom of page)

## Upgrade instructions

Follow the upgrade instructions for [ansible](https://github.com/LemmyNet/lemmy-ansible#upgrading) or [docker](https://join-lemmy.org/docs/en/administration/install_docker.html#updating). There are no config or API changes with this release.

If you need help with the upgrade, you can ask in our [support forum](https://lemmy.ml/c/lemmy_support) or on the [Matrix Chat](https://matrix.to/#/#lemmy-admin-support-topics:discuss.online).

## Changes

### Lemmy

- Fix federation of admin actions ([#3988](https://github.com/LemmyNet/lemmy/pull/3988))
