Lemmy v0.18.2 Release
===

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Major Changes

This is an emergency release to fix the cross-site scripting vulnerability that was exploited earlier today. The attack used a bug in custom emoji code in order to exfiltrate admin login tokens. This release fixes the bug. Additionally it disallows inline Javascript using [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP). This should ensure that XSS vulnerabilities are impossible from now on.

Special thanks to @makotech222 and @sunaruas for these fixes.

Important note for instance admins: if your instance had any custom emojis configured, it is possible that the attacker has gained access to admin accounts. In order to invalidate all logins you need to execute the following command in PostgreSQL, and restart Lemmy afterwards.

```sql
UPDATE secret SET jwt_secret = gen_random_uuid();
```

## Upgrade instructions

Follow the upgrade instructions for [ansible](https://github.com/LemmyNet/lemmy-ansible#upgrading) or [docker](https://join-lemmy.org/docs/en/administration/install_docker.html#updating).

If you need help with the upgrade, you can ask in our [support forum](https://lemmy.ml/c/lemmy_support) or on the [Matrix Chat](https://matrix.to/#/#lemmy-admin-support-topics:discuss.online).

## Support development

We (@dessalines and @nutomic) have been working full-time on Lemmy for almost three years. This is largely thanks to support from [NLnet foundation](https://nlnet.nl/). 

If you like using Lemmy, and want to make sure that we will always be available to work full time building it, consider [donating to support its development](https://join-lemmy.org/donate). No one likes recurring donations, but they've proven to be the only way that open-source software like Lemmy can stay independent and alive.

## Changes

### Lemmy

- Improve api response times by doing send_activity asynchronously ([#3493](https://github.com/LemmyNet/lemmy/issues/3493))
- Updating `login.rs` with generic `incorrect_login` response. ([#3549](https://github.com/LemmyNet/lemmy/issues/3549))
- Use async email sender ([#3554](https://github.com/LemmyNet/lemmy/issues/3554))
- Upgrade all dependencies ([#3526](https://github.com/LemmyNet/lemmy/issues/3526))
- Only update site_aggregates for local site ([#3516](https://github.com/LemmyNet/lemmy/issues/3516))


### Lemmy-UI

- Reopen PR 1420 Feature add three six and nine months options frontend ([#1689](https://github.com/LemmyNet/lemmy-ui/issues/1689))
- Add nonce-based CSP header ([#1907](https://github.com/LemmyNet/lemmy-ui/issues/1907))
- Use the 'node' user instead of root when running. ([#1894](https://github.com/LemmyNet/lemmy-ui/issues/1894))
- Add community name to featured post action in Modlog ([#1891](https://github.com/LemmyNet/lemmy-ui/issues/1891))
- Use canonical URLs ([#1883](https://github.com/LemmyNet/lemmy-ui/issues/1883))
- Add theme option for compact that respects browser default ([#1870](https://github.com/LemmyNet/lemmy-ui/issues/1870))
- Update post listing to prefer local image when available ([#1858](https://github.com/LemmyNet/lemmy-ui/issues/1858))
- Disallow /modlog since it is not relevant for bots ([#1850](https://github.com/LemmyNet/lemmy-ui/issues/1850))
- Fix XSS vuln ([#1897](https://github.com/LemmyNet/lemmy-ui/issues/1897))
- User inferno prompt instead of handrolled one ([#1867](https://github.com/LemmyNet/lemmy-ui/issues/1867))
- Darkly tweak ([#1811](https://github.com/LemmyNet/lemmy-ui/issues/1811))
- Update lemmy-js-client and lemmy-translations ([#1848](https://github.com/LemmyNet/lemmy-ui/issues/1848))



