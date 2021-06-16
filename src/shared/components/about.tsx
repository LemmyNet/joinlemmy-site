import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";

const title = i18n.t("about_title");

export class About extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }
  render() {
    return (
      <div>
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <div class="container">
          <h1>{i18n.t("about_title")}</h1>
          <p>The idea to make Lemmy was a combination of factors.</p>
          <p>
            Open source developers like myself have long watched the rise of the
            “Big Five”, the US tech giants that have managed to capture nearly
            all the world’s everyday communication into their hands. We’ve been
            asking ourselves why people have moved away from content-focused
            sites, and what we can do to subvert this trend, in a way that is
            easily accessible to a non-tech focused audience.
          </p>
          <p>
            The barriers to entry on the web, are much lower than say in the
            physical world: all it takes is a computer and some coding knowhow…
            yet the predominating social media firms have been able to stave off
            competition for at least two reasons: their sites are easy to use,
            and they have huge numbers of users already (the “first mover”
            advantage). The latter is more important; if you’ve ever tried to
            get someone to use a different chat app, you’ll know what I mean.
          </p>
          <p>
            Now I loved early reddit, not just for the way that it managed to
            put all the news for the communities and topics I wanted to see in a
            single place, but for the discussion trees behind every link posted.
            I still have many of these saved, and have gained so much more from
            the discussion behind the links, than I have from the links
            themselves. In my view, its the community-focused, tree-like
            discussions, as well as the ability to make, grow, and curate
            communities, that has made reddit the 5th most popular site in the
            US, and where so many people around the world get their news.
          </p>
          <p>
            But that ship sailed years ago; the early innovative spirit of
            reddit left with Aaron Schwartz: its libertarian founders have
            allowed some of the most racist and sexist online communities to
            fester on reddit for years, only occasionally removing them only
            when community outcry reaches a fever pitch. Reddit closed its
            source code years ago, and the reddit redesign has become a bloated
            anti-privacy mess.
          </p>
          <p>
            Its become absorbed into that silicon valley surveillance-capitalist
            machine that commidifies users to sell ads and paid flairs, and
            propagandizes pro-US interests above all. Software technology being
            one of the last monopoly exports the US has, it would be naive to
            think that one of the top 5 most popular social media sites, where
            so many people around the world get their news, would be anything
            other than a mouthpiece for the interests of those same US coastal
            tech firms.
          </p>
          <p>
            Despite the conservative talking point that big tech is dominated by
            “leftist propaganda”, it is liberal, and pro-US, not left (leftism
            referring to the broad category of anti-capitalism). Reddit has
            banned its share of leftist users and communities, and the reddit
            admins via announcement posts repeatedly villify the US’s primary
            foreign-policy enemies as having “bot campaigns”, and “manipulating
            reddit”, yet the default reddit communities (/r/news, /r/pics, etc),
            who share a small number of moderators, push a line consistent with
            US foreign-policy interests. The aptly named /r/copaganda subreddit
            has exposed the pro-police propaganda that always seems to hit
            reddit’s front page in the wake of every tragedy involving US police
            killing the innocent (or showing police kissing puppies, even though
            US police kill ~ 30 dogs every day, which researchers have called a
            “noted statistical phenomenon”).
          </p>
          <p>
            We’ve also seen a rise in anti-China posts that have hit reddit
            lately, and along with that comes anti-chinese racism, which reddit
            tacitly encourages. That western countries are seeing a rise in
            attacks against Asian-Americans, just as some of the perpetrators of
            several hate-crimes against women were found to be redditors active
            in mens-rights reddit communities, is not lost on us, and we know
            where these tech companies really stand when it comes to violence
            and hate speech. Leftists know that our position on these platforms
            is tenable at best; we’re currently tolerated, but that will not
            always be the case.
          </p>
          <p>
            The idea for making a reddit alternative seemed pointless, until
            Mastodon (a federated twitter alternative), started becoming
            popular. Using activitypub (a protocol / common language that social
            media services can use to speak to each other), we finally have a
            solution to the “first mover” advantage: now someone can build or
            run a small site, but still be connected to a wider universe of
            users.
          </p>
          <p>
            Nutomic and I originally made Lemmy to fill the role as a federated
            alternative to reddit, but as it grows, it has the potential become
            a main source of news and discussion, existing outside of the US’s
            jurisdictional domain and control.
          </p>
          <i class="is-right">Written by Dessalines, December 2020.</i>
        </div>
      </div>
    );
  }
}
