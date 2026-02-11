import { Component } from "inferno";
import { Link } from "inferno-router";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { T } from "inferno-i18next";
import { isBrowser, sortRandom } from "../utils";
import { Icon } from "./icon";
import { BottomSpacer } from "./common";
import { SUGGESTED_INSTANCES, SuggestedInstancesType } from "./instances-definitions";
import { instance_stats } from "../instance_stats";
import { open as Geolite_open, GeoIpDbName } from "geolite2-redist";
import maxmind, { CountryResponse } from "maxmind";

const TitleBlock = () => (
  <div className="py-16 flex flex-col items-center">
    <div className="flex flex-col items-center gap-4 mb-8">
      <p className="text-6xl font-bold text-gradient p-2">Lemmy</p>
      <p className="text-3xl font-medium text-center">{i18n.t("lemmy_desc")}</p>
    </div>
  </div>
);

type FollowCommunitiesBlockProps = { suggested_instance: string };

function FollowCommunitiesBlock({
  suggested_instance,
}: FollowCommunitiesBlockProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="card card-bordered card-gradient shadow-xl">
        <div className="card-body items-center px-8 md:px-32 py-16">
          <p className="text-gray-200  text-justify mb-6">
            {i18n.t("lemmy_long_desc")}
          </p>
          <p className="grid items-center md:grid-cols-2 gap-2">
            <a
              className="btn btn-primary text-white bg-linear-to-r green-400 to-green-600 w-full"
              href={`https://${suggested_instance}/signup`}
            >
              {i18n.t("join_instance", { domain: suggested_instance })}
            </a>
            <Link
              to="/instances"
              className="btn btn-primary btn-outline text-white w-full"
            >
              {i18n.t("see_all_servers")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ pic, title, subtitle, button, link }) => (
  <div className="card card-gradient shadow-xl grid p-4 mt-4 md:grid-cols-2">
    <div className="">
      <img className="rounded-xl" src={pic} alt="" />
    </div>
    <div className="card-body p-0 py-4 md:px-4 md:py-0">
      <h2 className="card-title text-white text-2xl">{title}</h2>
      <p className="text-gray-300 text-justify">{subtitle}</p>
      <span className="grid">
        <a className="btn btn-primary text-white mx-auto" href={link}>
          {button}
        </a>
      </span>
    </div>
  </div>
);

const FeaturesBlock = () => (
  <div className="gap-4 mt-16">
    <FeatureCard
      pic="/static/assets/images/feature_1.webp"
      title={i18n.t("feature_upvotes_threaded_title")}
      subtitle={i18n.t("feature_upvotes_threaded_desc")}
      button={i18n.t("button_getting_started")}
      link="/docs/users/01-getting-started.html"
    />
    <FeatureCard
      pic="/static/assets/images/feature_2.webp"
      title={i18n.t("feature_apps_title")}
      subtitle={i18n.t("feature_apps_desc")}
      button={i18n.t("apps")}
      link="/apps"
    />
    <FeatureCard
      pic="/static/assets/images/feature_3.webp"
      title={i18n.t("feature_non_commercial_title")}
      subtitle={i18n.t("feature_non_commercial_desc")}
      button={i18n.t("donate")}
      link="/donate"
    />
    <FeatureCard
      pic="/static/assets/images/feature_4.webp"
      title={i18n.t("feature_decentralized_selfhosted_title")}
      subtitle={i18n.t("feature_decentralized_selfhosted_desc")}
      button={i18n.t("button_create_server")}
      link="/docs/administration/administration.html"
    />
    <FeatureCard
      pic="/static/assets/images/feature_5.webp"
      title={i18n.t("feature_open_source_title")}
      subtitle={i18n.t("feature_open_source_desc")}
      button={i18n.t("button_source_code")}
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

interface State {
  suggested_instance: string;
}

export class Main extends Component<object, State> {
  state: State = {
    suggested_instance: "",
  };

  constructor(props: object, state: State) {
    super(props, state);

    (async () => {
      this.setState({ suggested_instance: await this.initSuggestedInstance() });
    })();
  }

  async initSuggestedInstance(): Promise<string> {
    if (isBrowser()) {
      const res = await fetch("/api/v1/instances/suggested");
      return await res.text();
    } else {
      // TODO: how to get client ip, need to pass as prop?
      return getSuggestedInstance("123.123.123.123");
    }
  }

  render() {
    const title = i18n.t("lemmy_title");
    return (
      <div>
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
          <FollowCommunitiesBlock
            suggested_instance={this.state.suggested_instance}
          />
        </div>
        <div className="container mx-auto px-4">
          <FeaturesBlock />
          <MoreFeaturesBlock />
          <BottomSpacer />
        </div>
      </div>
    );
  }
}

export async function getSuggestedInstance(ip: string): Promise<string> {
  // Check crawl results to exclude instances which are down
  const crawledInstances = instance_stats.stats.instance_details.map(
    i => i.domain,
  );
  const suggested: SuggestedInstancesType = Object.keys(SUGGESTED_INSTANCES)
    .reduce((result, key) => {
      const filtered = SUGGESTED_INSTANCES[key].filter(i =>
        crawledInstances.includes(i),
      );
      if (filtered.length) {
        result[key] = filtered;
      }
      return result;
    }, {});
  console.log(suggested);

  // TODO: move to static
  const reader = await Geolite_open(
    GeoIpDbName.Country, // Use the enum instead of a string!
    path => maxmind.open<CountryResponse>(path),
  );

  const lookup = reader.get(ip);

  const forCountry: string[] = suggested[lookup?.country?.iso_code];

  if (forCountry) {
    return sortRandom(forCountry)[0];
  }

  const forContinent: string[] = suggested[lookup!.continent!.code];

  if (forContinent) {
    return sortRandom(forContinent)[0];
  }

  reader.close();

  return sortRandom(suggested["fallback"])[0];
}
