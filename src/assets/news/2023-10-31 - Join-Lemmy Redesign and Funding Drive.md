# Join-Lemmy Redesign and Funding Drive

_Written by @nutomic and @dessalines, 2023-10-31_

## Intro

Some months have passed on since the [Reddit blackout](https://join-lemmy.org/news/2023-06-17_-_Update_from_Lemmy_after_the_Reddit_blackout) this June. It led to an explosive growth in Lemmy users, and lots of urgent work in scaling, bug fixes, user onboarding and more. Since then things have calmed down significantly, giving us breathing room and time to get more long-term work done.

As of Nov. 2023, Lemmy is at **~36k active daily users** 🥳 (_those who have posted or commented within the last month_). While user counts are not an explicit goal of ours, this is still a tremendous achievement, and one which we can all be proud to be a part of. It shows that people _truly do_ want alternatives to US tech companies, and will use them if they exist.

## Join-Lemmy Redesign

Most recently we've been working on a redesign of join-lemmy.org to provide a better onboarding experience and cater towards new users. This includes:

- A helpful new [instance picker](http://join-lemmy.org/?showJoinModal=true) to reduce [choice overload](https://thedecisionlab.com/reference-guide/psychology/choice-overload).
- The [instances page](http://join-lemmy.org/instances) is now _filterable_, based a set of topics and languages, as well as _sortable_ based on activity. The default sort is `Random`, to encourage people to join smaller servers.
- The [apps](http://join-lemmy.org/apps) page now has sections for Android, iOS, and web apps, as well as libraries. Feel free to do a pull request to add any apps that are missing.
- The [donate](http://join-lemmy.org/apps) page now shows the total amount of monthly donations across all platforms. More details below.
- The technology used is Typescript with [tailwind](https://tailwindcss.com/) and [daisyUI](https://daisyui.com/) CSS frameworks.

**For server admins**: If your instance isn't listed already, you must explicitly add your server topics and languages by doing a pull request to [this file](https://github.com/LemmyNet/joinlemmy-site/blob/4bd4d7a0c450addb8696db22813796b7cf1de3c2/src/shared/components/instances-definitions.ts).

As you may have noticed, texts on the website are unchanged, and images on the main page are still generic placeholders. We are hoping for your contributions to improve them. For the texts, edit [this file](https://github.com/LemmyNet/joinlemmy-translations/blob/1bc69869fda7ee144ddfbc4d9fb29af3a0d4619e/translations/en.json). Translations are managed via [weblate](https://weblate.join-lemmy.org/projects/lemmy/joinlemmy/). Images are located in [this folder](https://github.com/LemmyNet/joinlemmy-site/tree/main/src/assets/images). If you are good with AI tools, consider replacing `main_federation.webp` and similar with more colorful images. More `main_screen_x.webp` images with custom themes or alternative frontends would be nice too. In general feel free to open issues or pull requests for improvements to the site.

## Funding Drive

Before the Reddit migration, our income was almost exclusively made up of generous donations from the [NLnet foundation](https://nlnet.nl/). This funding was based on getting paid for implementing new features, specified in advance.

We've known that this funding could not last indefinitely, and that after several years of funding, NLnet's resources are better spent getting other projects up and running. Additionally, much of our time is spent on other equally important work: reviewing changes from community contributors, fixing bugs, doing support, and various organizational tasks.

That is why we are launching our first **annual funding drive**. The goal is to increase monthly, recurring donations from currently €4.000 to at least €12.000. With this amount @dessalines and @nutomic can each receive a yearly salary of €50.000 which is in line with [median developer salaries](https://www.developersalary.com/). It will also allow one additional developer to work fulltime on Lemmy and speed up development.

Recurring donations from Lemmy users are the most sustainable solution for the future. It also means that we need to worry less about funding, and can focus more on improving Lemmy. And instead of being accountable to an external organization, we work **directly for Lemmy's users**. While one-time donations are also welcome, they are too unpredictable for long-term planning.

You can find available donation options on the [donate page](http://join-lemmy.org/donate). This page was also updated during the redesign to display current donations and funding goals. If each active Lemmy user donated **~€0.33 per month** it would be enough for 3 full-time developers. So please consider donating if you use Lemmy every day. Our preferred donation platform is Liberapay because it doesn't have any payment fees or delays, and is itself open source.

Besides Lemmy's developers, please consider donating to those who develop open-source apps or software for the Lemmy ecosystem, as well as server admins and moderation teams who are the backbone of the Lemmyverse. We would be happy to add donation links for the above to join-lemmy.org as well!

If you have any suggestions in regards to the topics mentioned in this post, please let us know. We also want to use this opportunity to thank the countless contributors who are working on Lemmy now.
