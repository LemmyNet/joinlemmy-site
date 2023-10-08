import { Component } from "inferno";
import { Link } from "inferno-router";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { T } from "inferno-i18next";
import { isBrowser } from "../utils";
import { Icon } from "./icon";
import {
  BottomSpacer,
  CARD_GRADIENT,
  SupportDonateBlock,
  TEXT_GRADIENT,
} from "./common";

const TitleBlock = () => (
  <div className="py-16 flex flex-col items-center">
    <div className="flex flex-col items-center gap-4 mb-8">
      <p className={`text-6xl font-bold ${TEXT_GRADIENT}`}>Lemmy</p>
      <p className="text-3xl font-medium text-center">{i18n.t("lemmy_desc")}</p>
    </div>
    <div className="flex flex-row justify-around gap-2">
      <JoinServerButton />
      <RunServerButton />
    </div>
  </div>
);

const CarouselBlock = () => (
  <div>
    <div className="carousel carousel-center p-4 space-x-4 rounded-box">
      <div id="item1" className="carousel-item w-10/12">
        <img
          src={"/static/assets/images/main_screenshot.webp"}
          className="rounded-box"
        />
      </div>
      <div id="item2" className="carousel-item w-10/12">
        <img
          src={"/static/assets/images/main_screenshot.webp"}
          className="rounded-box"
        />
      </div>
      <div id="item3" className="carousel-item w-10/12">
        <img
          src={"/static/assets/images/main_screenshot.webp"}
          className="rounded-box"
        />
      </div>
    </div>
    <div className="flex justify-center w-full py-2 gap-4">
      <a href="#item1" className={TEXT_GRADIENT}>
        ●
      </a>
      <a href="#item2" className={TEXT_GRADIENT}>
        ●
      </a>
      <a href="#item3" className={TEXT_GRADIENT}>
        ●
      </a>
    </div>
  </div>
);

const JoinServerButton = () => (
  <Link className="btn btn-primary text-white normal-case" to="/instances">
    {i18n.t("join_a_server")}
  </Link>
);

const RunServerButton = () => (
  <a
    class="btn btn-secondary text-white normal-case"
    href={`/docs/administration/administration.html`}
  >
    {i18n.t("run_a_server")}
  </a>
);

const FollowCommunitiesBlock = () => (
  <div className="flex flex-col items-center mt-16">
    <div className={`card card-bordered ${CARD_GRADIENT} shadow-xl`}>
      <div className="card-body items-center px-32 py-16">
        <T
          i18nKey="follow_communities"
          className="card-title font-bold text-4xl text-center mb-3 inline-block"
        >
          #<span className={TEXT_GRADIENT}>#</span>
        </T>
        <p class="text-sm text-gray-300 text-center mb-6">
          {i18n.t("lemmy_long_desc")}
        </p>
        <JoinServerButton />
      </div>
    </div>
  </div>
);

const FeatureCard = ({ pic, title, subtitle, classes }) => (
  <div className={`card card-bordered bg-neutral-800 shadow-xl ${classes}`}>
    <figure className="p-4">
      <img src={pic} className="rounded-xl w-full object-fill min-h-[300px]" />
    </figure>
    <div className="card-body">
      <h2 className="card-title text-secondary">{title}</h2>
      <p className="text-sm text-gray-300">{subtitle}</p>
    </div>
  </div>
);

const OpenSourceCard = ({ classes }) => (
  <FeatureCard
    classes={classes}
    pic={"/static/assets/images/main_open_source.webp"}
    title={i18n.t("open_source")}
    subtitle={
      <T i18nKey="open_source_desc">
        #
        <a className="link" href="https://github.com/LemmyNet">
          #
        </a>
        <a className="link" href="https://en.wikipedia.org/wiki/Copyleft">
          #
        </a>
        <a
          className="link"
          href="https://github.com/LemmyNet/lemmy/blob/master/LICENSE"
        >
          #
        </a>
      </T>
    }
  />
);

const BlazingFastCard = ({ classes }) => (
  <FeatureCard
    classes={classes}
    pic={"/static/assets/images/main_blazing_fast.webp"}
    title={i18n.t("blazing_fast")}
    subtitle={
      <T i18nKey="blazing_fast_desc">
        #
        <a className="link" href="https://www.rust-lang.org">
          #
        </a>
        <a className="link" href="https://actix.rs/">
          #
        </a>
        <a className="link" href="http://diesel.rs/">
          #
        </a>
        <a className="link" href="https://infernojs.org">
          #
        </a>
        <a className="link" href="https://www.typescriptlang.org/">
          #
        </a>
      </T>
    }
  />
);

const ModToolsCard = ({ classes }) => (
  <FeatureCard
    classes={classes}
    pic={"/static/assets/images/main_powerful.webp"}
    title={i18n.t("mod_tools")}
    subtitle={i18n.t("mod_tools_desc")}
  />
);

const CensorshipCard = ({ classes }) => (
  <FeatureCard
    classes={classes}
    pic={"/static/assets/images/main_censorship.webp"}
    title={i18n.t("censorship_resistant")}
    subtitle={i18n.t("censorship_resistant_desc")}
  />
);

const FederationCard = ({ classes }) => (
  <FeatureCard
    classes={classes}
    pic={"/static/assets/images/main_federation.webp"}
    title={i18n.t("federation")}
    subtitle={i18n.t("federation_desc")}
  />
);

const FeatureCardsBlock = () => (
  <div className="grid md:grid-cols-12 grid-cols-1 gap-4 mt-16">
    <OpenSourceCard classes="md:col-span-7" />
    <BlazingFastCard classes="md:col-span-5" />
    <ModToolsCard classes="md:col-span-4" />
    <CensorshipCard classes="md:col-span-4" />
    <FederationCard classes="md:col-span-4" />
  </div>
);

