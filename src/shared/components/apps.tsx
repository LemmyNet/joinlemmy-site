import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { T } from "inferno-i18next";
import { BottomSpacer, TEXT_GRADIENT } from "./common";
import {
  ANDROID_APPS,
  API_LIBRARIES,
  AppDetails,
  AppLink,
  CLI_APPS,
  IOS_APPS,
  WEB_APPS,
} from "./app-definitions";
import { Icon } from "./icon";

const TitleBlock = () => (
  <div className="flex flex-col items-center pt-16 mb-8">
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
  <div class="flex flex-row justify-between gap-2">
    {links.map(l => (
      <a class="btn btn-sm btn-primary text-white normal-case" href={l.link}>
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
      />
      <p className="text-sm text-gray-300 mb-2">{app.description}</p>
      <AppDetailsButtons links={app.links} />
    </div>
  </div>
);

const AppTitle = ({ title }) => <div className="text-2xl mb-3">{title}</div>;

const MobileAppsBlock = () => (
  <div>
    <AppTitle title={i18n.t("mobile_apps_for_ios_and_android")} />
    <AppGrid apps={ANDROID_APPS.concat(IOS_APPS)} />
  </div>
);

const WebAppsBlock = () => (
  <div>
    <AppTitle title={i18n.t("web_apps")} />
    <AppGrid apps={WEB_APPS} />
  </div>
);

const CliAppsBlock = () => (
  <div>
    <AppTitle title={i18n.t("cli_apps")} />
    <AppGrid apps={CLI_APPS} />
  </div>
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

const ApiLibrariesBlock = () => (
  <div>
    <AppTitle title={i18n.t("api_libraries")} />
    <div className="card card-bordered bg-neutral-900 shadow-xl md:w-1/2">
      <div className="card-body">
        <ul>
          {API_LIBRARIES.map(a => (
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

export class Apps extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const title = i18n.t("apps_title");
    return (
      <div className="container mx-auto">
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <TitleBlock />
        <MobileAppsBlock />
        <WebAppsBlock />
        <CliAppsBlock />
        <ApiLibrariesBlock />
        <BottomSpacer />
      </div>
    );
  }
}
