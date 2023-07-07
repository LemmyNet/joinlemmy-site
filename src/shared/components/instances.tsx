import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { instance_stats } from "../instance_stats";
import { numToSI } from "../utils";

export class Instances extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  biasedRandom(min, max, bias, i) {
    // Lets introduce a better bias to random suffle instances list
    var rnd = Math.random() * (max - min ) + min;
    var mix = Math.random() * i;
    return rnd * (1 - mix) + bias * mix;
  }

  render() {
    const title = i18n.t("join_title");

    var recommended_instances = instance_stats.recommended[i18n.language];
    if (!recommended_instances) {
      recommended_instances = instance_stats.recommended["en"];
    }

    var recommended = [];
    var remaining = [];
    var values = [];
    
    for (var i of instance_stats.stats.instance_details) {
      if (recommended_instances.indexOf(i.domain) > -1) {
        recommended.push(i);
      } else {
        remaining.push(i);
      }

      // Min number of active users is 10 to include in this calculation
      if (i.site_info.site_view.counts.users_active_month > 10) {
        values.push(i.site_info.site_view.counts.users_active_month);
      }
    }
 
    // Use these values for the shuffle 
    const max = Math.max(...values);
    const min = Math.min(...values);
    const averageFun = array => values.reduce((a, b) => a + b) / values.length;
    const avg = averageFun(values)
    
    let recommended2 = recommended
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    // BIASED sorting for instances, based on the min/max of users_active_month
    // weighted to 2/3 of all counts, but more even distribution
    let remaining2 = remaining
      .map(i => ({ instance: i, sort: this.biasedRandom(min, max, avg, .75) }))
      .sort((a, b) => b.sort - a.sort)
      .map(({ instance }) => instance);

    return (
      <div class="container">
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <h1 class="is-marginless">{i18n.t("lemmy_servers")}</h1>
        {this.header()}
        <br />
        <br />
        {this.renderList(i18n.t("recommended_instances"), recommended2)}
        {this.renderList(i18n.t("popular_instances"), remaining2)}
      </div>
    );
  }

  header() {
    return (
      <i>
        {i18n.t("instance_totals", {
          instances: numToSI(instance_stats.stats.crawled_instances),
          users: numToSI(instance_stats.stats.users_active_month),
        })}
        <p>
          {i18n.t("instance_comparison")}:
          <ul>
            <li>
              <a href="https://github.com/maltfield/awesome-lemmy-instances">
                Awesome-Lemmy-Instances on GitHub
              </a>
            </li>
            <li>
              <a href="https://the-federation.info/platform/73">
                the-federation.info Lemmy Instances Page
              </a>
            </li>
            <li>
              <a href="https://lemmymap.feddit.de/">Feddit's Lemmymap</a>
            </li>
          </ul>
          {i18n.t("instance_browser")}{" "}
          <a href="https://browse.feddit.de/">
            Feddit's Lemmy Community Browser
          </a>
        </p>
      </i>
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
