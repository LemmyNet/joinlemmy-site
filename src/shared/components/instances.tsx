import { Component, InfernoEventHandler, linkEvent } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { T } from "inferno-i18next";
import { instance_stats } from "../instance_stats";
import {
  getQueryParams,
  getQueryString,
  isBrowser,
  mdToHtml,
  numToSI,
  QueryParams,
  sortRandom,
  uniqueEntries,
} from "../utils";
import { Badge, SectionTitle } from "./common";
import {
  INSTANCE_HELPERS,
  Topic,
  INSTANCE_METADATA,
  ALL_TOPIC,
  TOPICS,
  availableLanguages,
} from "./instances-definitions";
import { Icon, IconSize } from "./icon";
import { I18nKeys } from "i18next";

const TitleBlock = () => (
  <div className="flex flex-col items-center pt-16 mb-16">
    <T i18nKey="lemmy_servers" className="text-4xl font-bold mb-8">
      #<span className="text-gradient">#</span>
    </T>
    <div
      className="tooltip"
      data-tip={i18n.t("monthly_active_users", {
        formattedCount: numToSI(instance_stats.stats.users_active_month),
      })}
    >
      <div className="stats shadow-sm mb-8">
        <div className="stat">
          <div className="stat-figure text-primary">
            <Icon icon="globe" size={IconSize.Largest} />
          </div>
          <div className="stat-title">{i18n.t("servers")}</div>
          <div className="stat-value">
            {numToSI(instance_stats.stats.crawled_instances)}
          </div>
          <div className="stat-desc">{i18n.t("lemmyverse")}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <Icon icon="users" size={IconSize.Largest} />
          </div>
          <div className="stat-title">{i18n.t("active_users")}*</div>
          <div className="stat-value">
            {numToSI(instance_stats.stats.users_active_month)}
          </div>
          <div className="stat-desc">
            {new Date(instance_stats.stats.end_time).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
    <p className="text-xl text-gray-300">{i18n.t("instance_disclaimer")}</p>
  </div>
);

const ComparisonBlock = () => (
  <div>
    <div className="text-md text-gray-300 mb-3">
      {i18n.t("instance_comparison")}:
    </div>
    <div className="card card-bordered bg-neutral-900 shadow-xl">
      <div className="card-body p-4">
        <div className="flex flex-row flex-wrap gap-4 mb-2">
          {sortRandom(INSTANCE_HELPERS).map(i => (
            <Badge
              content={
                <a href={i.link}>
                  <Icon
                    icon="link"
                    classes={`fill-current text-primary mr-2`}
                  />
                  <span className="text-gray-300">{i.name}</span>
                </a>
              }
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

interface InstanceCardGridProps {
  title: string;
  instances: any[];
}

const InstanceCardGrid = ({ instances }: InstanceCardGridProps) => (
  <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
    {instances.map(i => (
      <InstanceCard instance={i} />
    ))}
  </div>
);

function buildUrl(domain: string): string {
  return `https://${domain}`;
}

interface InstanceCardProps {
  instance: any;
}

interface InstanceCardState {
  showModal: boolean;
}

class InstanceCard extends Component<InstanceCardProps, InstanceCardState> {
  state: InstanceCardState = {
    showModal: false,
  };

  render() {
    const instance = this.props.instance;

    const domain = instance.domain;
    const description = instance.site_info.site_view.site.description;
    const sidebar = instance.site_info.site_view.site.sidebar || description;
    const icon =
      instance.site_info.site_view.site.icon ||
      "/static/assets/images/lemmy.svg";
    const banner = instance.site_info.site_view.site.banner;
    const monthlyUsers = instance.site_info.site_view.counts.users_active_month;
    const registrationMode =
      instance.site_info.site_view.local_site.registration_mode;
    const emailRequired =
      instance.site_info.site_view.local_site.require_email_verification;

    const modalId = `modal_${domain}`;

    return (
      <div className="card card-bordered bg-neutral-900 shadow-xl">
        <div className="card-body p-4">
          <div className="flex flex-row gap-4">
            {this.state.showModal && (
              <DetailsModal
                id={modalId}
                domain={domain}
                banner={banner}
                geoIp={instance.geo_ip}
                monthlyUsers={monthlyUsers}
                icon={icon}
                sidebar={sidebar}
                registrationMode={registrationMode}
                emailRequired={emailRequired}
              />
            )}
            <InstanceIcon domain={domain} icon={icon} />
            <InstanceStats
              emailRequired={emailRequired}
              geoIp={instance.geo_ip}
              monthlyUsers={monthlyUsers}
            />
          </div>
          <div className="text-2xl font-bold text-gradient">
            <a href={buildUrl(domain)}>{domain}</a>
          </div>
          <p className="text-gray-300 mb-2">{description}</p>
          <div>
            <div className="flex gap-2">
              <a
                className="btn btn-primary text-white normal-case grow"
                href={`${buildUrl(domain)}`}
              >
                {i18n.t("explore")}
              </a>
              <a
                className="btn btn-primary text-white grow"
                href={`${buildUrl(domain)}/signup`}
              >
                {i18n.t("sign_up")}
              </a>
            </div>
            <button
              className="btn btn-secondary btn-outline text-white btn-block my-2"
              onClick={linkEvent(this, handleModalClick)}
            >
              {i18n.t("more_information")}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function handleModalClick(i: InstanceCard) {
  const modalId = `modal_${i.props.instance.domain}`;
  i.setState({ showModal: true });
  (document.getElementById(modalId) as any).showModal();
}

const imgError =
  "this.onError=null;this.src='/static/assets/images/lemmy.svg';" as unknown as InfernoEventHandler<HTMLImageElement>;

const InstanceIcon = ({ domain, icon }) => (
  <a className="rounded-xl bg-neutral-800 p-4" href={buildUrl(domain)}>
    <img className="w-24 h-24" src={icon} onError={imgError} alt="" />
  </a>
);

const InstanceStats = ({ geoIp, emailRequired, monthlyUsers }) => (
  <div className="flex flex-col flex-nowrap h-min gap-2">
    <StatsBadges
      geoIp={geoIp}
      emailRequired={emailRequired}
      monthlyUsers={monthlyUsers}
    />
  </div>
);

export const StatsBadges = ({ monthlyUsers, emailRequired, geoIp }) => (
  <>
    <Badge
      content={
        <div className="text-sm text-gray-500 tooltip text-ellipsis whitespace-nowrap">
          <Icon icon="globe" classes="mr-2" />
          <span>
            {geoIp?.country?.names?.en ?? i18n.t("hosted_in_unknown")}
          </span>
        </div>
      }
    />
    <Badge
      content={
        <div
          className="text-sm text-gray-500 tooltip"
          data-tip={i18n.t("monthly_active_users", {
            formattedCount: monthlyUsers.toLocaleString(),
          })}
        >
          <Icon icon="user-check" classes="mr-2" />
          <span>
            {i18n.t("per_month", {
              formattedCount: monthlyUsers.toLocaleString(),
            })}
          </span>
        </div>
      }
    />
    {emailRequired && (
      <Badge
        content={
          <div className="text-sm text-gray-500">
            <Icon icon="mail" classes="mr-2" />
            <span>Email required</span>
          </div>
        }
      />
    )}
  </>
);

function registrationModeToString(registrationMode: string): string {
  if (registrationMode === "Open") {
    return i18n.t("registrations_open");
  } else if (registrationMode === "Closed") {
    return i18n.t("registrations_closed");
  } else if (registrationMode === "RequireApplication") {
    return i18n.t("requires_application");
  } else {
    return i18n.t("registrations_open");
  }
}

export const DetailsModal = ({
  id,
  domain,
  icon,
  banner,
  geoIp,
  monthlyUsers,
  sidebar,
  registrationMode,
  emailRequired,
}) => (
  <dialog id={id} className="modal">
    <form method="dialog" className="modal-backdrop">
      <button>close</button>
    </form>
    <div className="modal-box w-10/12 max-w-5xl bg-neutral-900">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      {banner && (
        <img
          src={banner}
          className="object-cover w-full h-48 rounded-xl mb-3"
          alt=""
        />
      )}
      <div className="flex flex-row flex-wrap gap-4 mb-3 items-center">
        {icon && (
          <img className="w-8 h-8" src={icon} onError={imgError} alt="" />
        )}
        <StatsBadges
          emailRequired={emailRequired}
          geoIp={geoIp}
          monthlyUsers={monthlyUsers}
        />
        <Badge
          content={
            <div className="text-sm text-gray-500">
              <Icon icon="user-check" classes="mr-2" />
              <span>{registrationModeToString(registrationMode)}</span>
            </div>
          }
        />
        <div className="btn btn-primary btn-outline btn-sm normal-case">
          <a href={buildUrl(domain)}>{i18n.t("browse_instance")}</a>
        </div>
      </div>
      {sidebar && (
        <article className="prose max-w-none prose-a:text-primary prose-h1:text-primary">
          <div dangerouslySetInnerHTML={mdToHtml(sidebar)} />
        </article>
      )}
      <a
        className="btn btn-primary btn-block text-white normal-case"
        href={`${buildUrl(domain)}`}
      >
        {i18n.t("explore")}
      </a>
    </div>
  </dialog>
);

interface Sort {
  name: string;
}

const RANDOM_SORT: Sort = {
  name: "random",
};

const MOST_ACTIVE_SORT: Sort = {
  name: "most_active",
};

const LEAST_ACTIVE_SORT: Sort = {
  name: "least_active",
};

const SORTS: Sort[] = [RANDOM_SORT, MOST_ACTIVE_SORT, LEAST_ACTIVE_SORT];

function sortActive(instances: any[]): any[] {
  return instances.sort(
    (a, b) =>
      b.site_info.site_view.counts.users_active_month -
      a.site_info.site_view.counts.users_active_month,
  );
}

interface Location {
  code: string;
  name: string;
}

interface State {
  instances: any[];
  allLocations: Location[];
  sort: Sort;
  language: string;
  topic: Topic;
  location?: Location;
  show_nsfw: boolean;
}

function initTopic(): Topic {
  const topic = getQueryParams().get("topic");
  return topic ? (TOPICS.find(c => c.name === topic) ?? ALL_TOPIC) : ALL_TOPIC;
}

function initSort(): Sort {
  const sort = getQueryParams().get("sort");
  return sort ? (SORTS.find(c => c.name === sort) ?? RANDOM_SORT) : RANDOM_SORT;
}

function initShowNsfw(): boolean {
  const show_nsfw = getQueryParams().get("show_nsfw");
  return show_nsfw === "true";
}

export class Instances extends Component<object, State> {
  state: State = {
    instances: [],
    allLocations: this.initLocations(),
    sort: initSort(),
    language: this.initLanguage(),
    topic: initTopic(),
    location: undefined,
    show_nsfw: initShowNsfw(),
  };

  initLocations(): Location[] {
    const continents = instance_stats.stats.instance_details
      .filter(i => Object.keys(i.geo_ip.continent).length !== 0)
      .map(i => i.geo_ip.continent)
      // filter nulls
      .flatMap(i => (i.code && i.names.en ? i : []))
      .map((i): Location => ({ code: i.code, name: i.names.en }));
    const countries = instance_stats.stats.instance_details
      .filter(i => Object.keys(i.geo_ip.country).length !== 0)
      .map(i => i.geo_ip.country)
      // filter nulls
      .flatMap(i => (i.iso_code && i.names.en ? i : []))
      .map((i): Location => ({ code: i.iso_code, name: i.names.en }));

    // for some reason this doesnt work with uniqueEntries()
    return continents.concat(countries).reduce((acc, obj) => {
      const exist = acc.find(i => obj.code === i.code);
      if (!exist) {
        acc.push(obj);
      }
      return acc;
    }, [] as Location[]);
  }

  initLanguage() {
    const lang = getQueryParams().get("language");
    if (lang) {
      return lang;
    } else {
      const allLanguages = uniqueEntries(
        INSTANCE_METADATA.flatMap(i => i.languages),
      );

      if (isBrowser()) {
        window.scrollTo(0, 0);

        // TODO: consider using `navigator.languages` which has an array of all enabled langs
        const lang = navigator.language.split("-")[0];
        return allLanguages.find(l => l === lang) ?? "all";
      } else {
        return "all";
      }
    }
  }

  // Set the filters by the query params if they exist
  componentDidMount() {
    this.setState({ location: this.initSelectedLocation() });
    // This is browser intensive, so run in the background
    setTimeout(() => {
      this.buildInstanceList();
    }, 0);
  }

  initSelectedLocation(): Location | undefined {
    const location = getQueryParams().get("location");
    if (location != null) {
      return this.state.allLocations.find(l => l.code === location);
    } else {
      return undefined;
    }
  }

  buildInstanceList() {
    let instances = instance_stats.stats.instance_details;
    const metadata = INSTANCE_METADATA;

    instances = instances.filter(i => {
      const active_users_percent =
        i.site_info.site_view.counts.users_active_month /
        instance_stats.stats.users_active_month;
      return active_users_percent < 0.3;
    });

    if (!this.state.show_nsfw) {
      instances = instances.filter(
        i => i.site_info.site_view.site.content_warning !== null,
      );
    }

    // Language Filter
    if (this.state.language !== "all") {
      const languageRecs = metadata.filter(r =>
        r.languages.includes(this.state.language),
      );
      instances = instances.filter(i =>
        languageRecs.map(r => r.domain).includes(i.domain),
      );
    }

    // Hosted in filter
    if (this.state.location) {
      const code = this.state.location?.code;
      instances = instances.filter(
        i =>
          i.geo_ip?.country.iso_code === code ||
          i.geo_ip.continent.code === code,
      );
    }

    // Topic filter
    if (this.state.topic !== ALL_TOPIC) {
      const topicRecs = metadata.filter(r =>
        r.topics.includes(this.state.topic),
      );
      instances = instances.filter(i =>
        topicRecs.map(c => c.domain).includes(i.domain),
      );
    }

    // Sort
    if (this.state.sort === RANDOM_SORT) {
      instances = sortSemiRandom(instances);
    } else if (this.state.sort === MOST_ACTIVE_SORT) {
      instances = sortActive(instances);
    } else {
      instances = sortActive(instances).reverse();
    }

    this.setState({ instances });
  }

  render() {
    const title = i18n.t("join_title");

    const isFiltered =
      this.state.location ||
      this.state.topic !== ALL_TOPIC ||
      this.state.language !== "all";
    return (
      <div className="container mx-auto px-4">
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <TitleBlock />
        <ComparisonBlock />
        {this.filterAndTitleBlock()}
        <div className="mt-4">
          <InstanceCardGrid
            title={i18n.t("popular_instances")}
            instances={this.state.instances}
          />
          {isFiltered && this.seeAllBtn()}
        </div>
      </div>
    );
  }

  seeAllBtn() {
    return (
      <div className="flex justify-center p-8">
        <button
          className="btn btn-secondary text-white normal-case"
          onClick={linkEvent(this, handleSeeAll)}
        >
          {i18n.t("see_all_servers")}
        </button>
      </div>
    );
  }

  filterAndTitleBlock() {
    return (
      <div id="search" className="mt-16">
        <div className="flex flex-row flex-wrap gap-4">
          <div className="flex-none">
            <SectionTitle title={i18n.t("join_title")} />
          </div>
          <div className="grow"></div>
          <div>
            <select
              className="lemmy-select mr-2"
              value={this.state.location?.name ?? "All"}
              onChange={e => handleHostedInChange(this, e)}
              name="hosted_in_select"
            >
              <option disabled selected>
                {i18n.t("hosted_in_select")}
              </option>
              <option key="all" value="all">
                {i18n.t("all_locations")}
              </option>
              {this.state.allLocations.map(c => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
            <select
              className="lemmy-select mr-2"
              value={this.state.topic?.name}
              onChange={linkEvent(this, handleTopicChange)}
              name="topic_select"
            >
              <option disabled selected>
                {i18n.t("topic")}
              </option>
              {TOPICS.map(c => (
                <option key={c.name} value={c.name}>
                  {i18n.t(c.name as I18nKeys)}
                </option>
              ))}
            </select>
            <select
              value={this.state.language}
              onChange={linkEvent(this, handleLanguageChange)}
              className="lemmy-select mr-2"
            >
              <option disabled>Languages</option>
              <option key="all" value="all">
                {i18n.t("all_languages")}
              </option>
              {availableLanguages().map(val => (
                <option key={val.code} value={val.code}>
                  {val.name}
                </option>
              ))}
            </select>
            <select
              value={this.state.sort?.name}
              name="sort_select"
              className="lemmy-select mr-2"
              onChange={linkEvent(this, handleSortChange)}
            >
              <option disabled>{i18n.t("sort")}</option>
              {SORTS.map(s => (
                <option key={s.name} value={s.name}>
                  {i18n.t(s.name as I18nKeys)}
                </option>
              ))}
            </select>
            <label className="label">
              <input
                checked={this.state.show_nsfw}
                type="checkbox"
                className="toggle mr-2"
                onClick={e => handleNsfwChange(this, e)}
              />
              Show NSFW
            </label>
          </div>
        </div>
      </div>
    );
  }

  updateUrl(partialState: Partial<State>) {
    const newState = {
      ...this.state,
      ...partialState,
    };
    this.setState(newState);
    this.buildInstanceList();

    const queryParams: QueryParams<State> = {
      location: this.state.location?.code,
      language: this.state.language,
      topic: this.state.topic?.name,
      sort: this.state.sort?.name,
      show_nsfw: this.state.show_nsfw ? "true" : "false",
    };

    window.history.replaceState(
      {},
      "",
      `/instances${getQueryString(queryParams)}`,
    );
  }
}

function handleSortChange(i: Instances, event: any) {
  i.updateUrl({
    sort: SORTS.find(s => s.name === event.target.value) ?? RANDOM_SORT,
  });
}

function handleTopicChange(i: Instances, event: any) {
  i.updateUrl({
    topic: TOPICS.find(c => c.name === event.target.value) ?? ALL_TOPIC,
  });
}

function handleHostedInChange(i: Instances, event: any) {
  i.updateUrl({
    location: i.state.allLocations.find(c => c.code === event.target.value),
  });
}

function handleLanguageChange(i: Instances, event: any) {
  i.updateUrl({ language: event.target.value });
}

function handleNsfwChange(i: Instances, event: Event) {
  // TODO: show dialog with age confirmation
  i.updateUrl({ show_nsfw: event.target?.checked });
}

function handleSeeAll(i: Instances) {
  i.updateUrl({
    sort: RANDOM_SORT,
    language: "all",
    topic: ALL_TOPIC,
    location: undefined,
  });
}

/// Semi-random instance sort, with larger instances always shown near the top.
function sortSemiRandom(list: any[]): any[] {
  return list
    .map(i => {
      const activeUsers = i.site_info.site_view.counts.users_active_month;
      return {
        instance: i,
        sort: activeUsers + activeUsers * 3 * Math.random(),
      };
    })
    .sort((a, b) => b.sort - a.sort)
    .map(({ instance }) => instance);
}
