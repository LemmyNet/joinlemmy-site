# NLnet funding, and Lemmy v0.7.0 with new image hosting!

_Written by @dessalines and @nutomic, 2020-06-23_

Let's start with the biggest news first: Lemmy is receiving funding from the [NLnet foundation](https://nlnet.nl/)! The funding is for a total amount of 45.000 €, which will allow [/u/dessalines](/u/dessalines) and me ([/u/nutomic](/u/nutomic) ) to work on Lemmy full-time for at least half a year.

We have created various milestones for the work we are planning to do. Most of them are about getting ActivityPub federation ready for production. In addition, we will work on:

- better accessibility
- private communities and instances
- reworking search
- creating a `joinlemmy.ml` type site
- the option to block other users or communities

The details of the milestones will be posted on our github issue tracker soon.

We're very excited about this opportunity, and can't wait to finish federation.

In other news, we have just released [Lemmy v0.7.0.](https://github.com/LemmyNet/lemmy/blob/master/RELEASES.md#lemmy-v070-release-2020-06-2x) Most importantly, this update switches to [Pict-rs](https://git.asonix.dog/asonix/pict-rs/) for image hosting, due to various performance-related issues with Pictshare. Pict-rs was coded from scratch in Rust by the amazing @asonix, who also created the ActivityPub library for Rust. We can't thank him enough for all the work he is doing for Lemmy!

We'd also like to thank the following people for their contributions:

- @iav for their work in building arm compatible rust docker images and builds.
- @ernestwisniewski and @bytesnake for code contributions.
- Many others for contributing translations via the [Lemmy weblate.](https://weblate.yerbamate.dev/projects/lemmy/)
- Our [Patreon](https://www.patreon.com/dessalines) and [Liberapay](https://liberapay.com/Lemmy/) supporters who help us devote more time to Lemmy (We're still very far from these being able to sustain two developers)
- Everyone else who contributes to Lemmy, be it by coding, hosting instances or just using it and spreading the word!

Other than that, since v0.6.0 in January [we've closed over 100 issues](https://github.com/LemmyNet/lemmy/milestone/16?closed=1), fixed tons of bugs and added many new features.

[You can find the full changelog and upgrade instructions here](https://github.com/LemmyNet/lemmy/blob/master/RELEASES.md#lemmy-v070-release-2020-06-2x).

Edit: [Here are the milestones for the funding](https://dev.lemmy.ml/post/35612)
