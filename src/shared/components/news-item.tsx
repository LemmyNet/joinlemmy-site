import { Component } from "inferno";
import { Link } from "inferno-router";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { news_md_1, news_md_2, news_md_3 } from "../translations/news";
import { isBrowser, mdToHtml } from "../utils";

const newsMarkdowns = [news_md_1, news_md_2, news_md_3];

const title = i18n.t("news");

interface NewsItemState {
  index: number;
}

export class NewsItem extends Component<any, NewsItemState> {
  emptyState: NewsItemState = {
    index: this.props.match.params.index,
  };

  constructor(props: any, context: any) {
    super(props, context);
    this.state = this.emptyState;
  }

  componentDidMount() {
    if (isBrowser()) {
      window.scrollTo(0, 0);
    }
  }

  get markdown(): string {
    return newsMarkdowns[this.state.index - 1];
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
