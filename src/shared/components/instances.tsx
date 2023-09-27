import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { instance_stats } from "../instance_stats";
import { numToSI } from "../utils";
import { Badge, TEXT_GRADIENT } from "./common";
import { INSTANCE_HELPERS } from "./instances-definitions";
import { Icon } from "./icon";

const TitleBlock = () => (
  <div className="flex flex-col items-center pt-16 mb-16">
    <p className={`text-4xl ${TEXT_GRADIENT} mb-3`}>
      {i18n.t("lemmy_servers")}
    </p>
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

const InstanceCardGrid = ({ title, instances }: InstanceCardGridProps) => (
  <div className="my-16">
    <SectionTitle title={title} />
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
      {instances.map(i => (
        <InstanceCard instance={i} />
      ))}
    </div>
  </div>
);

interface InstanceCardProps {
  instance: any;
}

const InstanceCard = ({ instance }: InstanceCardProps) => {
  const domain = instance.domain;
  const description = instance.site_info.site_view.site.description;
  const icon =
    instance.site_info.site_view.site.icon || "/static/assets/images/lemmy.svg";

  const users = instance.site_info.site_view.counts.users;
  const comments = instance.site_info.site_view.counts.comments;
  const monthlyUsers = instance.site_info.site_view.counts.users_active_month;

  return (
    <div className="card card-bordered bg-neutral-900 shadow-xl">
      <div className="card-body p-4">
        <div className="flex flex-row flex-wrap gap-4">
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
            class="btn btn-primary text-white sm:max-md:btn-block bg-gradient-to-r from-[#69D066] to-[#03A80E]"
            href="https://liberapay.com/Lemmy"
          >
            {i18n.t("join_a_server")}
          </a>
          <a
            class="btn btn-secondary btn-outline text-white sm:max-md:btn-block"
            href="https://www.patreon.com/dessalines"
          >
            {/* TODO add more information */}
            {i18n.t("more_features")}
          </a>
        </div>
      </div>
    </div>
  );
};

const InstanceIcon = ({ icon }) => (
  <div className="rounded-xl bg-neutral-800 p-4">
    <img className="w-24 h-24" src={icon} />
  </div>
);

const InstanceStats = ({ users, comments, monthlyUsers }) => (
  <div className="flex flex-col flex-wrap justify-between">
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
            {i18n.t("users_active_per_month", {
              formattedCount: monthlyUsers.toLocaleString(),
            })}
          </span>
        </div>
      }
    />
  </div>
);

function biasedRandom(activeUsers: number, avg: number, max: number): number {
  // Lets introduce a better bias to random shuffle instances list
  const influence = 1.25;
  const rnd = Math.random() * (max / influence) + activeUsers;
  const mix = Math.random() * influence;
  return rnd * (1 - mix) + avg * mix;
}

function average(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

interface InstanceList {
  recommended: any[];
  popular: any[];
}

function buildInstanceList(): InstanceList {
  const recommendedList =
    instance_stats.recommended[i18n.language] ??
    instance_stats.recommended["en"];

  let recommended = [];
  let popular = [];
  let usersActiveMonth = [];

  // Loop over all the instances, and add them to the two lists
  for (const i of instance_stats.stats.instance_details) {
    if (recommendedList.indexOf(i.domain) > -1) {
      recommended.push(i);
    } else {
      popular.push(i);
    }

    usersActiveMonth.push(i.site_info.site_view.counts.users_active_month);
  }

  // Use these values for the shuffle
  const avgMonthlyUsers = average(usersActiveMonth);
  const maxMonthlyUsers = Math.max(...usersActiveMonth);

  // Randomize the recommended
  recommended = recommended
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  // BIASED sorting for instances, based on the min/max of users_active_month
  popular = popular
    .map(i => ({
      instance: i,
      sort: biasedRandom(
        i.site_info.site_view.counts.users_active_month,
        avgMonthlyUsers,
        maxMonthlyUsers,
      ),
    }))
    .sort((a, b) => b.sort - a.sort)
    .map(({ instance }) => instance);

  return { recommended, popular };
}

export class Instances extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  render() {
    const title = i18n.t("join_title");
    const instances = buildInstanceList();

    return (
      <div className="container mx-auto">
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <TitleBlock />
        <ComparisonBlock />
        <InstanceCardGrid
          title={i18n.t("recommended_instances")}
          instances={instances.recommended}
        />
        <InstanceCardGrid
          title={i18n.t("popular_instances")}
          instances={instances.popular}
        />
      </div>
    );
  }

  renderList(header: string, instances: any[]) {
    return (
      <div>
        <h2>{header}</h2>
        <div class="row">
          {instances.map(instance => {
            let domain = instance.domain;
            let description = instance.site_info.site_view.site.description;
            let icon = instance.site_info.site_view.site.icon;
            return (
              <div class="card col-6">
                <header>
                  <div class="row">
                    <h4 class="col">{domain}</h4>
                  </div>
                </header>
                <div class="is-center">
                  <img
                    class="join-banner"
                    src={icon || "/static/assets/images/lemmy.svg"}
                  />
                </div>
                <br />
                <p class="join-desc">{description}</p>
                <footer>
                  <a class="button primary" href={`https://${domain}`}>
                    {i18n.t("browse_instance")}
                  </a>
                </footer>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
