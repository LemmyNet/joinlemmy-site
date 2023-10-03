import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { news_md } from "../translations/news";
import { isBrowser, mdToHtml } from "../utils";
import { BottomSpacer } from "./common";

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
      <div className="container mx-auto">
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <div className="flex flex-col items-center pt-16">
          <article className="prose prose-a:text-primary prose-h1:text-primary">
            <div dangerouslySetInnerHTML={mdToHtml(this.markdown)} />
          </article>
        </div>
        <BottomSpacer />
      </div>
    );
  }
}
