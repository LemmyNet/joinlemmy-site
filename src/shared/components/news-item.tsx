import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { news_md } from "../translations/news";
import { isBrowser, mdToHtml } from "../utils";
import { BottomSpacer } from "./common";

export class NewsItem extends Component<any, object> {
  componentDidMount() {
    if (isBrowser()) {
      window.scrollTo(0, 0);
    }
  }

  get title(): string {
    let title = decodeURIComponent(this.props.match.params.title);
    title = title.replace(/_/g, " ");
    return title;
  }

  get markdown(): string {
    return news_md.find(v => v.title === this.title)?.markdown ?? "";
  }

  render() {
    return (
      <div className="container mx-auto px-4">
        <Helmet title={this.title}>
          <meta property={"title"} content={this.title} />
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
