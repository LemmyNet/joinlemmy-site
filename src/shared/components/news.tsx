import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { news_md } from "../translations/news";
import { isBrowser, mdToHtml } from "../utils";

const title = i18n.t("news");

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
          <div dangerouslySetInnerHTML={mdToHtml(news_md)} />
        </div>
      </div>
    );
  }
}