const DiscussionPlatformBlock = () => (
  <div className="flex flex-col items-center mt-16">
    <div className="card card-bordered bg-gradient-to-r text-transparent from-primary to-secondary shadow-xl">
      <div className="card-body items-center px-32 py-16">
        <T
          i18nKey="create_discussion_platform"
          className="card-title font-medium text-4xl text-center text-white mb-3 inline-block"
        >
          #<span className="font-bold">#</span>
        </T>
        <T
          i18nKey="create_discussion_platform_desc"
          className="text-sm text-white text-center mb-6"
        >
          #
          <a className="link" href={`/docs/administration/administration.html`}>
            #
          </a>
          <i>#</i>
          <a className="link" href="https://en.wikipedia.org/wiki/Fediverse">
            #
          </a>
        </T>
        <Link
          className="btn btn-primary bg-white text-primary normal-case"
          to="/instances"
        >
          {i18n.t("join_a_server")}
        </Link>
      </div>
    </div>
  </div>
);

const MoreFeaturesBlock = () => (
  <div className="mt-16">
    <T i18nKey="more_features" className={`text-center text-4xl mb-8`}>
      #<span className={TEXT_GRADIENT}>#</span>
    </T>
    <div className="grid md:grid-cols-5 grid-cols-1 gap-4">
      <MoreFeaturesCard
        icons={<Icon icon="embed" />}
        text={
          <T i18nKey="self_hostable">
            #
            <a
              className="link link-primary"
              href={`/docs/administration/install_docker.html`}
            >
              #
            </a>
            <a
              className="link link-primary"
              href={`/docs/administration/install_ansible.html`}
            >
              #
            </a>
          </T>
        }
      />
      <MoreFeaturesCard
        icons={
          <div>
            <Icon icon="clipboard" />
          </div>
        }
        text={i18n.t("clean_interface")}
      />
      <MoreFeaturesCard
        icons={
          <div>
            <Icon icon="appleinc" /> <Icon icon="android" />
          </div>
        }
        text={
          <Link class="link link-primary" to="/apps">
            {i18n.t("mobile_apps_for_ios_and_android")}
          </Link>
        }
      />
      <MoreFeaturesCard
        icons={
          <div>
            <Icon icon="smile" />
          </div>
        }
        text={i18n.t("avatar_support")}
      />
      <MoreFeaturesCard
        icons={
          <div>
            <Icon icon="thumbs-up" /> <Icon icon="thumbs-down" />
          </div>
        }
        text={
          <T i18nKey="full_vote_scores">
            #<code class="text-primary">#</code>#
          </T>
        }
      />
      <MoreFeaturesCard
        icons={
          <div>
            <Icon icon="moon" /> <Icon icon="sun" />
          </div>
        }
        text={i18n.t("themes_including")}
      />
      <MoreFeaturesCard
        icons={<div>:</div>}
        text={
          <T i18nKey="emojis_autocomplete">
            #<code class="text-primary">#</code>
          </T>
        }
      />
      <MoreFeaturesCard
        icons={
          <div>
            <Icon icon="at-sign" />
          </div>
        }
        text={
          <T i18nKey="user_tagging">
            #<code class="text-primary">#</code>
            <code class="text-primary">#</code>
          </T>
        }
      />
      <MoreFeaturesCard
        icons={
          <div>
            <Icon icon="image" />
          </div>
        }
        text={i18n.t("integrated_image_uploading")}
      />
      <MoreFeaturesCard
        icons={
          <div>
            <Icon icon="bell" />
          </div>
        }
        text={i18n.t("notifications_including")}
      />
      <MoreFeaturesCard
        icons={
          <div>
            <Icon icon="globe" />
          </div>
        }
        text={
          <T i18nKey="i18n_support">
            #
            <a
              className="link link-primary"
              href="https://weblate.join-lemmy.org/projects/lemmy/lemmy/"
            >
              #
            </a>
          </T>
        }
      />
      <MoreFeaturesCard
        icons={
          <div>
            <Icon icon="rss" />
          </div>
        }
        text={
          <T i18nKey="rss_feeds">
            #<code class="text-primary">#</code>
            <code class="text-primary">#</code>
            <code class="text-primary">#</code>
            <code class="text-primary">#</code>
            <code class="text-primary">#</code>
          </T>
        }
      />
      <MoreFeaturesCard
        icons={
          <div>
            <Icon icon="trash" />
          </div>
        }
        text={i18n.t("can_fully_erase")}
      />
      <MoreFeaturesCard
        icons={
          <div>
            <Icon icon="alert-octagon" />
          </div>
        }
        text={i18n.t("nsfw_support")}
      />
      <MoreFeaturesCard
        icons={
          <div>
            <Icon icon="eye-off" />
          </div>
        }
        text={i18n.t("censorship_resistant_desc")}
      />
    </div>
  </div>
);

const MoreFeaturesCard = ({ icons, text }) => (
  <div className="card card-bordered w-auto bg-neutral-800 shadow-xl">
    <div className="card-body">
      <div className="btn btn-sm btn-secondary w-fit mb-2">{icons}</div>
      <p className="text-sm text-gray-300">{text}</p>
    </div>
  </div>
);

export class Main extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {
    if (isBrowser()) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const title = i18n.t("lemmy_title");
    return (
      <div>
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <div className="container mx-auto">
          <TitleBlock />
        </div>
        <CarouselBlock />
        <div className="container mx-auto">
          <FollowCommunitiesBlock />
          <FeatureCardsBlock />
          <DiscussionPlatformBlock />
          <MoreFeaturesBlock />
          <SupportDonateBlock />
          <BottomSpacer />
        </div>
      </div>
    );
  }
}
