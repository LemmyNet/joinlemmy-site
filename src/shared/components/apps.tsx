import { Component, InfernoNode, linkEvent } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { T } from "inferno-i18next-dess";
import { BottomSpacer } from "./common";
import {
  API_LIBRARIES,
  APP_LIST,
  ToolDetails,
  AppDetails,
  AppLinks,
  Platform,
  MODERATION_TOOLS,
} from "./app-definitions";
import { Icon } from "./icon";
import { I18nKeys } from "i18next";
import { isBrowser, sortRandom } from "../utils";
import classNames from "classnames";
import { UAParser } from "ua-parser-js";
import { FormEvent } from "inferno";

const TitleBlock = () => (
  <div className="flex flex-col items-center pt-16 mb-4">
    <T i18nKey="lemmy_apps" className="text-4xl font-bold mb-3">
      #<span className="text-gradient">#</span>
    </T>
    <p className="text-2xl text-gray-300 text-center">
      {i18n.t("choose_from_apps")}
    </p>
  </div>
);

interface AppDetailsCardProps {
  app: AppDetails;
  activePlatform?: Platform;
}

const AppDetailsTitle = ({ app }: AppDetailsCardProps) => (
  <div className="flex flex-row space-x-2 mb-2">
    <img
      src={app.icon || "/static/assets/images/lemmy.svg"}
      className="rounded-xl w-7 h-7"
      alt=""
    />
    <a href={app.link} className="card-title text-2xl text-gradient">
      {app.name}
    </a>
  </div>
);

interface PlatformButtonProps {
  icon: string;
  activePlatform: Platform;
  link?: string;
  buttonType?: Platform;
}

const PlatformButton = ({
  icon,
  activePlatform,
  link,
  buttonType,
}: PlatformButtonProps) => {
  const isActive =
    buttonType &&
    (activePlatform === buttonType || activePlatform === Platform.All);
  const classes = classNames("btn btn-sm btn-primary text-white normal-case", {
    "btn-outline": !isActive,
  });
  return (
    link && (
      <a href={link} className={classes}>
        <Icon icon={icon} />
      </a>
    )
  );
};

interface AppDetailsButtonsProps {
  links: AppLinks;
  activePlatform: Platform;
}

const AppDetailsButtons = ({
  links,
  activePlatform,
}: AppDetailsButtonsProps) => {
  return (
    <div className="space-x-2">
      <PlatformButton
        icon="globe"
        activePlatform={activePlatform}
        link={links.web}
        buttonType={Platform.Web}
      />
      <PlatformButton
        icon="appleinc"
        activePlatform={activePlatform}
        link={links.appleinc}
        buttonType={Platform.IOS}
      />
      <PlatformButton
        icon="googleplay"
        activePlatform={activePlatform}
        link={links.googleplay}
        buttonType={Platform.Android}
      />
      <PlatformButton
        icon="f-droid"
        activePlatform={activePlatform}
        link={links.fdroid}
        buttonType={Platform.Android}
      />
      <PlatformButton
        icon="desktop"
        activePlatform={activePlatform}
        link={links.desktop}
        buttonType={Platform.Desktop}
      />
      <PlatformButton
        icon="github"
        activePlatform={activePlatform}
        link={links.github}
      />
    </div>
  );
};

const AppDetailsCard = ({ app, activePlatform }: AppDetailsCardProps) => (
  <div className="card card-bordered bg-neutral-900 shadow-xl rounded-xl relative max-h-96">
    <figure>
      <img
        src={app.banner || "/static/assets/images/lemmy.svg"}
        className="mb-2"
        alt=""
      />
    </figure>
    <div className="card-body items-center p-4 absolute bottom-0 bg-neutral-900/90 w-full">
      <AppDetailsTitle app={app} />
      <p className="text-gray-300 mb-2">{app.description}</p>
      <AppDetailsButtons
        links={app.links}
        activePlatform={activePlatform ?? Platform.All}
      />
    </div>
  </div>
);

const AppTitle = ({ title }) => (
  <div className="text-2xl mb-3 text-gray-300">{title}</div>
);

interface ToolsBlockProps {
  title: string;
  items: ToolDetails[];
}

const ToolsBlock = ({ title, items }: ToolsBlockProps) => (
  <div>
    <AppTitle title={title} />
    <div className="card card-bordered bg-neutral-900 shadow-xl">
      <div className="card-body">
        <ul>
          {items.map(a => (
            <li>
              <span className="text-gradient mr-2">●</span>
              <span>
                <a href={a.link} className="text-gradient">
                  {a.name}
                </a>
              </span>
              <span className="text-gray-300 mx-2">-</span>
              <span className="text-gray-300">{a.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

interface State {
  apps: AppDetails[];
  platform: Platform;
}

export class Apps extends Component<any, State> {
  state: State = {
    apps: [],
    platform: this.initialPlatform(),
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.buildAppList();
  }

  initialPlatform(): Platform {
    if (!isBrowser()) {
      return Platform.All;
    }

    const parser = new UAParser(navigator.userAgent);

    // Mash all the info together and see if we can match anything
    // https://docs.uaparser.dev/info/os/name.html
    const info = (
      parser.getOS().toString() + parser.getDevice().toString()
    ).toLowerCase();
    if (info.includes("ios")) {
      return Platform.IOS;
    } else if (info.includes("android") || info.includes("mobile")) {
      return Platform.Android;
    } else if (
      info.includes("linux") ||
      info.includes("windows") ||
      info.includes("macos")
    ) {
      return Platform.Desktop;
    } else {
      return Platform.Web;
    }
  }

  buildAppList() {
    let apps = APP_LIST;

    // Platform filter
    if (this.state.platform !== Platform.All) {
      apps = apps.filter(a => a.platforms.includes(this.state.platform));
    }

    // Random sort
    apps = sortRandom(apps);

    this.setState({ apps });
  }

  render() {
    const title = i18n.t("apps_title");
    return (
      <div className="container mx-auto px-4">
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <TitleBlock />
        {this.filterAndTitleBlock()}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {this.state.apps.map(a => (
              <AppDetailsCard app={a} activePlatform={this.state.platform} />
            ))}
          </div>
          {this.seeAllBtn()}
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-16">
          <ToolsBlock title={i18n.t("api_libraries")} items={API_LIBRARIES} />
          <ToolsBlock
            title={i18n.t("moderation_tools")}
            items={MODERATION_TOOLS}
          />
        </div>
        <BottomSpacer />
      </div>
    );
  }

  seeAllBtn(): InfernoNode {
    return (
      <div className="flex justify-center p-8">
        <button
          className="btn btn-secondary text-white normal-case"
          onClick={() => handleSeeAll(this)}
        >
          See all apps
        </button>
      </div>
    );
  }

  filterAndTitleBlock() {
    return (
      <div id="search">
        <div className="flex flex-row flex-wrap gap-4 mb-4">
          <div className="flex-none"></div>
          <div className="grow"></div>
          <div>
            <select
              className="lemmy-select mr-2"
              value={this.state.platform}
              onChange={linkEvent(this, handlePlatformChange)}
              name="platform_select"
            >
              {Object.entries(Platform).map(([name, platform]) => (
                <option key={name} value={platform}>
                  {i18n.t(platform as string as I18nKeys)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

function handlePlatformChange(i: Apps, event: FormEvent<HTMLSelectElement>) {
  const platform: Platform = (event.target.value as Platform) ?? Platform.All;
  i.setState({
    platform,
  });
  i.buildAppList();
}

function handleSeeAll(i: Apps) {
  i.setState({
    platform: Platform.All,
  });
  i.buildAppList();
}
