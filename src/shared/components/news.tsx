import { Component } from "inferno";
import { Link } from "inferno-router";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { isBrowser } from "../utils";

const title = i18n.t("news");

// Order these chronologically, recent to past
const newsLinks = [
  "2021-11-17 - Federation with Mastodon and Pleroma",
  "2021-09-04 - Lemmy.ml now uses open federation",
  "2021-08-09 - Promoting Lemmy",
];

export class News extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {
    if (isBrowser()) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <div>
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <div class="container">
          <h1>{title}</h1>
          <ul>
            <li>
              <a href="https://github.com/LemmyNet/lemmy/blob/main/RELEASES.md">
                {i18n.t("releases")}
              </a>
            </li>
            {newsLinks.map((v, i) => (
              <li>
                <Link to={`news_item/${newsLinks.length - i}`}>{v}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
