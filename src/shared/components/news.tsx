import { Component } from "inferno";
import { Link } from "inferno-router";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { isBrowser } from "../utils";
import { news_md } from "../translations/news";
import { Badge, BottomSpacer, TEXT_GRADIENT } from "./common";
import { Icon } from "./icon";

const title = i18n.t("news");
const authors = ["nutomic", "dessalines"];
const news_reversed = news_md.reverse();

interface NewsInfo {
  title: string;
  dateStr: string;
  preview: string;
  authors: Array<string>;
  url: string;
}

function buildNewsInfoArray(): Array<NewsInfo> {
  return news_reversed.map(n => {
    let split = n.title.split(" - ");

    return {
      dateStr: split[0],
      title: split[1],
      preview: split[2] || previewMarkdown(n.markdown),
      authors,
      url: `news/${titleToUrl(n.title)}`,
    };
  });
}

function titleToUrl(title: string): string {
  return title.replace(/ /g, "_");
}

function previewMarkdown(markdown: string): string {
  return markdown.replace(/#/g, "").slice(0, 100).concat("...");
}

const TitleBlock = () => (
  <div className="pt-16 text-center text-4xl font-bold mb-8">{title}</div>
);

const NewsCards = () => buildNewsInfoArray().map(n => <NewsCard news={n} />);

interface NewsProps {
  news: NewsInfo;
}

const NewsCard = ({ news }: NewsProps) => (
  <div className="card card-bordered bg-neutral-900 shadow-xl mb-3">
    <div className="card-body">
      <div class="grid md:grid-cols-12 grid-cols-1 gap-4">
        <div className="md:col-span-10">
          <div className="md:flex md:flex-row md:items-baseline md:space-x-3">
            <Link to={news.url} className={`text-2xl ${TEXT_GRADIENT}`}>
              {title}
            </Link>
            <div className="text-sm text-gray-500">{news.dateStr}</div>

            <div className="flex flex-row flex-wrap items-baseline space-x-3 mb-2">
              {authors.map(name => (
                <AuthorBadge name={name} />
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-300">{news.preview}</div>
        </div>
        <Link
          to={news.url}
          className="md:col-span-2 btn btn-secondary normal-case"
        >
          {i18n.t("read_more")}
        </Link>
      </div>
    </div>
  </div>
);

const AuthorBadge = ({ name }) => (
  <Badge
    content={
      <div>
        <Icon icon="at-sign" classes={"fill-current text-gray-600"} />
        <span className="ml-1 text-gray-300">{name}</span>
      </div>
    }
  />
);

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
      <div className="container mx-auto px-4">
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <TitleBlock />
        <NewsCards />
        <BottomSpacer />
      </div>
    );
  }
}
