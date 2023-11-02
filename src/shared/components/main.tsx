import { Component } from "inferno";
import { Link } from "inferno-router";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { T } from "inferno-i18next";
import { getQueryParams, isBrowser } from "../utils";
import { Icon } from "./icon";
import {
  BottomSpacer,
  CARD_GRADIENT,
  DonateBlock,
  TEXT_GRADIENT,
} from "./common";
import { InstancePicker } from "./instance-picker";
import classNames from "classnames";
import Glide from "@glidejs/glide";

interface MainProps {
  i: Main;
}

const TitleBlock = ({ i }: MainProps) => (
  <div className="py-16 flex flex-col items-center">
    <div className="flex flex-col items-center gap-4 mb-8">
      <p className={`text-6xl font-bold ${TEXT_GRADIENT} p-2`}>Lemmy</p>
      <p className="text-3xl font-medium text-center">{i18n.t("lemmy_desc")}</p>
    </div>
    <div className="flex flex-row justify-around gap-4">
      <JoinServerButton i={i} />
      <SeeAllServersButton />
    </div>
  </div>
);

const carouselImages = [
  "/static/assets/images/main_screen_2.webp",
  "/static/assets/images/main_screen_3.webp",
  "/static/assets/images/main_screen_1.webp",
];

const CarouselBlock = () => (
  <div className="px-8 mt-16">
    <div className="glide">
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {carouselImages.map((image, i) => (
            <img
              src={image}
              className={classNames("rounded-box border-8 z-10 glide__slide", {
                "border-primary/[.15]": i & 1,
                "border-secondary/[.15]": !(i & 1),
              })}
            />
          ))}
        </ul>
      </div>
      <div
        className="glide__bullets flex justify-center py-2 gap-4"
        data-glide-el="controls[nav]"
      >
        {carouselImages.map((_, i) => (
          <button
            data-glide-dir={`=${i}`}
            className={`glide__bullet ${TEXT_GRADIENT}`}
          >
            ●
          </button>
        ))}
      </div>
    </div>
  </div>
);

const JoinServerButton = ({ i }: MainProps) => (
  <a
    href="?showJoinModal=true"
    className="btn btn-primary text-white normal-case z-10"
    onClick={e => {
      e.preventDefault();
      i.setState({ resetInstancePicker: true });
      showJoinModal();
    }}
  >
    {i18n.t("join_a_server")}
  </a>
);

const SeeAllServersButton = () => (
  <Link
    to="/instances"
    className="btn btn-secondary text-white normal-case z-10"
  >
    {i18n.t("see_all_servers")}
  </Link>
);

const FollowCommunitiesBlock = ({ i }: MainProps) => (
  <div className="flex flex-col items-center">
    <div className={`card card-bordered ${CARD_GRADIENT} shadow-xl`}>
      <div className="card-body items-center px-8 md:px-32 py-16">
        <T
          i18nKey="follow_communities"
          className="card-title font-bold text-4xl text-center mb-3 inline-block"
        >
          #<span className={TEXT_GRADIENT}>#</span>
        </T>
        <p className="text-sm text-gray-300 text-center mb-6">
          {i18n.t("lemmy_long_desc")}
        </p>
        <JoinServerButton i={i} />
      </div>
    </div>
  </div>
);

const FeatureCard = ({ pic, title, subtitle, classes }) => (
  <div className={`card ${CARD_GRADIENT} shadow-xl ${classes}`}>
    <div className="p-4">
      <img src={pic} className="rounded-xl w-full object-fill min-h-[300px]" />
    </div>
    <div className="card-body pt-0">
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
      <div className="card-body items-center px-8 md:px-32 py-16">
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
        <a
          className="btn btn-primary bg-white text-primary normal-case"
          href={`/docs/administration/administration.html`}
        >
          {i18n.t("run_a_server")}
        </a>
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
      <div className="btn btn-sm btn-secondary w-fit mb-2 pointer-events-none">
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
    new Glide(".glide", {
      type: "carousel",
      gap: 50,
      perView: 3,
      breakpoints: {
        800: {
          perView: 1,
        },
      },
      autoplay: 3000,
      hoverpause: true,
    }).mount();
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
        </Helmet>
        <img
          src="/static/assets/images/world_background.svg"
          className="bg-top bg-no-repeat bg-contain opacity-20 absolute"
        />
        <div className="container mx-auto px-4">
          <TitleBlock i={this} />
          <FollowCommunitiesBlock i={this} />
        </div>
        <CarouselBlock />
        <div className="container mx-auto px-4">
          <FeatureCardsBlock />
          <DiscussionPlatformBlock />
          <MoreFeaturesBlock />
          <DonateBlock />
          <BottomSpacer />
        </div>
      </div>
    );
  }
}
