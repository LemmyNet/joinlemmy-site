import { Component, InfernoEventHandler, linkEvent } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n, LANGUAGES } from "../i18next";
import { T } from "inferno-i18next";
import { instance_stats } from "../instance_stats";
import { languageList, mdToHtml, numToSI } from "../utils";
import { Badge, SELECT_CLASSES, TEXT_GRADIENT } from "./common";
import {
  INSTANCE_HELPERS,
  Category,
  RECOMMENDED_INSTANCES,
  All_CATEGORY,
  CATEGORIES,
} from "./instances-definitions";
import { Icon } from "./icon";

const TitleBlock = () => (
  <div className="flex flex-col items-center pt-16 mb-16">
    <T i18nKey="lemmy_servers" className="text-4xl font-bold mb-3">
      #<span className={TEXT_GRADIENT}>#</span>
    </T>
    <p className="text-xl text-gray-300 text-center max-w-xl">
      {i18n.t("instance_totals", {
        instances: numToSI(instance_stats.stats.crawled_instances),
        users: numToSI(instance_stats.stats.users_active_month),
      })}
    </p>
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
          {INSTANCE_HELPERS.map(i => (
            <Badge
              content={
                <a href={i.link}>
                  <Icon
                    icon="embed"
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

const SectionTitle = ({ title }) => (
  <div className="text-2xl mb-3">{title}</div>
);

interface InstanceCardGridProps {
  title: string;
  instances: any[];
}

// TODO create the instance picker helper

// - Language, Categories, and Sort Order (active, random)
const InstanceCardGrid = ({ instances }: InstanceCardGridProps) => (
  <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
    {instances.map(i => (
      <InstanceCard instance={i} />
    ))}
  </div>
);

interface InstanceCardProps {
  instance: any;
}

function buildUrl(domain: string): string {
  return `https://${domain}`;
}

const InstanceCard = ({ instance }: InstanceCardProps) => {
  const domain = instance.domain;
  const description = instance.site_info.site_view.site.description;
  const sidebar = instance.site_info.site_view.site.sidebar || description;
  const icon =
    instance.site_info.site_view.site.icon || "/static/assets/images/lemmy.svg";
  const banner = instance.site_info.site_view.site.banner;
  const users = instance.site_info.site_view.counts.users;
  const comments = instance.site_info.site_view.counts.comments;
  const monthlyUsers = instance.site_info.site_view.counts.users_active_month;

  const modalId = `modal_${domain}`;

  return (
    <div className="card card-bordered bg-neutral-900 shadow-xl">
      <div className="card-body p-4">
        <div className="flex flex-row flex-wrap gap-4">
          <DetailsModal
            id={modalId}
            domain={domain}
            banner={banner}
            users={users}
            comments={comments}
            monthlyUsers={monthlyUsers}
            icon={icon}
            sidebar={sidebar}
          />
          <InstanceIcon icon={icon} />
          <InstanceStats
            users={users}
            comments={comments}
            monthlyUsers={monthlyUsers}
          />
        </div>
        <div className={`text-2xl font-bold ${TEXT_GRADIENT}`}>{domain}</div>
        <p className="text-sm text-gray-300 mb-2">{description}</p>
        <div class="flex flex-row flex-wrap justify-between gap-2">
          <a
            class="btn btn-primary text-white sm:max-md:btn-block bg-gradient-to-r from-[#69D066] to-[#03A80E] normal-case"
            href={buildUrl(domain)}
          >
            {i18n.t("join_a_server")}
          </a>
          <button
            class="btn btn-secondary btn-outline text-white sm:max-md:btn-block normal-case"
            onClick={() =>
              (document.getElementById(modalId) as any).showModal()
            }
          >
            {i18n.t("more_information")}
          </button>
        </div>
      </div>
    </div>
  );
};

const imgError =
  "this.onError=null;this.src='/static/assets/images/lemmy.svg';" as unknown as InfernoEventHandler<HTMLImageElement>;

const InstanceIcon = ({ icon }) => (
  <div className="rounded-xl bg-neutral-800 p-4">
    <img className="w-24 h-24" src={icon} onError={imgError} />
  </div>
);

const InstanceStats = ({ users, comments, monthlyUsers }) => (
  <div className="flex flex-col flex-wrap justify-between">
    <StatsBadges
      users={users}
      comments={comments}
      monthlyUsers={monthlyUsers}
    />
  </div>
);

export const StatsBadges = ({ users, comments, monthlyUsers }) => (
  <>
    <Badge
      content={
        <div className="text-sm text-gray-500">
          <Icon icon="users" classes="mr-2" />
          <span>{users.toLocaleString()}</span>
        </div>
      }
    />
    <Badge
      content={
        <div className="text-sm text-gray-500">
          <Icon icon="message-circle" classes="mr-2" />
          <span>{comments.toLocaleString()}</span>
        </div>
      }
    />
    <Badge
      content={
        <div className="text-sm text-gray-500">
          <Icon icon="user-check" classes="mr-2" />
          <span>
            {i18n.t("per_month", {
              formattedCount: monthlyUsers.toLocaleString(),
            })}
          </span>
        </div>
      }
    />
  </>
);

export const DetailsModal = ({
  id,
  domain,
  icon,
  banner,
  users,
  comments,
  monthlyUsers,
  sidebar,
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
        />
      )}
      <div className="flex flex-row flex-wrap gap-4 mb-3 items-center">
        {icon && <img className="w-8 h-8" src={icon} onError={imgError} />}
        <StatsBadges
          users={users}
          comments={comments}
          monthlyUsers={monthlyUsers}
        />
        <div className="btn btn-primary btn-outline btn-sm normal-case">
          <a href={buildUrl(domain)}>{i18n.t("join")}</a>
        </div>
      </div>
      {sidebar && (
        <article className="prose max-w-none prose-a:text-primary prose-h1:text-primary">
          <div dangerouslySetInnerHTML={mdToHtml(sidebar)} />
        </article>
      )}
      <a
        className="btn btn-primary btn-block text-white normal-case"
        href={buildUrl(domain)}
      >
        {i18n.t("join")}
      </a>
    </div>
  </dialog>
);

interface Sort {
  name: string;
  icon: string;
}

const RANDOM_SORT: Sort = {
  name: "random",
  icon: "TBD",
};

const MOST_ACTIVE_SORT: Sort = {
  name: "most_active",
  icon: "TBD",
};

const LEAST_ACTIVE_SORT: Sort = {
  name: "least_active",
  icon: "TBD",
};

const SORTS: Sort[] = [RANDOM_SORT, MOST_ACTIVE_SORT, LEAST_ACTIVE_SORT];

function sortRandom(instances: any[]): any[] {
  return instances
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function sortActive(instances: any[]): any[] {
  return instances.sort(
    (a, b) =>
      b.site_info.site_view.counts.users_active_month -
      a.site_info.site_view.counts.users_active_month,
  );
}

interface State {
  sort: Sort;
  language: string;
  category: Category;
}

export class Instances extends Component<any, State> {
  state: State = {
    sort: SORTS[0],
    language: i18n.language.split("-")[0],
    category: All_CATEGORY,
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  buildInstanceList(): any[] {
    let instances = instance_stats.stats.instance_details;
    const recommended = RECOMMENDED_INSTANCES;

    // Language Filter
    if (this.state.language !== "all") {
      const languageRecs = recommended.filter(r =>
        r.languages.includes(this.state.language),
      );
      instances = instances.filter(i =>
        languageRecs.map(r => r.domain).includes(i.domain),
      );
    }

    // Category filter
    if (this.state.category !== All_CATEGORY) {
      const categoryRecs = recommended.filter(r =>
        r.categories.includes(this.state.category),
      );
      instances = instances.filter(i =>
        categoryRecs.map(c => c.domain).includes(i.domain),
      );
    }

    // Sort
    if (this.state.sort == SORTS[0]) {
      instances = sortRandom(instances);
    } else if (this.state.sort == SORTS[1]) {
      instances = sortActive(instances);
    } else {
      instances = sortActive(instances).reverse();
    }

    return instances;
  }

  render() {
    const title = i18n.t("join_title");

    return (
      <div className="container mx-auto">
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <TitleBlock />
        <ComparisonBlock />
        {this.filterAndTitleBlock()}
        <InstanceCardGrid
          title={i18n.t("popular_instances")}
          instances={this.buildInstanceList()}
        />
      </div>
    );
  }

  // TODO i18n these
  filterAndTitleBlock() {
    return (
      <div className="my-16">
        <div className="flex flex-row flex-wrap gap-4">
          <div className="flex-none">
            <SectionTitle title={i18n.t("join_title")} />
          </div>
          <div className="grow"></div>
          <div className="flex-none">
            <select
              className={`${SELECT_CLASSES} mr-2`}
              value={this.state.category.name}
              onChange={linkEvent(this, handleCategoryChange)}
              name="category_select"
            >
              <option disabled selected>
                Category
              </option>
              {CATEGORIES.map(c => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={this.state.language}
              onChange={linkEvent(this, handleLanguageChange)}
              className={`${SELECT_CLASSES} mr-2`}
            >
              <option disabled>Languages</option>
              <option key="all" value="all">
                all
              </option>
              {languageList().map((language, i) => (
                <option key={i} value={language}>
                  {LANGUAGES.find(l => l.code.startsWith(language)).name}
                </option>
              ))}
            </select>
            <select
              value={this.state.sort.name}
              name="sort_select"
              className={SELECT_CLASSES}
              onChange={linkEvent(this, handleSortChange)}
            >
              <option disabled>Sort TODO</option>
              {SORTS.map(s => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

function handleSortChange(i: Instances, event: any) {
  i.setState({ sort: SORTS.find(s => s.name == event.target.value) });
}

function handleCategoryChange(i: Instances, event: any) {
  i.setState({ category: CATEGORIES.find(c => c.name == event.target.value) });
}

function handleLanguageChange(i: Instances, event: any) {
  i.setState({ language: event.target.value });
}
