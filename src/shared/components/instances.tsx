import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { instance_stats } from "../translations/instance_stats";
import { numToSI } from "../utils";

const title = i18n.t("join_title");

export class Instances extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  header() {
    return (
      <i>
        {i18n.t("instance_totals", {
          instances: numToSI(instance_stats.crawled_instances),
          users: numToSI(instance_stats.total_users),
        })}
      </i>
    );
  }

  render() {
    let instances = instance_stats.instance_details;
    return (
      <div>
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <div class="container">
          <h1 class="is-marginless">{i18n.t("lemmy_servers")}</h1>
          {this.header()}
          <br />
          <br />
          <p>{i18n.t("choose_and_join")}</p>

          {instances.map(i => (
            <div class="card">
              <img
                class="join-icon"
                src={i.icon || "/static/assets/images/lemmy.svg"}
              />
              <div class="join-text">
                <div class="join-header">
                  <h4 class="join-title">{i.name}</h4>
                  <i>
                    {numToSI(i.users_active_month)} {i18n.t("users")} /{" "}
                    {i18n.t("month")}
                  </i>
                </div>
                <p class="join-desc">{i.description}</p>
              </div>
              {i.require_application ? (
                <a
                  class="button primary button-yellow"
                  href={`https://${i.domain}`}
                >
                  {i18n.t("apply_to_join")}
                </a>
              ) : (
                <a class="button primary" href={`https://${i.domain}`}>
                  {i18n.t("join")}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
