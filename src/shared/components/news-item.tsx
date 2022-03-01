import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { news_md_1, news_md_2, news_md_3 } from "../translations/news";
import { isBrowser, mdToHtml } from "../utils";

const newsMarkdowns = [news_md_1, news_md_2, news_md_3];

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
    let index = this.props.match.params.index;
    return newsMarkdowns[index - 1];
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
