import { Component } from "inferno";
import { Link } from "inferno-router";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { T } from "inferno-i18next";
import { getQueryParams, isBrowser, sortRandom } from "../utils";
import { Icon } from "./icon";
import { BottomSpacer } from "./common";
import { InstancePicker } from "./instance-picker";
import { DEFAULT_INSTANCES } from "./instances-definitions";
import { instance_stats } from "../instance_stats";

const TitleBlock = () => (
  <div className="py-16 flex flex-col items-center">
    <div className="flex flex-col items-center gap-4 mb-8">
      <p className="text-6xl font-bold text-gradient p-2">Lemmy</p>
      <p className="text-3xl font-medium text-center">{i18n.t("lemmy_desc")}</p>
    </div>
  </div>
);

const FollowCommunitiesBlock = () => {
  // Check crawl results to exclude instances which are down
  const crawledInstances = instance_stats.stats.instance_details.map(
    i => i.domain,
  );
  const defaults = DEFAULT_INSTANCES.filter(i => crawledInstances.includes(i));
  const domain = sortRandom(defaults)[0];

  return (
    <div className="flex flex-col items-center">
      <div className="card card-bordered card-gradient shadow-xl">
        <div className="card-body items-center px-8 md:px-32 py-16">
          <p className="text-gray-200 text-center mb-6">
            {i18n.t("lemmy_long_desc")}
          </p>
          <p className="space-x-2">
            <a
              className="btn btn-primary text-white bg-linear-to-r green-400 to-green-600"
              href={`https://${domain}/signup`}
            >
              {i18n.t("join_instance", { domain })}
            </a>
            <Link
              to="/instances"
              className="btn btn-primary btn-outline text-white normal-case z-10"
            >
              {i18n.t("see_all_servers")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ pic, title, subtitle, button, link }) => (
  <div className="card card-gradient shadow-xl grid p-4 mt-4 md:grid-cols-2">
    <div className="">
      <img className="rounded-xl" src={pic} alt="" />
    </div>
    <div className="card-body">
      <h2 className="card-title text-white text-2xl">{title}</h2>
      <p className="text-gray-300">{subtitle}</p>
      <span className="grid">
        <a className="btn btn-primary text-white mx-auto" href={link}>
          {button}
        </a>
      </span>
    </div>
  </div>
);

const NewFeaturesBlock = () => (
  <div className="gap-4 mt-16">
    <FeatureCard
      pic="/static/assets/images/feature_1.webp"
      title="Upvotes and Threaded Comments"
      subtitle="Posts can be upvoted or downvoted. The most interesting ones rise to the top. You can choose between different sort options. Threaded comments to follow discussions easily. Works like Reddit."
      button="Getting Started"
      link="/docs/users/01-getting-started.html"
    />
    <FeatureCard
      pic="/static/assets/images/feature_2.webp"
      title="Many different Apps"
      subtitle="Choose between more than a dozen apps for different platforms and preferences. There are apps for iOS, Android, Desktop and Web. Developers can create their own applications and tools using the open API."
      button="Apps"
      link="/apps"
    />
    <FeatureCard
      pic="/static/assets/images/feature_3.webp"
      title="Non-Commercial"
      subtitle="Lemmy is not controlled by any company. There is no profit motive, no advertising and no user tracking. Moderation actions are transparent and can be viewed in the mod log. Development is all in the open, and funded solely by donations."
      button="Donate"
      link="/donate"
    />
    <FeatureCard
      pic="/static/assets/images/feature_4.webp"
      title="Decentralized and Selfhosted"
      subtitle="The Lemmyverse consists of hundreds of interconnected servers operated by different people. You can also run Lemmy on your own server, using easy installation methods via Ansible or Docker. Resource usage is very low thanks to Rust, so it can run on a small Raspberry Pi or alongside other services."
      button="Create a server"
      link="/docs/administration/administration.html"
    />
    <FeatureCard
      pic="/static/assets/images/feature_5.webp"
      title="Open Source"
      subtitle="Lemmy is entirely open source. You can follow the development process and make suggestions for new features. You can also fork the code and implement new changes yourself."
      button="Source Code"
      link="https://github.com/LemmyNet"
    />
  </div>
);

const MoreFeaturesBlock = () => (
  <div className="mt-16">
    <T i18nKey="more_features" className={`text-center text-4xl mb-8`}>
      #<span className="text-gradient">#</span>
    </T>
    <div className="grid md:grid-cols-5 grid-cols-1 gap-4">
      <MoreFeaturesCard
        icons={<Icon icon="embed" />}
        text={
          <T i18nKey="self_hostable">
            #
            <a
              className="link"
              href={`/docs/administration/install_docker.html`}
            >
              #
            </a>
            <a
              className="link"
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
          <Link className="link" to="/apps">
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
            #<code>#</code>#
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
            #<code>#</code>
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
            #<code>#</code>
            <code>#</code>
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
              className="link"
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
            #<code>#</code>
            <code>#</code>
            <code>#</code>
            <code>#</code>
            <code>#</code>
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
      <div className="btn btn-sm btn-secondary w-fit mb-2 pointer-events-none text-black">
        {icons}
      </div>
      <p className="text-sm text-gray-300">{text}</p>
    </div>
  </div>
);

function getMainQueryParams() {
  return getQueryParams<Props>({
    showJoinModal: d => !!d,
  });
}

interface Props {
  showJoinModal?: boolean;
}

interface State {
  resetInstancePicker: boolean;
  showJoinModal?: boolean;
}

function showJoinModal() {
  (document.getElementById("picker") as any).showModal();
}

export class Main extends Component<Props, State> {
  state: State = {
    resetInstancePicker: false,
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {
    if (isBrowser()) {
      window.scrollTo(0, 0);
    }
    this.setState(getMainQueryParams());
    if (this.state.showJoinModal) {
      showJoinModal();
    }
  }

  render() {
    const title = i18n.t("lemmy_title");
    return (
      <div>
        <InstancePicker reset={this.state.resetInstancePicker} />
        <Helmet title={title}>
          <meta property={"title"} content={title} />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS Feed for join-lemmy.org"
            href="/feed.xml"
          />
        </Helmet>
        <img
          src="/static/assets/images/world_background.svg"
          className="bg-top bg-no-repeat bg-contain opacity-20 absolute"
          alt=""
        />
        <div className="container mx-auto px-4">
          <TitleBlock />
          <FollowCommunitiesBlock />
        </div>
        <div className="container mx-auto px-4">
          <NewFeaturesBlock />
          <MoreFeaturesBlock />
          <BottomSpacer />
        </div>
      </div>
    );
  }
}
