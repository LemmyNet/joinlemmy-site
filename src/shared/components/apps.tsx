import { Component, linkEvent } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { T } from "inferno-i18next";
import { BottomSpacer, SELECT_CLASSES, TEXT_GRADIENT } from "./common";
import {
  API_LIBRARIES,
  APP_LIST,
  ToolDetails,
  AppDetails,
  AppLink,
  Platform,
  SourceType,
  MODERATION_TOOLS,
} from "./app-definitions";
import { Icon } from "./icon";
import { I18nKeys } from "i18next";
import { sortRandom } from "../utils";

const TitleBlock = () => (
  <div className="flex flex-col items-center pt-16 mb-4">
    <T i18nKey="lemmy_apps" className="text-4xl font-bold mb-3">
      #<span className={TEXT_GRADIENT}>#</span>
    </T>
    <p className="text-2xl text-gray-300 text-center">
      {i18n.t("choose_from_apps")}
    </p>
  </div>
);

interface AppDetailsCardProps {
  app: AppDetails;
}

const AppDetailsTitle = ({ app }: AppDetailsCardProps) => (
  <div className="flex flex-row space-x-2 mb-2">
    <img
      src={app.icon || "/static/assets/images/lemmy.svg"}
      className="rounded-xl w-7 h-7"
      alt=""
    />
    <a href={app.link} className={`card-title text-2xl ${TEXT_GRADIENT}`}>
      {app.name}
    </a>
  </div>
);

interface AppDetailsButtonsProps {
  links: AppLink[];
}

const AppDetailsButtons = ({ links }: AppDetailsButtonsProps) => (
  <div className="flex flex-row justify-between gap-2">
    {links.map(l => (
      <a
        className="btn btn-sm btn-primary text-white normal-case"
        href={l.link}
      >
        <Icon icon={l.icon} />
      </a>
    ))}
  </div>
);

const AppDetailsCard = ({ app }: AppDetailsCardProps) => (
  <div className="card card-bordered bg-neutral-900 shadow-xl">
    <div className="card-body items-center">
      <AppDetailsTitle app={app} />
      <img
        src={app.banner || "/static/assets/images/lemmy.svg"}
        className="rounded-xl max-h-96 mb-2"
        alt=""
      />
      <p className="text-sm text-gray-300 mb-2">{app.description}</p>
      {app.sourceType === SourceType.Closed && (
        <div className="alert alert-warning">
          <Icon icon="alert-octagon" />
          <span>{i18n.t("closed_source_warning")}</span>
        </div>
      )}
      <AppDetailsButtons links={app.links} />
    </div>
  </div>
);

const AppTitle = ({ title }) => (
  <div className="text-2xl mb-3 text-gray-300">{title}</div>
);

interface AppGridProps {
  apps: AppDetails[];
}

const AppGrid = ({ apps }: AppGridProps) => (
  <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-16">
    {apps.map(a => (
      <AppDetailsCard app={a} />
    ))}
  </div>
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
              <span className={`${TEXT_GRADIENT} mr-2`}>●</span>
              <span>
                <a href={a.link} className={`${TEXT_GRADIENT}`}>
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
    platform: Platform.All,
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.buildAppList();
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
        <AppGrid apps={this.state.apps} />
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

  filterAndTitleBlock() {
    return (
      <div id="search">
        <div className="flex flex-row flex-wrap gap-4 mb-4">
          <div className="flex-none"></div>
          <div className="grow"></div>
          <div>
            <select
              className={`${SELECT_CLASSES} mr-2`}
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

function handlePlatformChange(i: Apps, event: any) {
  const platform: Platform = (event.target.value as Platform) ?? Platform.All;
  i.setState({
    platform,
  });
  i.buildAppList();
}
