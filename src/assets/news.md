# Federation with Mastodon and Pleroma

*Written by @dessalines and @nutomic, 2021-11-17*

Today is an exciting day for the Lemmy project.

Almost one year after [first enabling federation](https://lemmy.ml/post/42833), we now federate with other projects for the first time! According to some people's definition, this finally makes us part of the Fediverse.

It took a lot of work to make this possible, so big thanks to [NLnet](https://nlnet.nl/) for funding our full time work on Lemmy, and to [@lanodan](https://queer.hacktivis.me/users/lanodan) and [@asonix](https://masto.asonix.dog/@asonix) for helping to figure out how Pleroma and Mastodon federation works (it's difficult because they have almost no documentation).

## What is Lemmy?

[Lemmy](https://join-lemmy.org/) is similar to sites like Reddit, Lobste.rs, or Hacker News: you subscribe to communities you're interested in, post links and discussions, then vote and comment on them. Lemmy isn't just a reddit alternative; its a network of interconnected communities ran by different people and organizations, all combining to create a single, personalized front page of your favorite news, articles, and memes.

## Major Changes

### Federation code rewrite

The rewrite of the federation code started by @nutomic in August is now mostly complete. As a result, the code is much cleaner, and has tests to guarantee no breaking changes between Lemmy versions. As a side effect of this rewrite, it was now relatively easy to enable federation with other projects. 

Mastodon and Pleroma users can:

- View Lemmy communities, user profiles, posts and comments
- Follow Lemmy communities to receive new posts and comments
- Replies (mentions) work in both directions, including notifications

In addition, Pleroma users can exchange private messages with Lemmy users.

Note that Pleroma and Mastodon rely on a compatibility mode in Lemmy, which means that they won't receive events like Deletes or Votes. Other projects whose federation works similar to Pleroma/Mastodon  will likely also federate.

### Hardcoded slur filter removed

Lemmy finally has essential moderation tools (reporting, user/community blocking), so the hardcoded filter isn't necessary anymore. If you want to keep using the slur filter, copy [these lines](https://github.com/LemmyNet/lemmy/blob/b18ea3e0cc620c3f97f9804c09b92f193809b846/config/config.hjson#L8-L12) to your config file when upgrading, and adjust to your liking.

---

# Lemmy.ml now uses open federation

*Written by @dessalines, 2021-09-04*

You no longer have to ask us to add you manually, you can subscribe and interact without the approval process.

--- 

# Promoting Lemmy

*Written by @nutomic, 2021-08-09*

I think most of us agree that the main problem which Lemmy has today is its lack of users. This is not for technical reasons, as we know it is quite stable and usable. The main cause is that the project is not widely known yet. In this post I will propose what we can do to change that.

First, lets clarify why we should promote Lemmy. Clearly there are many different reasons, and every person prioritizes them differently. So I will just give some common examples:

- Promote open source (and all the benefits that entails)
- No advertising or tracking
- Allow communities to manage themselves, instead of being controlled by corporations
- Making Lemmy more active, particularly if you would like to see more discussions on certain topics

So how can we promote Lemmy? 

I think one of the most effective thing we can do at this point is to post about Lemmy in other communities where we are active. This has the benefit that other people already trust us to some degree. Open source projects looking to setup a forum might also be a good target. When doing this, we should consider which aspects of the project would be most important to the target audience, and emphasize those.

Another option is to contact bloggers, video creators, podcasters or others, and suggest that they report about Lemmy. As above, it is important to adjust the message to the target audience. Because Lemmy is quite small, it is unlikely that major tech magazines or professional content creators would care about it. Instead we should focus on smaller creators. This will also lead to more sustainable growth, and give us some legitimacy in the eyes of bigger creators.

In both cases, we should avoid doing anything that might be perceived as spam. It is better to create one or two high-quality messages, which will give a good impression of the project, rather than a dozen generic ones that tarnish the reputation.

It is worth noting that some important features are still missing in Lemmy, particularly mod tools (we are going to implement them in the next ~12 months). There also aren't many different instances yet. 

When promoting Lemmy like this, please avoid linking to lemmy.ml directly. This instance is already too big relative to other instances, and it is not meant to be a "flagship instance" ([What is lemmy.ml?](https://lemmy.ml/post/70280)). Instead you should try to find an appropriate instance on [join-lemmy.org](https://join-lemmy.org/instances) and link to it, or link to the joinlemmy site directly. You can also explicitly encourage the creation of new instances.

On a side note, it might be worth mentioning the many ways that people can contribute to Lemmy (again depending on the audience). There are the obvious ones, like writing code for lemmy and lemmy-ui, writing documentation or translating. There are also multiple interesting options to create new projects, such as:
- Create an [alternative frontend](https://join-lemmy.org/docs/en/client_development/custom_frontend.html): nojs frontend like [lemmy-lite](https://github.com/IronOxidizer/lemmy-lite), a traditional forum frontend or something like stackoverflow
- Create a new client, be it for mobile, desktop or terminal.
- Gather instance statistics using [lemmy-stats-crawler](https://yerbamate.ml/LemmyNet/lemmy-stats-crawler), and build some nice graphs.

By the way, Lemmy is not just a Reddit alternative, so there is no reason to limit the promotion to Reddit. 

To help with these promotion efforts, [@dessalines](https://lemmy.ml/u/dessalines)  and I would be happy to give interviews via email (in English, German or Spanish). For that, they can get in touch by mailing contact@lemmy.ml.
