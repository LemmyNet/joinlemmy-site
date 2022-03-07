import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { news_md } from "../translations/news";
import { isBrowser, mdToHtml } from "../utils";

const title = i18n.t("news");

export class NewsItem extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {
    if (isBrowser()) {
      window.scrollTo(0, 0);
    }
  }

  get markdown(): string {
    let title = decodeURIComponent(this.props.match.params.title);
    title = title.replace(/_/g, " ");
    return news_md.find(v => v.title == title).markdown;
  }

  render() {
    return (
      <div>
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <div class="container">
          <div dangerouslySetInnerHTML={mdToHtml(this.markdown)} />
        </div>
      </div>
    );
  }
}
