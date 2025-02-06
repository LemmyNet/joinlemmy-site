# Breaking Changes in Lemmy 1.0

The major breaking changes for version 1.0 are already implemented. However it will still take a lot of work to implement the new features in lemmy-ui, and publish the final release. So this is a good time for developers of Lemmy clients to start adapting the new API, and suggest changes before it gets finalized.

If you use any apps, frontends or bots for Lemmy, please help us out by notifying the developers about this post.

With the new version there is all new [documentation based on OpenAPI](https://join-lemmy.org/api/main), thanks to @dessalines and @MV-GH. You can also test the new API on [voyager.lemmy.ml](https://voyager.lemmy.ml), and with version `1.0.0-alpha.1`. Note that this server still uses lemmy-ui 0.19.8 with API v3, because lemmy-ui is not updated for the new backend version yet.

Unfortunately there is no good way to see all the API changes between 0.19 and 1.0, but you can try viewing the [diff in lemmy-js-client](https://github.com/LemmyNet/lemmy-js-client/compare/release/v0.19...main), or look at the [OpenAPI docs](https://join-lemmy.org/api/main).

If you have any questions about these changes, feel free to post in [!lemmy_support@lemmy.ml](https://lemmyverse.link/c/lemmy_support@lemmy.ml) or in the [Development Chat on Matrix](https://matrix.to/#/#lemmydev:matrix.org). If you have suggestions for breaking API changes before the new version is finalized, [open an issue](https://github.com/LemmyNet/lemmy/issues).

Here are the major API changes in detail. As this is an alpha version there may be further breaking changes before the final release, but nothing major.

## Rename account endpoints

Various endpoints have been renamed, especially those under `/api/v3/user` have been moved to `/api/v4/account/auth`. These changes are fully compatible as the endpoints can still be called under `/api/v3`.

- `/api/v3/user/register` to `/api/v4/account/auth/register`
- `/api/v3/user/login` to `/api/v4/account/auth/login`
- `/api/v3/user/logout` to `/api/v4/account/auth/logout`
- ...
- `/api/v4/site` doesn't have `my_user` anymore, this is now available at [`GET /api/v4/account`](https://join-lemmy.org/api/main#operation/GetMyUser)

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

## Other Breaking Changes

This list is likely incomplete.

- [Adding a default_comment_sort_type column for local_site and local_user](https://github.com/LemmyNet/lemmy/pull/4469)
- [Removing local_user.show_scores column, since its now on the local_user_vote_display_mode table.](https://github.com/LemmyNet/lemmy/pull/4497)
- [Move custom emojis and tagline views to separate endpoints](https://github.com/LemmyNet/lemmy/pull/4580)
- [Remove pointless block_views](https://github.com/LemmyNet/lemmy/pull/4841)
- [Adding ability to restore content on user unban](https://github.com/LemmyNet/lemmy/pull/4845)
- [Changing list_logins to return a ListLoginsResponse object.](https://github.com/LemmyNet/lemmy/pull/4888)
- [Remove pointless local_user_id from LocalUserVoteDisplayMode](https://github.com/LemmyNet/lemmy/pull/4890)
- [Remove enable nsfw](https://github.com/LemmyNet/lemmy/pull/5017)
- [Instance blocks with mod log entry and expiration](https://github.com/LemmyNet/lemmy/pull/5214)
- [Rename actor_id columns to ap_id](https://github.com/LemmyNet/lemmy/pull/5393)
- [Include saved date in api responses](https://github.com/LemmyNet/lemmy/pull/5384)

## New Features (not breaking)

This list is definitely incomplete, and more features will be added before the final release.

- New parameters for [GET /api/v4/search](https://join-lemmy.org/api/main#tag/Miscellaneous/operation/Search)
- New parameters for [GET /api/v4/post/list](https://join-lemmy.org/api/main#tag/Post/operation/GetPosts)
- [Adding a get_random_community endpoint.](https://github.com/LemmyNet/lemmy/pull/5042) - [GET /api/v4/community/random](https://join-lemmy.org/api/main#tag/Community/operation/GetRandomCommunity)
- [Adding a can_mod field to CommentView, PostView, and CommunityView.](https://github.com/LemmyNet/lemmy/pull/5398) (not yet merged)
- [Private communities](https://github.com/LemmyNet/lemmy/pull/5076)
- [SSO support](https://github.com/LemmyNet/lemmy/pull/4881)
- [Request idempodency support](https://github.com/LemmyNet/lemmy/pull/5329)
- [Add support for donation dialog](https://github.com/LemmyNet/lemmy/pull/5318)
- [Return correct status code for rate limit error](https://github.com/LemmyNet/lemmy/pull/5333)
- [Add media filter setting](https://github.com/LemmyNet/lemmy/pull/5325)
- [Post scheduling](https://github.com/LemmyNet/lemmy/pull/5025)
- [Slim comment views](https://github.com/LemmyNet/lemmy/pull/5335) - [GET `/api/v4/comment/list/slim`](https://join-lemmy.org/api/main#tag/Comment/operation/GetCommentsSlim)