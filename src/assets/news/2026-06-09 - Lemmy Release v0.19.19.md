# Lemmy Release v0.19.19

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Changes

This version again includes a couple of security fixes. Thanks to the people who found and reported them!

The first one in particular requires manual action from instance admins. Lemmy's default Nginx config uses `$proxy_add_x_forwarded_for` to set the `X-Forwarded-For` header, which does not override existing values. So clients can spoof the IP and bypass rate limits. The solution is to use `$remote_addr` instead. If you use Ansible this will be changed automatically during the upgrade, otherwise you will need to do it manually. If you dont use Nginx, ensure that any `X-Forwarded-For` headers sent by the client are overwritten.

The remaining security vulnerabilities are in the Lemmy code itself, and will be fixed simply by upgrading.

Security:

- [Rate limit bypass via X-Forwarded-For header spoofing in actix-web ConnectionInfo](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-2hrg-7x4g-9vpg)
- [Login Endpoint User Enumeration via HTTP Response Code and Timing](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-xgg7-8hvq-8m65)
- [Blocked users can edit private messages sent before the block](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-46g9-847m-qf8r)
- [Lower-ranked federated moderator can remove higher-ranked moderators via federation](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-xmpx-2j2f-c7g7)
- [Featuring post over federation does not validate community nor write modlog](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-gwfj-h8r7-792v)
- [Stored XSS via markdown image alt-text in lemmy-ui html5-embed](https://github.com/LemmyNet/lemmy/security/advisories/GHSA-2g66-9fr3-ppwj)

## Upgrade instructions

There are no breaking changes with this release.

Follow the upgrade instructions for [ansible](https://github.com/LemmyNet/lemmy-ansible/blob/main/UPGRADING.md) or [docker](https://join-lemmy.org/docs/en/administration/install_docker.html#updating).

If you need help with the upgrade, you can ask in our [support forum](https://lemmy.ml/c/lemmy_support) or on the [Matrix Chat](https://matrix.to/#/!OwmdVYiZSXrXbtCNLw:matrix.org).

## Thanks to everyone

We'd like to thank our many contributors and users of Lemmy for coding, translating, testing, and helping find and fix bugs. We're glad many people find it useful and enjoyable enough to contribute.

## Support development

We (@dessalines and @nutomic) have been working full-time on Lemmy for over five years. This is largely thanks to support from [NLnet foundation](https://nlnet.nl/), as well as [donations from individual users](https://join-lemmy.org/donate).

If you like using Lemmy, and want to make sure that we will always be available to work full time building it, consider [donating to support its development](https://join-lemmy.org/donate). A recurring donation is the best way to ensure that open-source software like Lemmy can stay independent and alive, and helps us grow our little developer co-op to support more full-time developers.

- [Liberapay](https://liberapay.com/Lemmy) (preferred option)
- [Open Collective](https://opencollective.com/lemmy)
- [Patreon](https://www.patreon.com/dessalines)
- [Cryptocurrency](https://join-lemmy.org/crypto)
