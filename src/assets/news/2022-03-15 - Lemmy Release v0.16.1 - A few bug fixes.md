# Lemmy v0.16.1 Release

A few bug fixes:

## Lemmy

- Revert "Add logging to debug federation issues (ref [#2096](https://github.com/LemmyNet/lemmy/issues/2096)) ([#2099](https://github.com/LemmyNet/lemmy/issues/2099))" ([#2130](https://github.com/LemmyNet/lemmy/issues/2130))
- Dont allow admin to add mod to remote community ([#2129](https://github.com/LemmyNet/lemmy/issues/2129))
- Reject federated downvotes if downvotes are disabled (fixes [#2124](https://github.com/LemmyNet/lemmy/issues/2124)) ([#2128](https://github.com/LemmyNet/lemmy/issues/2128))

## Lemmy-ui

- Fix error during new site setup ([#596](https://github.com/LemmyNet/lemmy-ui/issues/596))
- Differentiate between mods and admins in mod log ([#597](https://github.com/LemmyNet/lemmy-ui/issues/597))
- Fix comment fedilink (fixes [#594](https://github.com/LemmyNet/lemmy-ui/issues/594)) ([#595](https://github.com/LemmyNet/lemmy-ui/issues/595))
