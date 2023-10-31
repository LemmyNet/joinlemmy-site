# First release of LemmyBB, a federated bulletin board written in Rust

_Written by @nutomic, 2022-09-14_

We are excited to announce the release of lemmyBB. This is an alternative frontend for Lemmy, based on the design of [phpBB](https://www.phpbb.com/). It turns Lemmy from a link aggregator with upvotes and image previews into a traditional forum, or bulletin board.

![](https://lemmy.ml/pictrs/image/8d2509c3-d508-4d18-a735-4196d62dbd12.png)

[Lemmy](https://github.com/LemmyNet/lemmy) is a self-hosted discussion platform which supports Activitypub for federation with other servers. It is completely free and open, and not controlled by any company. This means that there is no advertising, tracking, or secret algorithms. Content is organized into communities, so it is easy to subscribe to topics that you are interested in, and ignore others.

By combining these projects, we get the benefits of both: a stable and performant backend which supports Activitypub federation, has an extensive API with mod tools and much more. Together with a classical frontend that is focused on text-based discussion, with no distraction of voting or overt number of image posts.

The easiest way to try lemmyBB is by signing up on the flagship instance [fedibb.ml](https://fedibb.ml/) and joining the discussion. You can also install your own instance by following [these instructions](https://github.com/LemmyNet/lemmyBB#installation). Resource usage is very low as everything is written in Rust (except the PostgreSQL database). Fedibb.ml uses about 70 MB of RAM and a negligible amount of CPU.

There are still many things to work on, and some missing features need to be added. A lot of polishing also needs to be done. Contributions are more than welcome, so if this sounds interesting, [consider getting involved](https://github.com/LemmyNet/lemmyBB)!

LemmyBB can also serve as an example of Lemmy's potential as a generic backend for social media platforms. Instead of starting a project from scratch to write an API, database logic, authentication, federation etc, you could create a frontend for Lemmy. This can be written in your language of choice, and only needs to render HTML, and use the [Lemmy API](https://join-lemmy.org/api/index.html). This doesn't have to be a forum, a blogging platform or image gallery would also be possible.

To be clear, lemmyBB is not meant to replace phpBB and it will never have all the same features. It was simply much easier to use this approach for someone like me who doesn't know much about frontend development. In that sense, I want to give a big thanks to the phpBB developers for publishing their work as open source, and making this project possible!
