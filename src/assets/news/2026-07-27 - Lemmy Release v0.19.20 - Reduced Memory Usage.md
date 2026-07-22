# Lemmy Release v0.19.20 - Reduced Memory Usage

## What is Lemmy?

Lemmy is a self-hosted social link aggregation and discussion platform. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others. Voting is used to bring the most interesting items to the top.

## Changes

This release significantly reduces memory usage for the Lemmy backend. Metrics on production instances show a reduction up to 10 times. Here you can see the statistics from a few different instances. Read on for a technical explanation below. Note that the change only affects x86, there is no difference on ARM (e.g. Raspberry Pi), see [here for details](https://github.com/LemmyNet/lemmy/issues/5695).

![](https://github.com/user-attachments/assets/2436e7ff-aed4-4eb5-9b0a-da872b636e9b)

_lemmy.ml (overall RAM usage including OS, Docker, PostgreSQL etc):_

![](https://lemmy.ml/pictrs/image/dc6ee927-1e6b-4305-9422-3fa651ca885e.png)

_leminal.space (backend container only)_

![](https://lemmy.ml/pictrs/image/6a0cac14-a6e2-4015-b7b5-e66040bb23a5.png)

_lemmy.world (backend API containers)_

![](https://lemmy.ml/pictrs/image/60c25504-bbaf-492b-9b68-972a3b8773c3.png)

_lemmy.world (backend federation and scheduled tasks)_

How was such a major improvement possible? Memory usage in languages like Rust or C is managed by a so-called memory allocator. It requests large chunks of RAM from the operating system, and provides smaller chunks when needed in the program. For example, every string (such as post titles or markdown text) require chunks of memory to store them. When processing the data is completed, the memory should be freed and released, or reused.

Until version 0.19.19 Lemmy used the `mimalloc` memory allocator, which is supposedly better than the default `glibc` allocator. Yet a [recent blog post](https://pranitha.dev/posts/rust-and-memory-allocators/) points out that `mimalloc` does not play well with the `tokio` async runtime. It suggests to use `jemalloc` instead. Changing memory allocators is very simple in Rust, it only requires a [single line of code](https://github.com/LemmyNet/lemmy/pull/6604/changes/f6e17228319c7ec0441270a086cdc50bef78e1fd). So we tried that, deployed the change on lemmy.ml and it immediately proved effective.

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
