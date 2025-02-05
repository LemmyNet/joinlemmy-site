# Breaking Changes in Lemmy 1.0

The major breaking changes for version 1.0 are already implemented. However it will still take a lot of work to implement the new features in lemmy-ui, and publish the final release. So this is a good time for developers of Lemmy clients to start adapting the new API, and suggest changes before it gets finalized.

If you use any apps, frontends or bots for Lemmy, please help us out by notifying the developers about this post.

With the new version there is all new [documentation based on OpenAPI](https://join-lemmy.org/api/main), thanks to @dessalines and @MV-GH. You can also test the new API on [voyager.lemmy.ml](https://voyager.lemmy.ml), and with version `1.0.0-alpha.1`. Note that this server still uses lemmy-ui 0.19.8 with API v3, because lemmy-ui is not updated for the new backend version yet.

Unfortunately there is no good way to see all the API changes between 0.19 and 1.0, but you can try viewing the [diff in lemmy-js-client](https://github.com/LemmyNet/lemmy-js-client/compare/release/v0.19...main), or look at the [OpenAPI docs](https://join-lemmy.org/api/main).

If you have any questions about these changes, feel free to post in [!lemmy_support@lemmy.ml](https://lemmyverse.link/c/lemmy_support@lemmy.ml) or in the [Development Chat on Matrix](https://matrix.to/#/#lemmydev:matrix.org). If you have suggestions for breaking API changes before the new version is finalized, [open an issue](https://github.com/LemmyNet/lemmy/issues).

In detail the following endpoints are changed with Lemmy 1.0:

## Rename account endpoints

Various endpoints have been renamed, especially those under `/api/v3/user` have been moved to `/api/v4/account/auth`. These changes are fully compatible as the endpoints can still be called under `/api/v3`.

- `/api/v3/user/register` to `/api/v4/account/auth/register`
- `/api/v3/user/login` to `/api/v4/account/auth/login`
- `/api/v3/user/logout` to `/api/v4/account/auth/logout`
- ...
- `/api/v3/site` field `my_user` removed, now available at [`GET /api/v4/account`](https://join-lemmy.org/api/main#operation/GetMyUser)

https://github.com/LemmyNet/lemmy/pull/5216

## Combined endpoints

There are various places in the UI where different types of data are shown together, for example posts and comments in the user profile. Until `0.19` these were queried separately, to display the (last 20 posts) and (last 20 comments). For `1.0` Dessalines implemented combined queries, so that the new endpoint `/api/v4/person/content` returns the last 20 (posts and comments). See the [issue](https://github.com/LemmyNet/lemmy/issues/2444) and linked pull requests for more details.

The combined endpoints are:

- [`GET /api/v4/person/content`](https://join-lemmy.org/api/main#operation/ListPersonContent)
- [`GET /api/v4/account/inbox`](https://join-lemmy.org/api/main#operation/ListInbox)
- [`GET /api/v4/account/saved`](https://join-lemmy.org/api/main#operation/ListPersonSaved)
- [`GET /api/v4/modlog`](https://join-lemmy.org/api/main#operation/GetModlog)
- [`GET /api/v4/report/list`](https://join-lemmy.org/api/main#operation/ListReports)
- [`GET /api/v4/search`](https://join-lemmy.org/api/main#operation/Search)

Note that the endpoints for modlog, report list and search also return combined data in API v3 on Lemmy `0.19`, because making them backwards compatible would require an unreasonable amount of work.

## Image endpoints

Uploading or deleting avatars, icons and banners is done through separate endpoints now. With this change it is possible to disable image uploads, while still allowing changes to avatars etc.

- [POST `/api/v4/account/avatar`](https://join-lemmy.org/api/main#operation/UploadUserAvatar)
- [DELETE `/api/v4/account/avatar`](https://join-lemmy.org/api/main#operation/DeleteUserAvatar)
- [POST `/api/v4/community/banner`](https://join-lemmy.org/api/main#operation/UploadCommunityBanner)
- ...

The endpoints for image upload and proxying have been moved to `GET /api/v4/image/{filename}` and `GET /api/v4/image/proxy` respectively.

https://github.com/LemmyNet/lemmy/pull/5260

## Slim comment views

When fetching comments for a single post, you can now use the following endpoint to get a `CommentSlimView` that doesn't needlessly contain the post or community.

- [GET `/api/v4/comment/list/slim`](https://join-lemmy.org/api/main#tag/Comment/operation/GetCommentsSlim)

https://github.com/LemmyNet/lemmy/pull/5335

## Other new Features

- [SSO support](https://github.com/LemmyNet/lemmy/pull/4881)
- [Private communities](https://github.com/LemmyNet/lemmy/pull/5076)
- [Request idempodency support](https://github.com/LemmyNet/lemmy/pull/5329)
- Lots of new parameters for search, list posts etc
